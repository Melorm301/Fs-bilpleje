import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "../App";
import { business } from "../config/business";
import { activeServices } from "../data/services";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("forsiden", () => {
  it("viser virksomhedsnavnet i hero og alle aktive ydelser", () => {
    renderAt("/");

    expect(
      screen.getByRole("heading", { level: 1, name: business.name }),
    ).toBeInTheDocument();

    for (const service of activeServices) {
      expect(
        screen.getByRole("heading", { name: service.title }),
      ).toBeInTheDocument();
    }
  });

  it("opretter ikke et telefonlink, når nummeret er en pladsholder", () => {
    renderAt("/");

    expect(
      screen.queryByRole("link", { name: /ukendt/i }),
    ).not.toBeInTheDocument();
  });
});

describe("navigation", () => {
  it("fører fra forsiden til ydelsessiden", async () => {
    const user = userEvent.setup();
    renderAt("/");

    const menu = screen.getByRole("navigation", { name: "Hovedmenu" });
    await user.click(within(menu).getByRole("link", { name: "Ydelser" }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Bilpleje, bilklargøring og polering/i,
      }),
    ).toBeInTheDocument();
  });

  it("åbner og lukker mobilmenuen", async () => {
    const user = userEvent.setup();
    renderAt("/");

    const toggle = screen.getByRole("button", { name: "Åbn menu" });
    await user.click(toggle);

    expect(
      screen.getByRole("navigation", { name: "Mobilmenu" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Luk menu" }));
    expect(
      screen.queryByRole("navigation", { name: "Mobilmenu" }),
    ).not.toBeInTheDocument();
  });

  it("viser en 404-side på ukendte adresser", () => {
    renderAt("/findes-ikke");

    expect(
      screen.getByRole("heading", { level: 1, name: /Siden blev ikke fundet/i }),
    ).toBeInTheDocument();
  });
});

describe("kontakt", () => {
  it("viser kontaktoplysningerne som tekst, når de mangler", () => {
    renderAt("/kontakt");

    expect(screen.getByText(business.email)).toBeInTheDocument();
    expect(
      screen.getByText(/Oplysninger der mangler endnu/i),
    ).toBeInTheDocument();
  });

  it("holder formularen deaktiveret, indtil e-mailen er sat", () => {
    renderAt("/kontakt");

    expect(screen.getByLabelText(/Navn/i)).toBeDisabled();
    expect(
      screen.getByText(/Kontaktformularen er ikke aktiv endnu/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send henvendelse/i })).toBeDisabled();
  });
});

describe("galleri", () => {
  it("filtrerer billederne på kategori", async () => {
    const user = userEvent.setup();
    renderAt("/galleri");

    expect(screen.getByText("Interiør efter indvendig rengøring")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Polering" }));

    expect(
      screen.queryByText("Interiør efter indvendig rengøring"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Håndpolering af lakflade")).toBeInTheDocument();
  });

  it("markerer demobillederne som illustrative", () => {
    renderAt("/galleri");

    expect(screen.getByText(/Billederne er illustrative/i)).toBeInTheDocument();
  });
});

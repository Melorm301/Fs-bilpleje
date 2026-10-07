import { describe, expect, it } from "vitest";
import {
  addressLines,
  hasOpeningHours,
  hasValidEmail,
  hasValidPhone,
  isPlaceholder,
  mailtoHref,
  normalizePhone,
  phoneDisplay,
  phoneHref,
} from "./business";

describe("pladsholdere", () => {
  it("genkender de medfølgende pladsholdere", () => {
    expect(isPlaceholder("Ukendt")).toBe(true);
    expect(isPlaceholder("ukendt@ukendt.dk")).toBe(true);
    expect(isPlaceholder("+45 ukendt")).toBe(true);
    expect(isPlaceholder("")).toBe(true);
    expect(isPlaceholder(undefined)).toBe(true);
    expect(isPlaceholder("Nørrebrogade 1")).toBe(false);
  });

  it("melder manglende oplysninger korrekt", () => {
    expect(hasValidPhone()).toBe(false);
    expect(hasValidEmail()).toBe(false);
    expect(hasOpeningHours()).toBe(false);
    expect(addressLines()).toEqual([]);
  });
});

describe("telefonnumre", () => {
  it("opretter ikke tel-link på en pladsholder", () => {
    expect(phoneHref("+45 ukendt")).toBeNull();
    expect(normalizePhone("+45 ukendt")).toBeNull();
  });

  it("normaliserer et dansk nummer", () => {
    expect(normalizePhone("12 34 56 78")).toBe("+4512345678");
    expect(phoneHref("12345678")).toBe("tel:+4512345678");
    expect(phoneDisplay("12345678")).toBe("+45 12 34 56 78");
  });

  it("afviser for korte numre", () => {
    expect(normalizePhone("1234")).toBeNull();
  });
});

describe("e-mail", () => {
  it("opretter ikke mailto-link på en pladsholder", () => {
    expect(mailtoHref({ subject: "Test" })).toBeNull();
    expect(hasValidEmail("ukendt@ukendt.dk")).toBe(false);
  });

  it("bygger et mailto-link med emne", () => {
    const href = mailtoHref({ subject: "Tilbud", email: "kontakt@eksempel.dk" });
    expect(href).toContain("mailto:kontakt@eksempel.dk");
    expect(href).toContain("subject=Tilbud");
  });
});

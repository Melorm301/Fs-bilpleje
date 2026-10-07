# FS Bilpleje & Service - hjemmeside

Statisk hjemmeside for **FS Bilpleje & Service** (CVR 42554995), bygget med
React, TypeScript, Vite og Tailwind CSS. Hjemmesiden er en katalog- og
præsentationsside - ikke en webshop. Der er ingen betaling, kurv eller
bookingsystem.

Hjemmesiden er klar til gratis hosting på GitHub Pages og kan senere flyttes til
et eget domæne uden at ændre koden.

## Krav

- Node.js 22 eller nyere
- npm

## Kom i gang lokalt

```bash
npm install     # installer afhængigheder
npm run dev     # start udviklingsserver
```

Udviklingsserveren bruger samme base-path som produktion, så siden ligger på
`http://localhost:5173/fs-bilpleje/`.

## Kommandoer

| Kommando | Beskrivelse |
| --- | --- |
| `npm run dev` | Starter udviklingsserveren |
| `npm run build` | Typecheck, klient-build, SSR-build og prærendering til `dist/` |
| `npm run preview` | Viser det færdige build lokalt |
| `npm run typecheck` | Kører TypeScript uden at bygge |
| `npm run lint` | Kører oxlint |
| `npm test` | Kører alle tests én gang |
| `npm run test:watch` | Kører tests i watch-tilstand |

## Projektstruktur

```
src/
  components/   Genbrugelige komponenter (header, footer, kort, lightbox ...)
  config/       Central virksomheds- og SEO-konfiguration
  data/         Ydelser, galleribilleder og værdier
  lib/          Små hjælpefunktioner (base-path, SEO, scroll-reveal)
  pages/        En fil pr. side
  sections/     Sektioner på forsiden
  test/         Testopsætning og tests
  assets/logo/  Originalt logofil
public/
  images/       Optimerede WebP-billeder
  logo/         Logovarianter til header og footer
  fonts/        Selvhostet skrifttype
scripts/
  prepare-assets.py   Behandler logo og billeder
  prerender.mjs       Skriver statisk HTML, sitemap og robots.txt
```

## Redigering uden CMS

Alle oplysninger kan ændres i få filer. Man behøver ikke lede gennem koden.

### Virksomhedsoplysninger

Åbn `src/config/business.ts`. Her står navn, CVR, indehaver, telefon, e-mail,
adresse, by, åbningstider og sociale profiler.

Så længe en værdi står som `Ukendt` (eller en anden pladsholder), vises den som
pladsholdertekst, og der oprettes **ikke** et `tel:`- eller `mailto:`-link. Så
snart der indtastes rigtige oplysninger, aktiveres automatisk:

- klik-for-at-ringe i header, footer og kontaktsektion
- e-mail-link
- kontaktknapper på ydelseskort
- den mobile kontaktlinje nederst på skærmen
- adresse og åbningstider i footer og på kontakt- og virksomhedssider

Eksempel:

```ts
phone: "+45 12 34 56 78",
email: "kontakt@fsbilpleje.dk",
address: "Eksempelvej 12",
postalCode: "8000",
city: "Aarhus C",
hours: "Man-fre 08-17",
```

### Ydelser

Åbn `src/data/services.ts`. Hver ydelse har en `enabled`-flag:

```ts
{ id: "bilpolering", title: "Bilpolering", enabled: true }
```

Sæt `enabled: false` for at skjule en ydelse på hele sitet. Listen er et forslag
og skal bekræftes af indehaveren. Der oplyses ingen priser - alle kort viser
"Pris efter aftale".

### Galleri

Læg nye billeder i `public/images/` (helst WebP), og tilføj dem i
`src/data/gallery.ts` med filsti, bredde, højde, alt-tekst, billedtekst og
kategori. Kategorierne ligger i samme fil.

### SEO og domæne

`src/config/site.ts` indeholder sidetitler, meta-beskrivelser, søgeord og
domænet. Domænet kan også sættes ved build med miljøvariablen `VITE_SITE_URL`.

## Åbn projektet i GitHub Desktop

1. Åbn GitHub Desktop.
2. Vælg **File → Add local repository**.
3. Vælg mappen `Documents/GitHub/Fs-bilpleje`.
4. GitHub Desktop viser nu alle ændringer under fanen **Changes**, hvor de kan
   beskrives og committes.

Er repositoryet allerede tilføjet, skal mappen blot være den samme - så dukker
ændringerne op automatisk.

## Publicering til GitHub Pages

1. Commit ændringerne i GitHub Desktop (skriv en kort beskrivelse, tryk
   **Commit to main**).
2. Tryk **Push origin** for at sende ændringerne til GitHub.
3. På GitHub: åbn repositoryet, vælg **Settings → Pages**, og sæt **Source** til
   **GitHub Actions**.
4. Workflowet `.github/workflows/deploy.yml` bygger og publicerer automatisk
   hjemmesiden ved hvert push til `main`.
5. Hjemmesiden ligger herefter på
   `https://<brugernavn>.github.io/fs-bilpleje/`.

Fanen **Actions** på GitHub viser status for hver publicering.

> **Vigtigt:** Kilden skal stå på **GitHub Actions**. Står den på
> **Deploy from a branch**, publicerer GitHub rå kildekode fra repoet, og så
> viser siden en hvid skærm, fordi `index.html` i roden er Vite-kildekode og
> ikke den færdige hjemmeside. Workflowet forsøger selv at slå det rigtige
> setup til, men indstillingen kan også sættes manuelt som beskrevet ovenfor.

### Eget domæne senere

Sæt miljøvariablen `VITE_BASE_PATH=/` i workflowet (eller i en `.env`-fil
lokalt), og opdater `VITE_SITE_URL` til domænet. Tilføj samtidig et `CNAME`-felt
i GitHub Pages-indstillingerne.

## Tests

```bash
npm test
```

Testene dækker navigation mellem sider, mobilmenu, 404-side, håndtering af
manglende kontaktoplysninger, den deaktiverede kontaktformular og filtrering i
galleriets kategorier. Derudover er der enhedstests for telefon-, e-mail- og
pladsholderlogikken.

## Oplysninger der mangler

Følgende skal leveres af indehaveren, før hjemmesiden offentliggøres:

1. Telefonnummer
2. E-mailadresse
3. Adresse og by
4. Åbningstider
5. Bekræftelse af hvilke ydelser der faktisk tilbydes
6. Rigtige billeder af virksomheden og af udførte opgaver
7. Eventuelle sociale profiler
8. Gennemlæsning af privatlivspolitik og virksomhedsoplysninger

## Hvis siden viser en hvid skærm

En hvid skærm betyder næsten altid, at der vises kildekode i stedet for det
byggede site. Tjek i denne rækkefølge:

1. **GitHub Pages-kilden.** Under **Settings → Pages** skal **Source** være
   **GitHub Actions**. Vælges **Deploy from a branch**, udgives repoets
   `index.html`, som er Vite-kildekode med en tom `#root`.
2. **Åbn ikke `index.html` direkte fra mappen.** Filen er et byggetrin, ikke en
   færdig side. Kør `npm run dev` eller `npm run build && npm run preview`.
3. **Se fanen Actions på GitHub.** Bliver trinnet "Konfigurer Pages" rødt, er
   Pages ikke sat op til GitHub Actions endnu.

Af samme grund viser kildekodens `index.html` nu en forklarende besked i stedet
for en tom side, og scroll-animationerne har et CSS-sikkerhedsnet, så indholdet
altid bliver synligt, selv hvis JavaScript fejler.

## Licens og kilder

Se `IMAGES.md` for kilder og licenser på logo, billeder og skrifttype.

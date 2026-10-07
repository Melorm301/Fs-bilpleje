# Billeder og licens

## Logo

`public/logo/fs-logo-original.png` og `src/assets/logo/fs-logo-original.png` er
virksomhedens eget logo, leveret af FS Bilpleje & Service. Originalfilen er
bevaret uændret.

Ud fra originalen er der genereret:

- `public/logo/fs-logo-light.webp` / `.png` - fuld lockup til lyse baggrunde
- `public/logo/fs-logo-dark.webp` / `.png` - fuld lockup til mørke baggrunde
- `public/logo/fs-emblem-light.webp` / `.png` - kun sekskanten
- `public/logo/fs-emblem-dark.webp` / `.png` - kun sekskanten, lys variant
- `public/favicon-32.png`, `public/favicon-512.png`, `public/apple-touch-icon.png`

Logoet er ikke strakt, beskåret eller tegnet om. Baggrunden er fjernet, og
farven er skiftet, så mærket kan bruges på både lyse og mørke flader.

## Fotografier

Alle fotografier er hentet fra [Unsplash](https://unsplash.com) og er downloadet
direkte fra Unsplash' eget download-endpoint. De er udgivet under
[Unsplash License](https://unsplash.com/license), som tillader gratis brug i
kommercielle og ikke-kommercielle sammenhænge uden krav om kreditering.
Kreditering er givet her, hvor Unsplash har oplyst fotografen.

| Fil | Kilde | Fotograf |
| --- | --- | --- |
| `hero.webp`, `hero-mobile.webp`, `og-image.jpg` | <https://unsplash.com/photos/vou-HfglNww> | ikke oplyst på Unsplash |
| `service-indvendig.webp` | <https://unsplash.com/photos/pdMgepnEapo> | Luay Barani |
| `service-udvendig.webp` | <https://unsplash.com/photos/jVm9stv6UpE> | ikke oplyst på Unsplash |
| `service-polering.webp` | <https://unsplash.com/photos/q94A6k81lAQ> | ikke oplyst på Unsplash |
| `service-komplet.webp` | <https://unsplash.com/photos/DtrI63-Z46I> | Willian Cittadin |
| `service-klargoering.webp` | <https://unsplash.com/photos/i34LTsTiUKE> | Tymur Tsebrenko |
| `service-tekstil.webp` | <https://unsplash.com/photos/diTehTl5O-c> | Fine Automotive Detailing |
| `om-os.webp` | <https://unsplash.com/photos/wTW51lUpC6k> | Zac Nielson |
| `galleri-interior-clean.webp` | <https://unsplash.com/photos/q20ijPtEJ8s> | Myron Mott |
| `galleri-steam.webp` | <https://unsplash.com/photos/0a36BVNdWek> | Fine Automotive Detailing |
| `galleri-interior-leather.webp` | <https://unsplash.com/photos/WMhgUpJBla0> | Erik Mclean |
| `galleri-wheel.webp` | <https://unsplash.com/photos/8k_T1EwTySs> | Zac Nielson |
| `galleri-handwash.webp` | <https://unsplash.com/photos/tGM8nCQdnq0> | ikke oplyst på Unsplash |
| `galleri-foam-suv.webp` | <https://unsplash.com/photos/SyvBZqordVQ> | Avenir Visuals |
| `galleri-foam-car.webp` | <https://unsplash.com/photos/SjE10OpzxSE> | Rana Singh |
| `galleri-black-foam.webp` | <https://unsplash.com/photos/bCQSrcYghJI> | Willian Cittadin |
| `galleri-polering.webp` | <https://unsplash.com/photos/yA3Rb0krauM> | Tyler |
| `galleri-wax.webp` | <https://unsplash.com/photos/CsZjHjFN3N8> | Zac Nielson |
| `galleri-studio-blue.webp` | <https://unsplash.com/photos/PT9IIuG3vbQ> | Vitalii Khodzinskyi |
| `galleri-reflection.webp` | <https://unsplash.com/photos/HVK7PhgODKM> | Afonso Taveira |
| `galleri-garage-light.webp` | <https://unsplash.com/photos/d6oD8py1nOM> | Shoham Avisrur |

Billederne er illustrative. De viser eksempler på arbejdsgange og resultater -
ikke udførte opgaver for FS Bilpleje & Service. De skal udskiftes med
virksomhedens egne billeder, når de foreligger, og det er markeret tydeligt på
galleri- og om os-siden.

## Behandling af billederne

`scripts/prepare-assets.py` henter kilderne i `tmp/raw/` (ikke en del af
git-historikken) og skriver optimerede WebP-filer til `public/images/`. Scriptet
beskærer til de ønskede formater, fjerner baggrunden på logoet og genererer
favicons. Kør det igen med:

```bash
python3 scripts/prepare-assets.py
```

## Skrifttype

`public/fonts/archivo-latin.woff2` er Archivo (variable, 400-900) fra Google
Fonts, udgivet under SIL Open Font License 1.1. Skrifttypen er selvhostet, så
der ikke sendes forespørgsler til tredjeparter, når hjemmesiden besøges.

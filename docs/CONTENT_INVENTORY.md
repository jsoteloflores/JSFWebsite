# Content Inventory

**Document status:** Ticket 004 initial inventory
**Source:** `docs/CONTENT_SOURCE_OF_TRUTH.md` (CV snapshot, July 2026)
**Last updated:** July 2026

This document is the human-review layer between source materials and collection files. It is not public-facing copy.

---

## 1. Identity and academic profile

| Field                  | Value                                                                    | Source                    | Status                                            |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------- | ------------------------------------------------- |
| Full name              | Joel A. Sotelo Flores                                                    | CV header                 | Entered in `src/data/profile.ts`                  |
| Preferred display name | Joel Sotelo Flores (Q1 resolved)                                         | Source-of-truth §2.1      | Entered in `src/data/profile.ts` as `displayName` |
| Location               | Lexington, Virginia (Q2 resolved)                                        | CV / Source-of-truth §2.1 | Entered in `src/data/profile.ts` as `location`    |
| Institution            | Washington and Lee University                                            | CV                        | Entered                                           |
| Degrees                | B.S. Physics; B.S. Earth and Environmental Geoscience                    | CV                        | Entered                                           |
| Expected graduation    | June 2027                                                                | CV                        | Entered                                           |
| Academic email         | jsoteloflores@mail.wlu.edu                                               | CV                        | Entered                                           |
| GitHub                 | https://github.com/jsoteloflores                                         | CV                        | Entered                                           |
| LinkedIn               | https://www.linkedin.com/in/joelsoteloflores                             | CV                        | Entered                                           |
| Research interests     | Synthesized from CV research experience                                  | Source-of-truth §2.2      | Entered                                           |
| CV path                | Pending — CV requires updates to manuscript titles and DOIs (Q3 partial) | —                         | Omitted until updated CV is approved              |

---

## 2. Research projects

| Proposed ID                                     | Title                                                    | Status    | Visibility | Source           | Metadata complete | Entered |
| ----------------------------------------------- | -------------------------------------------------------- | --------- | ---------- | ---------------- | ----------------- | ------- |
| `kilauea-lava-fountain-computer-vision`         | Kīlauea Lava-Fountain Computer Vision                    | active    | public     | CV / Source §3.1 | Yes               | Yes     |
| `ijen-pyroclast-microct-analysis`               | Ijen Pyroclast Micro-CT and Pore-Network Analysis        | active    | public     | CV / Source §3.2 | Yes               | Yes     |
| `v0499-centauri-photometry`                     | V0499 Centauri Photometric Analysis                      | completed | public     | CV / Source §3.3 | Yes               | Yes     |
| `wds-03575-0110-astrometry`                     | WDS 03575-0110 Double-Star Astrometry                    | completed | public     | CV / Source §3.4 | Yes               | Yes     |
| `nanoparticle-dipole-self-assembly`             | Nanoparticle and Magnetic-Dipole Self-Assembly           | completed | public     | CV / Source §3.5 | Yes               | Yes     |
| `riesel-sierpinski-computational-number-theory` | Computational Number Theory: Riesel-Sierpiński Sequences | completed | public     | CV / Source §3.6 | Yes               | Yes     |

All six project records entered.

**Intentional omissions from project frontmatter:**

| Project             | Omitted field          | Reason                                        |
| ------------------- | ---------------------- | --------------------------------------------- |
| All projects        | `featuredImage`        | No approved image paths in source             |
| All active projects | `endDate`              | Not stated in CV; ongoing                     |
| All projects        | `relatedSoftware`      | Software records not yet entered (unresolved) |
| Kīlauea, Ijen       | `relatedPublications`  | Manuscript metadata incomplete                |
| Kīlauea, Ijen       | `relatedPresentations` | Presentation dates unresolved                 |
| All projects        | `externalLinks`        | No verified external links in source          |

---

## 3. Publications and manuscripts

| Proposed ID                                   | Title                                                                                                  | Type            | Status                | Visibility | Source           | Metadata complete                          | Entered     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------- | --------------------- | ---------- | ---------------- | ------------------------------------------ | ----------- |
| `wds-03575-0110-desmos-fitting`               | New Measurements and Proposed Orbital Parameters for WDS 03575-0110 using Desmos Fitting               | journal-article | published             | public     | CV / Source §4.1 | Yes (DOI/URL unresolved)                   | Yes         |
| `v0499-centauri-photometric-distance`         | BViz Photometric Distance to the RR Lyrae Star V0499 Centauri                                          | journal-article | in-review             | —          | CV / Source §4.2 | No — year required                         | Not entered |
| `pyroclast-microct-pore-network-manuscript`   | Deep Learning Segmentation and Pore-Network Characterization of Pyroclastic Micro-CT Volumes           | journal-article | submitted / in-review | —          | CV / Source §4.3 | No — author list incomplete                | Not entered |
| `kilauea-fountain-computer-vision-manuscript` | Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction | journal-article | submitted / in-review | —          | CV / Source §4.4 | No — author list incomplete                | Not entered |
| _(placeholder)_                               | Nature manuscript                                                                                      | journal-article | submitted             | —          | CV / Source §4.5 | No — placeholder title, incomplete authors | Not entered |
| _(placeholder)_                               | Barber-led journal manuscript                                                                          | journal-article | submitted             | —          | CV / Source §4.6 | No — placeholder title and journal         | Not entered |

**Intentional omissions from the entered publication:**

| Field                                            | Reason                                                                                  |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `doi`                                            | Not listed in CV; none found in source                                                  |
| `url`                                            | Not verified                                                                            |
| `pdf`                                            | Public-sharing permission not confirmed                                                 |
| `abstract`                                       | No approved abstract text in source                                                     |
| `citation`                                       | Derived from the citation string in source; not separately entered to avoid duplication |
| `submittedDate`, `acceptedDate`, `publishedDate` | Exact dates not provided in CV                                                          |

---

## 4. Presentations

| Proposed ID                          | Title                                                                                       | Type              | Date                         | Entered     | Blocking reason                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------- | ---------------------------- | ----------- | ------------------------------------------------- |
| `agu-2025-ijen-pyroclast-poster`     | Textural and Chemical Reconstructions of the 1817 Kawah Ijen Eruption…                      | poster            | 2025 (exact date unresolved) | Not entered | Exact ISO date required by schema                 |
| `montreal-2026-ijen-stereology-oral` | A field-based and 2D/3D stereological analysis of pyroclasts from the Ijen Caldera Complex… | oral-presentation | 2026 (exact date unresolved) | Not entered | Exact ISO date and official event name unresolved |
| `agu-2026-kilauea-poster`            | Computer Vision Segmentation of Kīlauea Lava Fountain Video…                                | poster            | anticipated 2026             | Not entered | Not a confirmed, completed presentation           |
| `agu-2026-microct-poster`            | Deep Learning Segmentation and Pore-Network Characterization…                               | poster            | anticipated 2026             | Not entered | Not a confirmed, completed presentation           |

All four presentation candidates are blocked. None entered.

---

## 5. Software

| Proposed ID                              | Name                                                     | Status     | Entered     | Blocking reason                                         |
| ---------------------------------------- | -------------------------------------------------------- | ---------- | ----------- | ------------------------------------------------------- |
| `kilauea-fountain-segmentation-pipeline` | Kīlauea Lava Fountain Segmentation and Labeling Pipeline | unresolved | Not entered | Status, repository, DOI, and capability list unresolved |
| `pyro-foams`                             | PyRO-FOAMS (or PyRo-FOAMS)                               | unresolved | Not entered | Canonical name, status, repository, and DOI unresolved  |

Both software records blocked. None entered.

---

## 6. Exhibits

No exhibit is verified as deployed.

| Planned exhibit                    | Related project                       | Entered                       |
| ---------------------------------- | ------------------------------------- | ----------------------------- |
| Kīlauea observation-to-measurement | kilauea-lava-fountain-computer-vision | Not entered — no deployed URL |
| Model training and inference       | kilauea-lava-fountain-computer-vision | Not entered — no deployed URL |
| 3D pyroclast exhibit               | ijen-pyroclast-microct-analysis       | Not entered — no deployed URL |

Exhibits collection remains empty.

---

## 7. Unresolved items

See `docs/CONTENT_QUESTIONS.md` for the complete list of 49 questions.

**Summary of blocking issues:**

| Category              | Count | Primary gap                                    |
| --------------------- | ----- | ---------------------------------------------- |
| Profile               | 3     | Display name, location display, CV path        |
| V0499 manuscript      | 3     | Year, exact status, URL                        |
| Volcanica manuscript  | 4     | Full author list, year, exact status           |
| JVGR manuscript       | 4     | Full author list, year, exact status           |
| Nature manuscript     | 5     | Title, authors, status, year                   |
| Barber-led manuscript | 5     | Title, journal, authors, status, year          |
| AGU 2025 poster       | 4     | Exact date, location, poster asset             |
| Montréal oral         | 4     | Exact date, event name, presenter confirmation |
| AGU 2026 submissions  | 4     | Acceptance confirmation                        |
| Kīlauea software      | 6     | Name, status, repository, DOI, capabilities    |
| PyRO-FOAMS            | 7     | Canonical name, status, repository, DOI        |
| Published paper       | 2     | DOI, public PDF permission                     |

---

## 8. Intentionally excluded items

| Item                                         | Reason                                                        |
| -------------------------------------------- | ------------------------------------------------------------- |
| Awards and fellowships                       | No current content collection for this type                   |
| Green Bank Observatory ERIRA program         | Not represented as a project without explicit approval        |
| Michigan State Nuclear Science Summer School | Not represented as a project without explicit approval        |
| Teaching assistant and AIM advisor roles     | No current content collection                                 |
| Coursework list                              | Not a collection; retained for future About/Education section |
| Study abroad experiences                     | Not a collection; retained for future About section           |
| Anticipated AGU 2026 presentations           | Not confirmed as accepted or completed                        |
| Nature and Barber-led manuscripts            | Placeholder titles and incomplete author lists                |

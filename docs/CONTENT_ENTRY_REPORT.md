# Content Entry Report

**Ticket:** 004 — Verified Content Inventory and Initial Content Entry
**Source:** `docs/CONTENT_SOURCE_OF_TRUTH.md` (CV snapshot, July 2026)
**Date:** July 2026

---

## Entered records

### Projects (6 of 6 approved)

| Collection                                    | ID                                              | Title                                                    | Status    | Visibility | Source      |
| --------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- | --------- | ---------- | ----------- |
| projects                                      | `kilauea-lava-fountain-computer-vision`         | Kīlauea Lava-Fountain Computer Vision                    | active    | public     | Source §3.1 |
| projects                                      | `ijen-pyroclast-microct-analysis`               | Ijen Pyroclast Micro-CT and Pore-Network Analysis        | active    | public     | Source §3.2 |
| projects                                      | `v0499-centauri-photometry`                     | V0499 Centauri Photometric Analysis                      | completed | public     | Source §3.3 |
| projects                                      | `wds-03575-0110-astrometry`                     | WDS 03575-0110 Double-Star Astrometry                    | completed | public     | Source §3.4 |
| projects                                      | `nanoparticle-dipole-self-assembly`             | Nanoparticle and Magnetic-Dipole Self-Assembly           | completed | public     | Source §3.5 |
| riesel-sierpinski-computational-number-theory | `riesel-sierpinski-computational-number-theory` | Computational Number Theory: Riesel-Sierpiński Sequences | completed | public     | Source §3.6 |

### Publications (1 of 1 approved)

| Collection   | ID                              | Title                                                                                    | Status    | Visibility | Related project             | Source      |
| ------------ | ------------------------------- | ---------------------------------------------------------------------------------------- | --------- | ---------- | --------------------------- | ----------- |
| publications | `wds-03575-0110-desmos-fitting` | New Measurements and Proposed Orbital Parameters for WDS 03575-0110 using Desmos Fitting | published | public     | `wds-03575-0110-astrometry` | Source §4.1 |

### Presentations

None entered. All four candidates blocked by missing required dates. See blocked records below.

### Software

None entered. Both candidates blocked by unresolved naming and metadata. See blocked records below.

### Exhibits

None entered. No deployed interactive exhibit is verified.

### Profile

`src/data/profile.ts` created with 9 verified public fields.

---

## Omitted fields

### All project records

| Field             | Reason                            |
| ----------------- | --------------------------------- |
| `featuredImage`   | No approved image paths in source |
| `relatedSoftware` | Software records not yet entered  |
| `externalLinks`   | No verified external links        |

### Active projects (Kīlauea, Ijen)

| Field                  | Reason                              |
| ---------------------- | ----------------------------------- |
| `endDate`              | Projects ongoing; no end date in CV |
| `relatedPublications`  | Manuscript author lists incomplete  |
| `relatedPresentations` | Presentation dates unresolved       |

### Published double-star article

| Field                                            | Reason                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| `doi`                                            | Not listed in CV; no verified DOI found                          |
| `url`                                            | Not verified                                                     |
| `pdf`                                            | Public-sharing permission not confirmed                          |
| `abstract`                                       | No approved text in source                                       |
| `submittedDate`, `acceptedDate`, `publishedDate` | Exact dates not provided in CV                                   |
| `citation`                                       | Not entered separately; citation string preserved in source file |

### Profile

| Field    | Reason                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------- |
| `cvPath` | CV pending updates to manuscript titles and DOIs before public distribution (Q3 partially resolved) |

**Resolved since initial entry (July 2026):** Q1 (`displayName: 'Joel Sotelo Flores'`) and Q2 (`location: 'Lexington, Virginia'`) are now entered in `src/data/profile.ts`.

---

## Unresolved questions

46 questions remain open in `docs/CONTENT_QUESTIONS.md` (Q1–Q3 resolved July 2026).

**Blocking additional records:** V0499 Centauri manuscript (Q4–Q6), Volcanica manuscript (Q7–Q10), JVGR manuscript (Q11–Q14), Nature manuscript (Q15–Q18), Barber-led manuscript (Q19–Q23), AGU 2025 poster (Q24–Q27), Montréal oral (Q28–Q31), AGU 2026 submissions (Q32–Q35), Kīlauea software (Q36–Q41), PyRO-FOAMS (Q42–Q48).

---

## Excluded records

| Record                      | Reason                                                  |
| --------------------------- | ------------------------------------------------------- |
| Nature manuscript           | Placeholder title; incomplete author list with ellipsis |
| Barber-led manuscript       | Placeholder title and journal; incomplete author list   |
| V0499 Centauri manuscript   | Missing required `year` field                           |
| Volcanica manuscript        | Incomplete author list                                  |
| JVGR manuscript             | Incomplete author list                                  |
| AGU 2025 poster             | Missing required exact ISO date                         |
| Montréal oral presentation  | Missing required exact ISO date and official event name |
| AGU 2026 poster submissions | Not confirmed as accepted or presented                  |
| Kīlauea software pipeline   | Status, repository, DOI unresolved                      |
| PyRO-FOAMS                  | Canonical name, status, repository, DOI unresolved      |
| All three planned exhibits  | No deployed external URL verified                       |
| Awards and fellowships      | No current collection for this content type             |
| Research training programs  | Not approved as projects                                |
| Teaching and mentoring      | No current collection                                   |

---

## Validation

| Check                      | Result                                                     |
| -------------------------- | ---------------------------------------------------------- |
| `npm run format:check`     | Pass                                                       |
| `npm run lint`             | Pass                                                       |
| `npm run typecheck`        | 0 errors                                                   |
| `npm run content:validate` | Pass — all 7 records validated, 1 cross-reference resolved |
| `npm run test`             | 131/131 tests pass (7 test files)                          |
| `npm run build`            | 6 pages built; 0 client JS emitted                         |
| `npm run validate`         | Full chain passes                                          |

Cross-reference validated: `wds-03575-0110-astrometry` → `wds-03575-0110-desmos-fitting` (publication) and reverse link `wds-03575-0110-desmos-fitting` → `wds-03575-0110-astrometry` (project).

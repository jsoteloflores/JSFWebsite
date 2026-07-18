# Content Source of Truth

## Document purpose

This file is the authoritative content-ingestion source for the main academic portfolio of **Joel A. Sotelo Flores**.

It was prepared from the following supplied CV:

```text
docs/source-materials/Joel_SoteloFlores_CV.pdf
```

Source snapshot: CV supplied in July 2026.

This document distinguishes among:

- **Verified and ready**: sufficiently complete for structured portfolio entry
- **Verified but incomplete**: present in the CV, but one or more required fields remain missing
- **Excluded for now**: not ready for public entry because the CV contains placeholders, anticipated outcomes, incomplete author lists, or unresolved sharing status
- **Editorial recommendation**: a suggested portfolio treatment rather than a biographical fact

The coding agent must not replace missing details with guesses.

When this document says that a field is unresolved, omit the field or the record as directed and add the issue to `docs/CONTENT_QUESTIONS.md`.

---

# 1. Global content rules

## 1.1 Primary source

Use the supplied CV as the primary source for all facts in this file.

Do not infer information from:

- old conversations
- filenames
- presumed conference schedules
- general web knowledge
- advisor identities not present in the CV
- expected publication practices
- likely DOI formats
- repository names that have not been verified

## 1.2 Exactness requirements

Preserve:

- author order
- title wording and capitalization
- diacritics
- journal names
- institution names
- date ranges
- current manuscript status
- project role wording
- advisor names

Do not alphabetize authors.

Do not upgrade collaborative contributions into sole ownership.

## 1.3 Public visibility

Information appearing in the CV may generally be treated as intended for professional public use, except where this document explicitly restricts it.

Do not make incomplete placeholder information public.

## 1.4 Missing metadata

The following placeholders are not real metadata and must never be entered as public values:

```text
...
Title
[Journal Name]
DOI: ...
submitted, anticipated 2026
poster presentation expected
```

## 1.5 Exhibits

No interactive exhibit is currently verified as deployed.

The `exhibits` collection must remain empty during Ticket 004.

Planned exhibits may be listed in the inventory but must not receive placeholder URLs or public cards.

---

# 2. Public profile

## 2.1 Verified identity

| Field                        | Verified value                               | Entry guidance                                                                          |
| ---------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| Full name as shown on CV     | Joel A. Sotelo Flores                        | Ready                                                                                   |
| Professional display name    | Joel Sotelo Flores                           | Resolved (July 2026): use as sitewide display name; full CV name retained for citations |
| Current location shown on CV | Lexington, Virginia                          | Resolved (July 2026): approved for public display                                       |
| Academic email               | jsoteloflores@mail.wlu.edu                   | Ready for public profile                                                                |
| LinkedIn                     | https://www.linkedin.com/in/joelsoteloflores | Ready; normalized from the CV display                                                   |
| GitHub                       | https://github.com/jsoteloflores             | Ready                                                                                   |
| Current institution          | Washington and Lee University                | Ready                                                                                   |
| Current academic stage       | Undergraduate student                        | Ready                                                                                   |
| Expected graduation          | June 2027                                    | Ready                                                                                   |
| Degree program 1             | B.S. Physics                                 | Ready                                                                                   |
| Degree program 2             | B.S. Earth and Environmental Geoscience      | Ready                                                                                   |

## 2.2 Approved concise research-interest list

The following list is directly supported by the research experience shown in the CV:

- computational volcanology
- physical volcanology
- computer vision for eruption imagery
- machine learning for scientific image segmentation
- volcanic micro-CT analysis
- pore-network and permeability analysis
- scientific software development

This is an approved synthesis of the CV rather than a quoted CV section.

## 2.3 Honors thesis

**Working title:**

> Deep Learning Segmentation of Pyroclastic Micro-CT Volumes for Vesicle, Porosity, and Pore-Network Analysis.

Guidance:

- Treat this explicitly as a working title.
- Do not present it as a completed thesis.
- It may be connected to the Ijen micro-CT project.
- Do not infer a defense date, advisor committee, or thesis status beyond the CV.

## 2.4 Relevant coursework

The CV verifies the following coursework list:

- Volcanology
- Modeling and Simulation of Physical Systems
- Earth and Environmental Geochemistry
- GIS and Remote Sensing
- Petrology & Crystallography
- Hydrology
- Geomorphology
- Classical Mechanics
- Electricity and Magnetism
- Statistical Physics
- Quantum Mechanics

This list may later support the About or Education section.

Do not create individual course records.

## 2.5 Study abroad

Verified experiences:

- Big Science in 21st Century Europe, including CERN and the VIRGO Gravitational Wave Detector
- Korean language study at Yonsei University

These facts are optional profile material.

## 2.6 Public CV path

Partially resolved (July 2026).

The supplied CV requires updates to manuscript titles and DOIs before it is ready for public distribution. A separate final version will be provided.

Until the updated CV is approved:

```text
cvPath: omit
```

Do not point the public website to `docs/source-materials/`.

---

# 3. Research projects

The project records below are derived from the CV’s Research Experience section.

## 3.1 Kīlauea lava-fountain computer vision

### Record decision

**Verified and ready for initial project entry**

### Proposed stable ID

```text
kilauea-lava-fountain-computer-vision
```

### Required frontmatter

| Field                | Value                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| title                | Kīlauea Lava-Fountain Computer Vision                                                                                                     |
| subtitle             | Computer vision and scientific software for segmenting lava-fountain video and supporting quantitative extraction of eruption parameters. |
| status               | active                                                                                                                                    |
| startDate            | 2026-06                                                                                                                                   |
| endDate              | omit                                                                                                                                      |
| researchThemes       | computational volcanology; physical volcanology; computer vision; eruption imagery; scientific software                                   |
| featured             | true                                                                                                                                      |
| visibility           | public                                                                                                                                    |
| institutions         | University of Hawaiʻi at Mānoa                                                                                                            |
| advisor              | Natalia Gauer Pasqualon                                                                                                                   |
| methods              | U-Net segmentation; manual image labeling; dataset preparation; video metadata organization; field videography                            |
| tools                | Python                                                                                                                                    |
| relatedPublications  | omit until publication metadata is complete                                                                                               |
| relatedPresentations | omit until presentation metadata is complete                                                                                              |
| relatedSoftware      | omit until the software record is resolved                                                                                                |
| relatedExhibit       | omit                                                                                                                                      |
| sortOrder            | 1                                                                                                                                         |

### Approved summary

Joel is developing a computer-vision pipeline to segment Kīlauea lava-fountain video and support quantitative extraction of eruption parameters from field footage. The project combines U-Net segmentation, manual labeling, dataset preparation, metadata organization, and field video collection under variable lighting, viewing geometry, and field conditions.

### Approved project body facts

#### Scientific question

How can lava-fountain regions be identified consistently in video so that eruption parameters can be extracted quantitatively from field footage?

#### Why it matters

The CV supports the claim that the pipeline is intended to enable quantitative extraction of eruption parameters from volcanic video.

Do not add claims about specific conduit processes, hazard forecasting, eruption-rate formulas, model accuracy, or temporal architecture unless separately verified.

#### Data and materials

Verified:

- Kīlauea lava-fountain video
- field footage
- footage from Episodes 49 and 50
- video metadata
- camera settings
- viewing-condition notes
- observational notes
- manually generated masks and selected frames

#### Methods

Verified:

- U-Net segmentation models
- frame selection
- mask generation
- metadata tracking
- model-ready dataset organization
- field videography and documentation

#### My contribution

Approved wording:

- Developing the computer-vision pipeline
- Trained U-Net segmentation models
- Built a Python-based labeling and dataset-preparation system
- Collected field footage for Kīlauea Episodes 49 and 50
- Documented camera settings, viewing conditions, and observational notes

Do not replace “developing” with “completed.”

#### Current results

The CV verifies that U-Net models have been trained to identify lava-fountain regions across changing lighting, viewing geometry, and field conditions.

The CV does not provide:

- accuracy values
- IoU
- Dice score
- number of labeled frames
- model architecture beyond U-Net
- physical measurement results
- publication acceptance
- deployed software DOI

Do not add those values.

#### Limitations

No project limitations are stated in the CV.

Do not invent limitations. This section may remain concise or be deferred until Joel provides approved language.

#### Research outputs

Candidate outputs exist but are not yet fully ready:

- Journal of Applied Volcanology manuscript: incomplete author list and unresolved exact current status
- research software: DOI unresolved
- anticipated AGU 2026 poster: not confirmed as accepted or presented
- interactive exhibit: not deployed

#### Next steps

The CV does not explicitly list next steps.

Do not infer them.

---

## 3.2 Ijen pyroclast micro-CT and pore-network analysis

### Record decision

**Verified and ready for initial project entry**

### Proposed stable ID

```text
ijen-pyroclast-microct-analysis
```

### Required frontmatter

| Field                | Value                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                | Ijen Pyroclast Micro-CT and Pore-Network Analysis                                                                                                     |
| subtitle             | Deep-learning segmentation and stereometric analysis of pyroclastic materials from the 1817 Kawah Ijen eruption.                                      |
| status               | active                                                                                                                                                |
| startDate            | 2025-06                                                                                                                                               |
| endDate              | omit                                                                                                                                                  |
| researchThemes       | computational volcanology; pyroclast textures; micro-CT; pore networks; permeability; mineral chemistry                                               |
| featured             | true                                                                                                                                                  |
| visibility           | public                                                                                                                                                |
| institutions         | Washington and Lee University                                                                                                                         |
| advisor              | Nicholas Barber                                                                                                                                       |
| methods              | U-Net-based segmentation; stereometric analysis; micro-CT analysis; pore-network analysis; electron microprobe analysis; scanning electron microscopy |
| tools                | Python; Dragonfly; OpenPNM                                                                                                                            |
| relatedPublications  | omit until manuscript metadata is complete                                                                                                            |
| relatedPresentations | omit until exact presentation dates are verified                                                                                                      |
| relatedSoftware      | omit until PyRO-FOAMS naming and access are resolved                                                                                                  |
| relatedExhibit       | omit                                                                                                                                                  |
| sortOrder            | 2                                                                                                                                                     |

### Approved summary

Joel conducts computational volcanology research on pyroclastic micro-CT volumes from the 1817 Kawah Ijen eruption. The work uses U-Net-based deep-learning segmentation, stereometric analysis, Dragonfly, OpenPNM, electron microprobe data, and scanning electron microscopy to investigate vesicularity, pore connectivity, permeability, anisotropy, mineral chemistry, fractionation trends, and pressure-temperature constraints.

### Approved project body facts

#### Scientific question

How can pyroclast textures, pore structure, and mineral chemistry be quantified to help reconstruct the eruptive history of the 1817 Kawah Ijen eruption?

#### Why it matters

The CV explicitly connects the measured textural and chemical characteristics to reconstruction of eruptive history.

#### Data and materials

Verified:

- pyroclastic micro-CT volumes
- volcanic clasts
- 2D thin-section imagery
- electron microprobe data
- scanning electron microscope data
- materials associated with the 1817 Kawah Ijen eruption

#### Methods

Verified:

- U-Net-based deep-learning segmentation
- 3D pore-space segmentation
- stereometric analysis
- automated vesicle analysis
- Dragonfly
- OpenPNM
- porosity analysis
- permeability analysis
- pore-connectivity analysis
- anisotropy analysis
- mineral-chemistry integration
- fractionation interpretation
- pressure-temperature constraints

#### My contribution

Approved wording:

- Conduct computational volcanology research on pyroclastic micro-CT volumes
- Train and evaluate U-Net-based deep-learning models for 3D pore-space segmentation
- Built PyRO-FOAMS, a Python-based stereometric analysis program inspired by Shea et al. (2010)
- Used Dragonfly and OpenPNM to quantify porosity, permeability, pore connectivity, and anisotropy
- Integrated electron microprobe and scanning electron microscope data with textural observations

#### Current results

The CV supports the statement that the work enables quantitative analysis of:

- connected pore networks
- porosity
- permeability
- pore connectivity
- anisotropy
- vesicularity
- eruption-related textural characteristics

The CV does not provide final numerical results.

Do not add numerical porosity, permeability, accuracy, sample counts, or model performance values.

#### Limitations

No limitations are stated in the CV.

Do not invent them.

#### Research outputs

Candidate outputs exist but are not fully ready:

- Volcanica manuscript: abbreviated author list and unresolved exact current status
- AGU 2025 poster: exact presentation date missing
- Montréal oral presentation: official event name and exact date missing
- PyRO-FOAMS research software: canonical capitalization, DOI, and public availability unresolved
- honors thesis: working title only
- 3D exhibit: not deployed

#### Next steps

The CV does not explicitly list next steps.

Do not infer them.

---

## 3.3 V0499 Centauri pulsating-star astronomy

### Record decision

**Verified and ready for initial project entry**

### Proposed stable ID

```text
v0499-centauri-photometry
```

### Required frontmatter

| Field                | Value                                                                                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                | V0499 Centauri Photometric Analysis                                                                                                                                                            |
| subtitle             | Multi-band observational analysis of the RR Lyrae variable star V0499 Centauri.                                                                                                                |
| status               | completed                                                                                                                                                                                      |
| startDate            | 2025-03                                                                                                                                                                                        |
| endDate              | 2026-04                                                                                                                                                                                        |
| researchThemes       | observational astronomy; variable stars; photometry; period analysis; distance estimation                                                                                                      |
| featured             | false                                                                                                                                                                                          |
| visibility           | public                                                                                                                                                                                         |
| institutions         | Washington and Lee University                                                                                                                                                                  |
| advisor              | David W. Sukow                                                                                                                                                                                 |
| methods              | multi-band photometry; folded light curves; phase dispersion minimization; string-length minimization; harmonic analysis of variance; Lomb-Scargle periodograms; photometric distance analysis |
| tools                | Las Cumbres Observatory data                                                                                                                                                                   |
| relatedPublications  | omit until publication year and record ID are resolved                                                                                                                                         |
| relatedPresentations | omit                                                                                                                                                                                           |
| relatedSoftware      | omit                                                                                                                                                                                           |
| relatedExhibit       | omit                                                                                                                                                                                           |
| sortOrder            | 3                                                                                                                                                                                              |

### Approved summary

Joel conducted multi-band observational analysis of the RR Lyrae variable star V0499 Centauri using robotic telescope data from the Las Cumbres Observatory global telescope network. The work included folded light curves, multiple period-determination methods, and photometric-distance analysis using period-luminosity-metallicity relations, extinction corrections, and comparison with Gaia DR3 parallax measurements.

### Approved contribution statements

- Conducted multi-band observational analysis
- Analyzed Las Cumbres Observatory data
- Constructed folded light curves
- Measured pulsation behavior
- Contributed to period determination using multiple algorithms
- Supported photometric-distance analysis

Do not replace “contributed to” or “supported” with stronger ownership language.

---

## 3.4 WDS 03575-0110 double-star astrometry

### Record decision

**Verified and ready for initial project entry**

### Proposed stable ID

```text
wds-03575-0110-astrometry
```

### Required frontmatter

| Field                | Value                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                | WDS 03575-0110 Double-Star Astrometry                                                                                                                        |
| subtitle             | Astrometric analysis of a binary-star system using robotic telescope observations and historical measurements.                                               |
| status               | completed                                                                                                                                                    |
| startDate            | 2024-10                                                                                                                                                      |
| endDate              | 2025-04                                                                                                                                                      |
| researchThemes       | double stars; astrometry; orbital analysis; observational astronomy                                                                                          |
| featured             | false                                                                                                                                                        |
| visibility           | public                                                                                                                                                       |
| institutions         | Washington and Lee University                                                                                                                                |
| advisor              | David W. Sukow                                                                                                                                               |
| methods              | robotic telescope observations; separation measurement; position-angle measurement; historical comparison; Gaia DR3 comparison; orbital parameter estimation |
| tools                | Las Cumbres Observatory; AstroImageJ; Desmos                                                                                                                 |
| relatedPublications  | wds-03575-0110-desmos-fitting                                                                                                                                |
| relatedPresentations | omit                                                                                                                                                         |
| relatedSoftware      | omit                                                                                                                                                         |
| relatedExhibit       | omit                                                                                                                                                         |
| sortOrder            | 4                                                                                                                                                            |

### Approved summary

Joel conducted astrometric analysis of WDS 03575-0110 using robotic telescope observations from Las Cumbres Observatory. He used AstroImageJ to measure separation and position angle, compared new measurements with historical observations and Gaia DR3 data, evaluated common proper motion, and contributed to refining orbital parameter estimates.

### Approved contribution statements

- Conducted astrometric analysis
- Used AstroImageJ to measure separation and position angle
- Compared new measurements with historical observations and Gaia DR3
- Evaluated common proper motion
- Contributed to refining orbital parameter estimates

The CV describes the parameter-estimation techniques as novel.

Avoid emphasizing novelty unless the publication or advisor-approved summary provides the specific basis.

---

## 3.5 Nanotechnology and magnetic-dipole systems

### Record decision

**Verified and ready as a secondary project entry**

### Proposed stable ID

```text
nanoparticle-dipole-self-assembly
```

### Required frontmatter

| Field                | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| title                | Nanoparticle and Magnetic-Dipole Self-Assembly                                                 |
| subtitle             | Laboratory investigation of field-driven nanoparticle and magnetic-dipole interactions.        |
| status               | completed                                                                                      |
| startDate            | 2024-01                                                                                        |
| endDate              | 2024-03                                                                                        |
| researchThemes       | nanotechnology; particle physics; self-assembly; magnetic dipoles; experimental physics        |
| featured             | false                                                                                          |
| visibility           | public                                                                                         |
| institutions         | Washington and Lee University                                                                  |
| advisor              | Irina Mazilu                                                                                   |
| methods              | laboratory experimentation; applied electric fields; apparatus design; interaction measurement |
| tools                | omit                                                                                           |
| relatedPublications  | omit                                                                                           |
| relatedPresentations | omit                                                                                           |
| relatedSoftware      | omit                                                                                           |
| relatedExhibit       | omit                                                                                           |
| sortOrder            | 5                                                                                              |

### Approved summary

Joel assisted with laboratory research on electric-field-driven self-assembly of nanoparticles and magnetic-dipole systems. He investigated dipole interactions and designed experimental apparatuses to observe, measure, and record magnetic-dipole behavior.

### Contribution language restriction

Preserve the word **assisted** for the overall research role.

Approved wording:

- Assisted with laboratory research
- Investigated dipole interactions and alignment
- Designed experimental apparatuses

Do not present Joel as the project lead.

---

## 3.6 Computational number theory

### Record decision

**Verified and ready as a secondary project entry**

### Proposed stable ID

```text
riesel-sierpinski-computational-number-theory
```

### Required frontmatter

| Field                | Value                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| title                | Computational Number Theory: Riesel-Sierpiński Sequences                                                  |
| subtitle             | Algorithmic exploration of Riesel-Sierpiński numbers within recursive sequences.                          |
| status               | completed                                                                                                 |
| startDate            | 2023-06                                                                                                   |
| endDate              | 2023-08                                                                                                   |
| researchThemes       | computational number theory; recursive sequences; algorithm development; mathematical pattern recognition |
| featured             | false                                                                                                     |
| visibility           | public                                                                                                    |
| institutions         | Washington and Lee University                                                                             |
| advisor              | Carrie Finch-Smith                                                                                        |
| methods              | algorithm development; recursive-sequence analysis; mathematical pattern recognition                      |
| tools                | R                                                                                                         |
| relatedPublications  | omit                                                                                                      |
| relatedPresentations | omit                                                                                                      |
| relatedSoftware      | omit                                                                                                      |
| relatedExhibit       | omit                                                                                                      |
| sortOrder            | 6                                                                                                         |

### Approved summary

As an AIM Research Scholar, Joel developed an algorithm in R to identify Riesel-Sierpiński numbers within recursive sequences and applied computational methods to number-theory problems and mathematical pattern recognition.

### Approved contribution statements

- Developed an algorithm in R
- Applied computational methods to recursive sequences
- Explored number-theory and mathematical pattern-recognition problems

---

# 4. Publications and manuscripts

## 4.1 Published double-star article

### Record decision

**Verified and ready for publication entry**

### Proposed stable ID

```text
wds-03575-0110-desmos-fitting
```

### Frontmatter

| Field          | Value                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------- |
| title          | New Measurements and Proposed Orbital Parameters for WDS 03575-0110 using Desmos Fitting |
| authors        | See ordered author list below                                                            |
| year           | 2025                                                                                     |
| type           | journal-article                                                                          |
| status         | published                                                                                |
| visibility     | public                                                                                   |
| featured       | true                                                                                     |
| journal        | Journal of Double Star Observations                                                      |
| volume         | 21                                                                                       |
| issue          | 2                                                                                        |
| pages          | 182-189                                                                                  |
| doi            | omit; none listed in CV                                                                  |
| url            | omit unless separately verified                                                          |
| pdf            | omit unless public sharing is approved                                                   |
| relatedProject | wds-03575-0110-astrometry                                                                |
| sortDate       | 2025                                                                                     |

### Ordered authors

1. Joel A. Sotelo Flores
   - `isJoel: true`
   - Note: The citation abbreviates the name as “Sotelo Flores, J.”
2. S. Acevedo
   - `isJoel: false`
3. A. Pickens
   - `isJoel: false`
4. D. W. Sukow
   - `isJoel: false`

### Citation source text

> Sotelo Flores, J., Acevedo, S., Pickens, A., & Sukow, D. W. (2025). “New Measurements and Proposed Orbital Parameters for WDS 03575-0110 using Desmos Fitting.” Journal of Double Star Observations, 21(2), 182-189.

### Unresolved optional fields

- DOI
- official article URL
- public PDF permission
- exact publication date

These omissions do not block entry.

---

## 4.2 V0499 Centauri manuscript

### Record decision

**Verified manuscript identity, but not ready for collection entry**

### Proposed stable ID

```text
v0499-centauri-photometric-distance
```

### Verified fields

| Field          | Value                                                          |
| -------------- | -------------------------------------------------------------- |
| title          | BViz Photometric Distance to the RR Lyrae Star V0499 Centauri  |
| type           | journal-article                                                |
| status         | in-review                                                      |
| visibility     | public, once required metadata is complete                     |
| journal        | Journal of the American Association of Variable Star Observers |
| relatedProject | v0499-centauri-photometry                                      |

### Ordered authors

1. David W. Sukow
2. Joel A. Sotelo Flores
3. J. Nagy
4. R. Freed

Joel must be marked:

```text
isJoel: true
```

### Blocking unresolved field

The existing publication schema requires `year`.

The CV does not provide a year for this under-review manuscript.

Do not infer the submission year.

### Additional unresolved fields

- full first names or preferred author display
- submission date
- exact current status confirmation
- official manuscript URL, if any
- DOI, if later assigned

### Agent instruction

Do not create this publication record until the required year is supplied or the schema policy is explicitly revised.

Add it to `CONTENT_QUESTIONS.md`.

---

## 4.3 Pyroclast micro-CT manuscript

### Record decision

**Excluded from collection entry until metadata is completed**

### Proposed stable ID

```text
pyroclast-microct-pore-network-manuscript
```

### Verified fields

| Field            | Value                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------- |
| title            | Deep Learning Segmentation and Pore-Network Characterization of Pyroclastic Micro-CT Volumes |
| intended journal | Volcanica                                                                                    |
| relatedProject   | ijen-pyroclast-microct-analysis                                                              |

### CV status language

The manuscript appears under the heading:

```text
Manuscripts Under Review
```

The citation says:

```text
Submitted to Volcanica
```

### Blocking unresolved fields

- complete author list
- exact author order
- year
- whether the current controlled status should be `submitted` or `in-review`
- submission date
- official journal metadata or manuscript URL

### Agent instruction

Do not enter this record publicly.

Do not convert the ellipsis into an author.

---

## 4.4 Kīlauea computer-vision manuscript

### Record decision

**Excluded from collection entry until metadata is completed**

### Proposed stable ID

```text
kilauea-fountain-computer-vision-manuscript
```

### Verified fields

| Field            | Value                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| title            | Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction |
| intended journal | Journal of Applied Volcanology                                                                         |
| relatedProject   | kilauea-lava-fountain-computer-vision                                                                  |

### CV status language

The manuscript appears under:

```text
Manuscripts Under Review
```

The citation says:

```text
Submitted to Journal of Applied Volcanology
```

### Blocking unresolved fields

- complete author list
- exact author order
- year
- whether the controlled status is `submitted` or `in-review`
- submission date
- official manuscript URL

### Agent instruction

Do not enter this record publicly.

Do not convert the ellipsis into an author.

---

## 4.5 Nature manuscript placeholder

### Record decision

**Excluded**

### CV text

> Pasqualon, N. G., ..., Sotelo Flores, J., ... “Title.” Submitted to Nature.

### Reason for exclusion

The CV contains:

- a placeholder title
- an incomplete author list
- incomplete author order
- no year
- no submission date
- no complete metadata

Do not create a record.

---

## 4.6 Barber-led journal manuscript placeholder

### Record decision

**Excluded**

### CV text

> Barber, N. D., ..., Sotelo Flores, J., ... “Title.” Submitted to [Journal Name].

### Reason for exclusion

The CV contains:

- a placeholder title
- placeholder journal
- incomplete author list
- incomplete author order
- no year
- no submission date

Do not create a record.

---

# 5. Presentations

## 5.1 AGU 2025 Ijen poster

### Record decision

**Verified presentation identity, but not ready for collection entry**

### Proposed stable ID

```text
agu-2025-ijen-pyroclast-poster
```

### Verified fields

| Field          | Value                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| title          | Textural and Chemical Reconstructions of the 1817 Kawah Ijen Eruption: 3D Deep Learning Segmentation and Chemical Depictions of Pyroclasts |
| event          | American Geophysical Union Fall Meeting                                                                                                    |
| type           | poster                                                                                                                                     |
| location       | unresolved                                                                                                                                 |
| relatedProject | ijen-pyroclast-microct-analysis                                                                                                            |
| contribution   | Joel is first author and poster presenter, as represented by the CV citation                                                               |
| visibility     | public                                                                                                                                     |
| featured       | true                                                                                                                                       |

### Ordered authors

1. Joel A. Sotelo Flores
2. Nicholas D. Barber
3. K. Berlo
4. E. Handini
5. G. Buono
6. L. Pappalardo
7. V. van Hinsberg

Use the abbreviated initials exactly as the CV provides unless full names are separately verified.

### Blocking unresolved fields

The presentation schema requires an exact ISO date.

The CV provides only the year 2025.

Also unresolved:

- exact date
- official meeting location
- poster PDF path
- thumbnail
- abstract text

### Agent instruction

Do not create the presentation record until the exact date is supplied.

---

## 5.2 Montréal Ijen oral presentation

### Record decision

**Verified presentation identity, but not ready for collection entry**

### Proposed stable ID

```text
montreal-2026-ijen-stereology-oral
```

### Verified fields

| Field          | Value                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| title          | A field-based and 2D/3D stereological analysis of pyroclasts from the Ijen Caldera Complex: new insights into eruptive history and processes |
| type           | oral-presentation                                                                                                                            |
| location       | Palais des congrès de Montréal, Montréal, Canada                                                                                             |
| relatedProject | ijen-pyroclast-microct-analysis                                                                                                              |
| visibility     | public                                                                                                                                       |
| featured       | true                                                                                                                                         |

### Ordered authors

1. Nicholas D. Barber
2. Joel A. Sotelo Flores
3. G. P. Surya
4. E. Handini
5. K. Berlo
6. V. van Hinsberg
7. G. Buono
8. L. Pappalardo
9. A. Ratdomopurbo
10. T. R. Ayuningtyas

### Session or theme shown on CV

> Theme 04: Magmatism and Volcanism: Impacts and Consequences

This appears to be a theme or session label, not necessarily the official event name.

### Blocking unresolved fields

- exact ISO date
- official conference or event name
- whether Joel personally delivered the talk or was a non-presenting coauthor
- abstract
- slides or recording

### Contribution guidance

Until verified, do not say Joel presented the talk.

Safe wording:

> Coauthor on an oral presentation.

### Agent instruction

Do not create the presentation record until the exact date and official event name are supplied.

---

## 5.3 Anticipated AGU 2026 Kīlauea poster

### Record decision

**Excluded until acceptance and presentation are confirmed**

### CV text

> Sotelo Flores, J. (submitted, anticipated 2026). “Computer Vision Segmentation of Kīlauea Lava Fountain Video for Physical Eruption Parameter Extraction.” Poster presentation expected, American Geophysical Union Fall Meeting.

### Reason for exclusion

The CV describes a submitted and anticipated presentation, not a confirmed completed presentation.

Missing:

- acceptance
- exact date
- full author list
- final title confirmation
- event location
- actual presentation status

Do not create a public presentation record.

---

## 5.4 Anticipated AGU 2026 micro-CT poster

### Record decision

**Excluded until acceptance and presentation are confirmed**

### CV text

> Sotelo Flores, J. (submitted, anticipated 2026). “Deep Learning Segmentation and Pore-Network Characterization of Pyroclastic Micro-CT Volumes.” Poster presentation expected, American Geophysical Union Fall Meeting.

### Reason for exclusion

The CV describes a submitted and anticipated presentation.

Missing:

- acceptance
- exact date
- full author list
- final title confirmation
- event location
- actual presentation status

Do not create a public presentation record.

---

# 6. Software and research products

## 6.1 Kīlauea lava-fountain pipeline

### Record decision

**Verified software identity, but not ready for public software entry**

### Proposed stable ID

```text
kilauea-fountain-segmentation-pipeline
```

### Verified fields

| Field             | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| name              | Kīlauea Lava Fountain Segmentation and Labeling Pipeline                                                     |
| scientificProblem | Segment lava-fountain video and support calculation of eruption parameters for eruptive episodes of Kīlauea. |
| relatedProjects   | kilauea-lava-fountain-computer-vision                                                                        |
| author            | Joel A. Sotelo Flores                                                                                        |
| nominal year      | 2026                                                                                                         |

### CV description

> Computer Vision pipeline to segment and calculate eruption parameters for eruptive episodes of Kīlauea.

### Blocking unresolved fields

- whether the software is currently public, private, experimental, active, or stable
- verified repository URL
- verified Zenodo record
- DOI
- canonical summary
- exact implemented capability list
- documentation URL
- screenshots approved for public use

### Agent instruction

Do not create a public software record from the incomplete Zenodo citation.

Add questions to `CONTENT_QUESTIONS.md`.

---

## 6.2 PyRO-FOAMS

### Record decision

**Verified software concept, but not ready for public software entry**

### Proposed stable ID

```text
pyro-foams
```

### Naming conflict

The CV uses both:

```text
PyRO-FOAMS
PyRo-FOAMS
```

The canonical capitalization is unresolved.

### Verified fields

| Field             | Value                                                                               |
| ----------------- | ----------------------------------------------------------------------------------- |
| scientificProblem | Automated vesicle and stereometric analysis from 2D thin-section imagery            |
| roleInPipeline    | Supports classical and machine-learning computation for volcanic pyroclast analysis |
| relatedProjects   | ijen-pyroclast-microct-analysis                                                     |
| author            | Joel A. Sotelo Flores                                                               |
| nominal year      | 2026                                                                                |
| inspiration       | Shea et al. (2010)                                                                  |

### Expansion shown on CV

> Python Robotic Fast Object Acquisition and Measurement System

### Blocking unresolved fields

- canonical public name and capitalization
- whether the acronym expansion is final
- current software status
- public repository URL
- verified Zenodo record
- DOI
- implemented capability list
- documentation URL
- screenshots approved for public use

### Agent instruction

Do not create a public software record until the canonical name and access status are confirmed.

---

# 7. Exhibits

No exhibit is verified as deployed.

Do not create records for:

- Kīlauea observation-to-measurement exhibit
- model-training and inference exhibit
- 3D pyroclast exhibit

These may be listed in `CONTENT_INVENTORY.md` as planned external projects.

Required current collection state:

```text
src/content/exhibits/
└── .gitkeep
```

---

# 8. Awards, fellowships, and scholarships

These facts are verified by the CV but are not represented by the current five content collections.

Retain them in this source-of-truth file for a later profile or awards section.

| Award                                                                                  | Date         |
| -------------------------------------------------------------------------------------- | ------------ |
| R. Preston Hawkins IV Geology Field Research Award                                     | April 2026   |
| Samuel J. Kozak-Odell S. McGuire-Edgar W. Spencer L. Schwab Geology Lab Research Award | April 2025   |
| U.S. Department of State Gilman Scholar                                                | January 2024 |
| QuestBridge Scholar                                                                    | March 2023   |

Do not create a new collection during Ticket 004 unless a separate ticket revises the content model.

The punctuation and dash styling in the long geology award should be reviewed against an official award source before final public rendering.

---

# 9. Research training and scientific programs

These facts are verified but are not currently modeled as publications, presentations, projects, software, or exhibits.

## 9.1 Green Bank Observatory ERIRA Program

| Field       | Value                     |
| ----------- | ------------------------- |
| date        | August 2025               |
| institution | Green Bank Observatory    |
| location    | Green Bank, West Virginia |

Verified activities:

- hands-on pulsar data analysis
- radio telescope operations
- radio astronomy research methods
- PyTorch machine-learning models for detection and classification of galaxy images

Potential future treatment:

- About-page experience
- training section
- secondary project, only if Joel wants the galaxy-classification work represented as a project

Do not create a project record automatically.

## 9.2 Michigan State Nuclear Science Summer School

| Field       | Value                                                      |
| ----------- | ---------------------------------------------------------- |
| date        | May 2025                                                   |
| institution | Facility for Rare Isotope Beams, Michigan State University |
| location    | East Lansing, Michigan                                     |

Verified activities:

- nuclear-science workshops
- rare-isotope research
- nuclear-physics techniques
- data analysis
- exposure to experimental and computational isotope workflows

Potential future treatment:

- About-page training section

Do not create a project record automatically.

---

# 10. Teaching and mentoring

These facts are verified but are not represented by the current content collections.

## 10.1 Physics and Astronomy Teaching Assistant

| Field       | Value                         |
| ----------- | ----------------------------- |
| institution | Washington and Lee University |
| start       | September 2024                |
| end         | December 2025                 |
| location    | Lexington, Virginia           |

Verified responsibilities:

- assisted students in observational astronomy and introductory physics laboratories
- supported data collection, analysis, and interpretation
- guided students using the Skynet Robotic Telescope Network
- guided students using Afterglow image-processing software
- helped connect image processing, telescope observations, and physical interpretation

## 10.2 AIM Program Advisor

| Field       | Value                         |
| ----------- | ----------------------------- |
| institution | Washington and Lee University |
| start       | June 2025                     |
| end         | July 2025                     |
| location    | Lexington, Virginia           |

Verified responsibilities:

- residential and academic mentoring
- supported incoming students transitioning to college
- helped build community
- encouraged academic confidence
- connected students with campus resources
- facilitated group activities and informal advising

Potential future treatment:

- About page
- service or mentoring section
- CV-only information

Do not create a collection during Ticket 004.

---

# 11. Initial Ticket 004 entry plan

## 11.1 Records approved for entry

### Projects

1. `kilauea-lava-fountain-computer-vision`
2. `ijen-pyroclast-microct-analysis`
3. `v0499-centauri-photometry`
4. `wds-03575-0110-astrometry`
5. `nanoparticle-dipole-self-assembly`
6. `riesel-sierpinski-computational-number-theory`

### Publications

1. `wds-03575-0110-desmos-fitting`

### Presentations

None yet.

Reason:

- required exact dates are missing

### Software

None yet.

Reason:

- public status, repository information, DOI, or canonical naming is unresolved

### Exhibits

None.

Reason:

- no deployed external exhibit is verified

## 11.2 Profile object

Approved for creation, with the following restrictions:

- Use `Joel Sotelo Flores` as the public display name (resolved Q1). Retain `Joel A. Sotelo Flores` as `fullName` for citation author entries.
- Include academic email, LinkedIn, and GitHub.
- Include institution, degrees, expected graduation, and location (Lexington, Virginia — resolved Q2).
- Include the approved research-interest list.
- Omit GPA.
- Omit a CV path until an updated final version is approved (Q3 partially resolved).
- Do not create final biography prose.

---

# 12. Required unresolved questions

Ticket 004 must create or update `docs/CONTENT_QUESTIONS.md` with at least the following questions.

## Profile

1. Should the sitewide professional name be:
   - Joel A. Sotelo Flores
   - Joel Sotelo Flores

2. Should Lexington, Virginia be displayed publicly, omitted, or shown only in contact metadata?

3. Is the supplied CV approved as the public downloadable CV, or will a separate final version be provided?

## V0499 Centauri manuscript

4. What year should be used for the under-review manuscript?

5. What is its exact current status:
   - submitted
   - in review
   - accepted
   - another status

6. Is there an official manuscript or journal URL?

## Volcanica manuscript

7. What is the complete author list in exact order?

8. Is the exact current status `submitted` or `in-review`?

9. What year and submission date should be used?

10. Is the title final?

## Journal of Applied Volcanology manuscript

11. What is the complete author list in exact order?

12. Is the exact current status `submitted` or `in-review`?

13. What year and submission date should be used?

14. Is the title final?

## Nature manuscript

15. What is the final title?

16. What is the complete author list and order?

17. What is the current status and submission date?

18. Is this manuscript approved for public display before editorial review or publication?

## Barber-led manuscript

19. What is the final title?

20. What is the complete author list and order?

21. What journal was selected?

22. What is the current status and submission date?

23. Is this manuscript approved for public display?

## AGU 2025 poster

24. What was the exact presentation date?

25. What was the official meeting location?

26. Is the poster PDF approved for public download?

27. Is there an official abstract URL?

## Montréal oral presentation

28. What was the exact presentation date?

29. What was the official conference or event name?

30. Did Joel deliver the oral presentation, or was he a non-presenting coauthor?

31. Are slides or an abstract approved for public sharing?

## AGU 2026 submissions

32. Were either poster submissions accepted?

33. If accepted, what are the final author lists, titles, dates, and event location?

34. If not yet presented, should they remain absent until after the meeting?

## Kīlauea software

35. What is the canonical software name?

36. Is the software public, private, active, experimental, or stable?

37. What is the public repository URL, if any?

38. Does the Zenodo record currently exist?

39. What is the DOI?

40. Which capabilities are currently implemented and approved for public description?

## PyRO-FOAMS

41. What is the canonical capitalization:

- PyRO-FOAMS
- PyRo-FOAMS
- another form

42. Is “Python Robotic Fast Object Acquisition and Measurement System” the final approved expansion?

43. Is the software public, private, active, experimental, or stable?

44. What is the repository URL?

45. Does the Zenodo record currently exist?

46. What is the DOI?

47. Which capabilities are currently implemented and approved for public description?

## Published double-star paper

48. Is there an official article URL or DOI?

49. May a PDF be hosted publicly?

---

# 13. Explicit exclusions for Ticket 004

Do not enter:

- incomplete manuscripts with ellipsis author lists
- placeholder manuscript titles
- placeholder journals
- missing DOIs represented by ellipses
- anticipated AGU 2026 presentations
- software Zenodo citations without verified records
- planned interactive exhibits
- awards as a new collection
- training programs as projects without Joel’s approval
- teaching and mentoring as a new collection
- final About-page prose
- unverified numerical research results
- unpublished figures or media

---

# 14. Traceability map

| Source section                            | Portfolio content                          |
| ----------------------------------------- | ------------------------------------------ |
| CV header and Education                   | profile object                             |
| Research Experience                       | project records                            |
| Publications and Manuscripts              | publication candidates                     |
| Software and Research Products            | software candidates                        |
| Presentations                             | presentation candidates                    |
| Awards, Fellowships, and Scholarships     | retained for future profile/awards work    |
| Research Training and Scientific Programs | retained for future About/training work    |
| Teaching and Mentoring                    | retained for future service/mentoring work |

---

# 15. Agent completion requirement

During Ticket 004, the coding agent must:

1. Create the six approved project records.
2. Create the one approved publication record.
3. Create the typed public profile object with the restrictions above.
4. Leave presentations empty.
5. Leave software empty.
6. Leave exhibits empty.
7. Create `docs/CONTENT_INVENTORY.md`.
8. Create or update `docs/CONTENT_QUESTIONS.md`.
9. Create `docs/CONTENT_ENTRY_REPORT.md`.
10. Run all repository validation.
11. Report every field omitted because it was unresolved.

The agent must not enter a blocked record merely to increase the number of populated collections.

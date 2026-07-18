# Media Source of Truth

## Purpose

This file is the authoritative media inventory for the academic portfolio of **Joel Sotelo Flores**.

The source assets currently live in:

```text
docs/media/
```

Files under `docs/media/` are **repository source media** — not directly served by the site. Public derivatives are generated from these files by `npm run media:process` and placed under `public/media/`. Source files must never be referenced from public pages.

Approved website-ready derivatives will later be placed under:

```text
public/media/
```

This document controls:

- scientific interpretation
- image and video pair relationships
- captions and alternative text
- credits and permissions
- privacy and sanitization checks
- intended page placement
- public filename conventions

The coding agent must not infer scientific meaning beyond what this document states.

---

# 1. Global media rules

## 1.1 Preserve source files

Keep every original file unchanged in:

```text
docs/media/
```

Do not overwrite, crop, resize, rotate, recompress, rename, or otherwise modify the source copies.

## 1.2 Public derivatives

Ticket 006 may create approved derivatives in:

```text
public/media/projects/kilauea/
public/media/projects/ijen/
public/media/about/
public/media/software/
public/media/social/
```

Only reviewed and approved assets should be copied into `public/`.

## 1.3 Aligned still-image pairs

The following still-image pairs share the same resolution, crop boundaries, and region of interest:

1. Daytime Kīlauea RGB frame and binary mask
2. Nighttime Kīlauea RGB frame and binary mask
3. Original SEM image and PyRO-FOAMS mask

Pair members must remain geometrically aligned.

Do not:

- crop only one member
- resize pair members to different dimensions
- rotate only one member
- change aspect ratio
- add unequal padding
- apply different framing

## 1.4 Aligned video pair

The following two files represent the **same five-second Kīlauea video sequence**:

```text
binarymask5.mov
Greenoutline5.mov
```

They must be treated as a synchronized video pair.

- `binarymask5.mov` shows the binary mask sequence.
- `Greenoutline5.mov` shows the same RGB sequence with a green segmentation outline.
- Their timing, trimming, playback speed, frame extraction, poster-frame selection, and transcoding must remain synchronized.
- Do not remove frames from one clip without applying the identical operation to the other.
- Do not present them as unrelated examples.

## 1.5 Scientific labeling

Before public use, confirm whether each mask or outline represents:

- a manually labeled ground-truth mask
- a model prediction
- a post-processed model prediction
- a PyRO-FOAMS output
- another derived product

Do not describe all segmentation media as “AI output.”

## 1.6 Credits and privacy

Before copying any asset into `public/`, inspect it for:

- GPS metadata
- camera serial numbers
- personal account names
- local filesystem paths
- private filenames
- unpublished dataset names
- field notes
- manuscript information
- unapproved faces
- institution-restricted material

Remove unnecessary EXIF metadata from public derivatives.

## 1.7 Status values

This document uses:

- **Candidate** — available for review but not yet approved
- **Approved** — explicitly approved for public use
- **Hold** — do not publish until a stated issue is resolved
- **Excluded** — do not use

All assets begin as **Candidate** unless marked otherwise.

---

# 2. Asset inventory

## 2.1 Daytime Kīlauea still-image pair

### KIL-IMG-01A — Daytime RGB frame

| Field                     | Value                                                           |
| ------------------------- | --------------------------------------------------------------- |
| Source filename           | `28_KilaueaOverlook1_frame00032168.png`                         |
| Project                   | Kīlauea Lava-Fountain Computer Vision                           |
| Description               | Daytime RGB image of a Kīlauea lava-fountain frame              |
| Pair                      | `KIL-IMG-01B`                                                   |
| Alignment                 | Same resolution, boundaries, and ROI as paired mask             |
| Status                    | Approved                                                        |
| Suggested public filename | `daytime-fountain-rgb.webp`                                     |
| Suggested roles           | Homepage comparison; Kīlauea project hero; original/mask figure |
| Credit                    | Joel Sotelo Flores                                              |

**Draft alt text**

> Daytime frame showing an active Kīlauea lava fountain viewed from the Kīlauea Overlook.

**Draft caption**

> Daytime Kīlauea lava-fountain frame used in the segmentation workflow.

### KIL-IMG-01B — Daytime binary mask

| Field                     | Value                                                       |
| ------------------------- | ----------------------------------------------------------- |
| Source filename           | `28_KilaueaOverlook1_frame00032168_mask.png`                |
| Project                   | Kīlauea Lava-Fountain Computer Vision                       |
| Description               | Binary segmentation mask aligned with the daytime RGB frame |
| Pair                      | `KIL-IMG-01A`                                               |
| Alignment                 | Same resolution, boundaries, and ROI as paired RGB image    |
| Status                    | Approved                                                    |
| Suggested public filename | `daytime-fountain-mask.png`                                 |
| Suggested roles           | Homepage comparison; Kīlauea original/mask figure           |
| Provenance                | Model prediction                                            |

**Draft alt text**

> Binary mask isolating the lava-fountain region in the corresponding daytime Kīlauea frame.

**Draft caption**

> Binary segmentation mask aligned with the daytime lava-fountain frame.

---

## 2.2 Nighttime Kīlauea still-image pair

### KIL-IMG-02A — Nighttime RGB frame

| Field                     | Value                                                       |
| ------------------------- | ----------------------------------------------------------- |
| Source filename           | `28_KilaueaOverlook2_frame00034716.png`                     |
| Project                   | Kīlauea Lava-Fountain Computer Vision                       |
| Description               | Nighttime RGB image of a second Kīlauea lava-fountain frame |
| Pair                      | `KIL-IMG-02B`                                               |
| Alignment                 | Same resolution, boundaries, and ROI as paired mask         |
| Status                    | Approved                                                    |
| Suggested public filename | `night-fountain-rgb.webp`                                   |
| Suggested roles           | Kīlauea comparison; changing-lighting example               |
| Credit                    | Joel Sotelo Flores                                          |

**Draft alt text**

> Nighttime frame showing an active Kīlauea lava fountain against a dark background.

**Draft caption**

> Nighttime Kīlauea lava-fountain frame representing a different lighting condition.

### KIL-IMG-02B — Nighttime binary mask

| Field                     | Value                                                         |
| ------------------------- | ------------------------------------------------------------- |
| Source filename           | `28_KilaueaOverlook2_frame00034716_mask.png`                  |
| Project                   | Kīlauea Lava-Fountain Computer Vision                         |
| Description               | Binary segmentation mask aligned with the nighttime RGB frame |
| Pair                      | `KIL-IMG-02A`                                                 |
| Alignment                 | Same resolution, boundaries, and ROI as paired RGB image      |
| Status                    | Approved                                                      |
| Suggested public filename | `night-fountain-mask.png`                                     |
| Suggested roles           | Kīlauea original/mask comparison                              |
| Provenance                | Model prediction                                              |

**Draft alt text**

> Binary mask isolating the lava-fountain region in the corresponding nighttime Kīlauea frame.

**Draft caption**

> Binary segmentation mask aligned with the nighttime lava-fountain frame.

---

## 2.3 Five-second Kīlauea synchronized video pair

### KIL-VID-01A — Binary-mask sequence

| Field                     | Value                                                            |
| ------------------------- | ---------------------------------------------------------------- |
| Source filename           | `binarymask5.mov`                                                |
| Project                   | Kīlauea Lava-Fountain Computer Vision                            |
| Description               | Five-second binary-mask sequence of a Kīlauea lava fountain      |
| Pair                      | `KIL-VID-01B`                                                    |
| Synchronization           | Same underlying video and timing as paired green-outline clip    |
| Status                    | Approved                                                         |
| Suggested public filename | `fountain-binary-mask.mp4`                                       |
| Suggested roles           | Kīlauea methods section; temporal segmentation demonstration     |
| Processing needed         | Convert to MP4; create poster frame; remove unnecessary metadata |
| Provenance                | Model prediction                                                 |

**Draft accessible description**

> A five-second binary sequence in which the segmented lava-fountain region changes shape from frame to frame.

**Draft caption**

> Binary segmentation of a five-second Kīlauea lava-fountain sequence.

### KIL-VID-01B — RGB sequence with green outline

| Field                     | Value                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------- |
| Source filename           | `Greenoutline5.mov`                                                                     |
| Project                   | Kīlauea Lava-Fountain Computer Vision                                                   |
| Description               | The same five-second Kīlauea RGB sequence with a green segmentation outline             |
| Pair                      | `KIL-VID-01A`                                                                           |
| Synchronization           | Same underlying video and timing as paired binary-mask clip                             |
| Status                    | Approved                                                                                |
| Suggested public filename | `fountain-outline-overlay.mp4`                                                          |
| Suggested roles           | Kīlauea methods section; paired temporal comparison                                     |
| Processing needed         | Convert using the same timing and settings as paired clip; create matching poster frame |
| Provenance                | Model prediction                                                                        |

**Draft accessible description**

> The same five-second Kīlauea lava-fountain sequence with a bright green contour following the segmented fountain boundary.

**Draft caption**

> Segmentation contour overlaid on the same Kīlauea video sequence shown in the paired binary-mask clip.

---

## 2.4 Personal and field photographs

### BIO-IMG-01 — Delicate Arch

| Field                     | Value                                 |
| ------------------------- | ------------------------------------- |
| Source filename           | `IMG_2925.jpeg`                       |
| Description               | Joel under Delicate Arch              |
| Status                    | Approved                              |
| Suggested public filename | `joel-delicate-arch.webp`             |
| Suggested role            | Optional About-page secondary image   |
| Priority                  | Low; not directly tied to volcanology |
| Credit                    | Joel Sotelo Flores                    |

**Draft alt text**

> Joel Sotelo Flores standing beneath Delicate Arch.

### BIO-IMG-02 — Mauna Loa

| Field                     | Value                                  |
| ------------------------- | -------------------------------------- |
| Source filename           | `IMG_3387.jpeg`                        |
| Description               | Joel standing on Mauna Loa             |
| Status                    | Approved                               |
| Suggested public filename | `joel-mauna-loa.webp`                  |
| Suggested role            | Primary About-page portrait (selected) |
| Priority                  | High                                   |
| Credit                    | Joel Sotelo Flores                     |

**Draft alt text**

> Joel Sotelo Flores standing on the volcanic landscape of Mauna Loa.

### BIO-IMG-03 — Kīlauea selfie

| Field                     | Value                              |
| ------------------------- | ---------------------------------- |
| Source filename           | `IMG_3447.jpeg`                    |
| Description               | Selfie of Joel in front of Kīlauea |
| Status                    | Approved                           |
| Suggested public filename | `joel-kilauea-selfie.webp`         |
| Suggested role            | Informal fieldwork context         |
| Credit                    | Joel Sotelo Flores                 |

**Draft alt text**

> Joel Sotelo Flores photographed in front of Kīlauea.

### BIO-IMG-04 — Full-body Kīlauea portrait

| Field                     | Value                                            |
| ------------------------- | ------------------------------------------------ |
| Source filename           | `IMG_3453.jpeg`                                  |
| Description               | Full-body photograph of Joel in front of Kīlauea |
| Status                    | Approved                                         |
| Suggested public filename | `joel-at-kilauea.webp`                           |
| Suggested role            | About-page or fieldwork portrait                 |
| Priority                  | High                                             |
| Credit                    | Joel Sotelo Flores                               |

**Draft alt text**

> Joel Sotelo Flores standing in front of the Kīlauea volcanic landscape.

### KIL-PHOTO-01 — Kīlauea fountain

| Field                     | Value                                 |
| ------------------------- | ------------------------------------- |
| Source filename           | `IMG_3464.jpeg`                       |
| Description               | Photograph of a Kīlauea lava fountain |
| Status                    | Approved                              |
| Suggested public filename | `kilauea-fountain-field-photo.webp`   |
| Suggested role            | Kīlauea project observational context |
| Confirmation needed       | Episode or date only if used publicly |
| Credit                    | Joel Sotelo Flores                    |

**Draft alt text**

> Lava fountain erupting at Kīlauea, viewed from a distance.

### KIL-PHOTO-02 — Kīlauea sunset

| Field                     | Value                           |
| ------------------------- | ------------------------------- |
| Source filename           | `IMG_3645.jpeg`                 |
| Description               | Sunset photograph of Kīlauea    |
| Status                    | Approved                        |
| Suggested public filename | `kilauea-sunset.webp`           |
| Suggested role            | Atmospheric field-context image |
| Priority                  | Secondary                       |
| Credit                    | Joel Sotelo Flores              |

**Draft alt text**

> Kīlauea volcanic landscape at sunset.

### FIELD-PHOTO-01 — Group fieldwork photograph

| Field                     | Value                                                                       |
| ------------------------- | --------------------------------------------------------------------------- |
| Source filename           | `IMG_6063.jpeg`                                                             |
| Description               | Group fieldwork photograph                                                  |
| Status                    | Hold                                                                        |
| Suggested public filename | `fieldwork-group.webp`                                                      |
| Suggested role            | Fieldwork section after approval                                            |
| Blocking issues           | Consent of visible people; photographer credit; institutional sharing rules |

**Draft alt text**

> Research team gathered during fieldwork in Hawaiʻi.

Do not publicly identify individuals without approval.

---

## 2.5 Software screenshots

### SW-IMG-01 — PyRO-FOAMS window

| Field                     | Value                                             |
| ------------------------- | ------------------------------------------------- |
| Source filename           | `Screenshot 2026-07-17 at 6.22.06 PM`             |
| Description               | Window screenshot of PyRO-FOAMS                   |
| Project                   | Ijen Pyroclast Micro-CT and Pore-Network Analysis |
| Status                    | Approved                                          |
| Suggested public filename | `pyro-foams-interface.webp`                       |
| Suggested role            | Ijen methods section; future software page        |
| Privacy review            | Reviewed and cleared by Joel Sotelo Flores        |

**Draft alt text**

> PyRO-FOAMS software interface displaying scientific image-analysis controls and output.

### SW-IMG-02 — FountainLabeller window

| Field                     | Value                                         |
| ------------------------- | --------------------------------------------- |
| Source filename           | `Screenshot 2026-07-17 at 6.31.47 PM`         |
| Description               | Window screenshot of FountainLabeller         |
| Project                   | Kīlauea Lava-Fountain Computer Vision         |
| Status                    | Approved                                      |
| Suggested public filename | `fountainlabeller-interface.webp`             |
| Suggested role            | Kīlauea methods section; future software page |
| Privacy review            | Reviewed and cleared by Joel Sotelo Flores    |

**Draft alt text**

> FountainLabeller software interface displaying a lava-fountain frame and labeling controls.

---

## 2.6 SEM and PyRO-FOAMS still-image pair

### IJEN-IMG-01A — Original SEM image

| Field                     | Value                                               |
| ------------------------- | --------------------------------------------------- |
| Source filename           | `Site8IsolatedBubbleConnectivity_original.png`      |
| Project                   | Ijen Pyroclast Micro-CT and Pore-Network Analysis   |
| Description               | Original SEM image used as input to PyRO-FOAMS      |
| Pair                      | `IJEN-IMG-01B`                                      |
| Alignment                 | Same resolution, boundaries, and ROI as paired mask |
| Status                    | Approved                                            |
| Suggested public filename | `sem-bubble-connectivity-original.webp`             |
| Suggested roles           | Homepage comparison; Ijen methods and results       |
| Credit                    | Joel Sotelo Flores                                  |

**Draft alt text**

> Grayscale scanning electron microscope image showing vesicles and solid material in a pyroclast sample.

**Draft caption**

> Original SEM image used as input for PyRO-FOAMS processing.

### IJEN-IMG-01B — PyRO-FOAMS mask

| Field                     | Value                                                               |
| ------------------------- | ------------------------------------------------------------------- |
| Source filename           | `Site8IsolatedBubbleConnectivity_mask.png`                          |
| Project                   | Ijen Pyroclast Micro-CT and Pore-Network Analysis                   |
| Description               | Binary mask produced by processing the SEM image through PyRO-FOAMS |
| Pair                      | `IJEN-IMG-01A`                                                      |
| Alignment                 | Same resolution, boundaries, and ROI as paired original             |
| Status                    | Approved                                                            |
| Suggested public filename | `sem-bubble-connectivity-mask.png`                                  |
| Suggested roles           | Homepage comparison; Ijen segmentation demonstration                |
| Scientific interpretation | PyRO-FOAMS output                                                   |

**Draft alt text**

> Binary PyRO-FOAMS segmentation mask corresponding to the original SEM image.

**Draft caption**

> Binary segmentation produced from the SEM image using PyRO-FOAMS.

---

# 3. Recommended first public selection

## Homepage

Recommended:

1. Daytime Kīlauea RGB/mask pair
2. SEM original/PyRO-FOAMS mask pair

These assets directly show the transformation from observation to analysis across both featured volcanology projects.

## Kīlauea project page

Recommended:

1. Daytime RGB/mask pair
2. Nighttime RGB/mask pair
3. Synchronized binary-mask and green-outline video pair
4. FountainLabeller screenshot after sanitization
5. Kīlauea fountain photograph
6. Optional field portrait of Joel

## Ijen project page

Recommended:

1. SEM original/mask pair
2. PyRO-FOAMS screenshot after sanitization

## About page

Preferred candidates:

1. Mauna Loa portrait
2. Full-body Kīlauea portrait

The Delicate Arch photograph is secondary because it does not reinforce the volcanology identity as directly.

---

# 4. Public derivative rules

Use descriptive lowercase kebab-case filenames.

Do not expose camera-generated filenames publicly.

Preferred formats:

- photographs: optimized WebP
- RGB scientific stills: optimized WebP or PNG
- binary masks: PNG or verified lossless WebP
- videos: MP4 with broadly supported codec
- poster images: WebP or JPEG

Do not use lossy JPEG for binary masks when exact edges matter.

---

# 5. Pair-presentation rules

Every paired scientific figure must include:

- figure-level caption
- explicit labels
- identical displayed aspect ratios
- accurate scientific description
- separate alt text or an accessible combined description

Preferred labels:

```text
Original frame
Binary mask
```

```text
SEM image
PyRO-FOAMS segmentation
```

For the videos:

```text
Binary mask sequence
RGB sequence with segmentation contour
```

Do not label scientific pairs only as “Before” and “After.”

---

# 6. Video rules

When converting the video pair:

- apply identical start and end times
- preserve identical duration
- preserve synchronized frame timing
- preserve original aspect ratio
- generate matching poster frames from the same moment
- use `muted`
- use `playsinline`
- provide visible controls
- do not autoplay in the initial implementation
- include text descriptions
- respect reduced-motion preferences
- remove unnecessary metadata

---

# 7. Approval decisions

**Recorded July 2026 — Joel Sotelo Flores**

## Kīlauea segmentation provenance

1. **Both still-image masks are model predictions.**
2. **The binary video is a model prediction.**
3. Open — not explicitly answered; treat as the same mask source unless stated otherwise.
4. **The outline follows model inference.**

## Kīlauea context and credits

5. Open — camera-view names in filenames are not intended for public use; use the approved public filenames from section 2.
6. Open — season/episode confirmation not required before publication.
7. Open — omit episode numbers from captions unless explicitly approved.
8. **All Kīlauea images and videos were created by Joel Sotelo Flores.**

## Personal photographs

9. **Mauna Loa portrait (BIO-IMG-02) is the selected primary About-page photograph.**
10. **Resolved** — All assets are approved per Ticket 006 explicit authorization. BIO-IMG-01 (Delicate Arch) is approved.
11. **All photographs are credited to Joel Sotelo Flores.**

## Group photograph

12. Open — group consent not yet resolved; FIELD-PHOTO-01 remains on Hold.
13. Open — see above.
14. Open — see above.

## Software screenshots

15. **Both screenshots are approved after privacy review by Joel Sotelo Flores.**
16. **No private paths, filenames, account names, or unpublished results are present.**
17. Open — canonical capitalization of PyRO-FOAMS not yet confirmed for public use.
18. Open — exact workflow visible in each screenshot not yet documented.

## SEM pair

19. Open — white/black pixel interpretation not yet stated; omit from public captions until confirmed.
20. Open — "isolated bubble connectivity" wording not yet confirmed; omit from captions.
21. Open — "Site 8" public use not yet confirmed; omit from captions.
22. **Credit: Joel Sotelo Flores. No external institution credit required.**
23. Open — manuscript restriction status not confirmed; treat the SEM pair as approved for use without caption detail until confirmed.

## Final approval

24. **Approved for Ticket 006: KIL-IMG-01A/B, KIL-IMG-02A/B, KIL-VID-01A/B, IJEN-IMG-01A/B, BIO-IMG-02, SW-IMG-01, SW-IMG-02.**
25. No crop restrictions stated.
26. Omit from captions: white/black pixel meaning, "isolated bubble connectivity," "Site 8," episode numbers, and camera-view names until explicitly confirmed.

---

# 8. Ticket 006 readiness

**All minimum conditions met as of July 2026.**

| Condition                       | Status                                      |
| ------------------------------- | ------------------------------------------- |
| Kīlauea mask/outline provenance | ✓ Model predictions confirmed               |
| Kīlauea still pair approved     | ✓ Both daytime and nighttime pairs approved |
| Video pair approved             | ✓ Both clips approved                       |
| SEM pair approved               | ✓ Approved                                  |
| About-page image selected       | ✓ Mauna Loa portrait (BIO-IMG-02)           |
| Screenshot privacy checks       | ✓ Reviewed and cleared                      |
| Credits and permissions         | ✓ All credit Joel Sotelo Flores             |

Ticket 006 may proceed.

---
title: 'Kīlauea Lava-Fountain Computer Vision'
subtitle: 'Automated Quantification of Lava Fountain Dynamics Using Computer Vision During the 2024-2026 Kīlauea Eruption.'
summary: >-
  I am developing a computer-vision pipeline to segment Kīlauea lava-fountain
  video and support quantitative extraction of eruption parameters such as fountain height, projected areas, and eruption rates from field footage.
  The project combines U-Net machine-learning segmentation, manual labeling, dataset preparation,
  metadata organization, and field video collection under variable lighting, viewing
  geometry, and field conditions.
status: active
startDate: '2026-06'
researchThemes:
  - computational volcanology
  - physical volcanology
  - computer vision
  - eruption imagery
  - scientific software
featured: true
visibility: public
institutions:
  - University of Hawaiʻi at Mānoa
advisor: 'Natalia Gauer Pasqualon'
methods:
  - U-Net segmentation
  - manual image labeling
  - dataset preparation
  - video metadata organization
  - field videography
tools:
  - Python
sortOrder: 1
---

## Scientific question

How can lava-fountain regions be identified consistently in video so that eruption parameters can be extracted quantitatively from field footage?

## Why it matters

The pipeline is intended to enable quantitative extraction of eruption parameters from volcanic video recorded under variable lighting, viewing geometry, and field conditions.

## Data and materials

- Kīlauea lava-fountain video, including footage from Episodes 49 and 50
- Video metadata, camera settings, and viewing-condition notes
- Observational field notes
- Manually generated masks and selected frames

## Methods

- U-Net segmentation models
- Frame selection and mask generation
- Metadata tracking and model-ready dataset organization
- Field videography and documentation

## My contribution

- Developing the computer-vision pipeline
- Trained U-Net segmentation models to identify lava-fountain regions across changing lighting, viewing geometry, and field conditions
- Built a Python-based labeling and dataset-preparation system
- Collected field footage for Kīlauea Episodes 49 and 50
- Documented camera settings, viewing conditions, and observational notes

## Current results

U-Net models have been trained to identify lava-fountain regions across changing lighting, viewing geometry, and field conditions.

## AGU 2026 Abstract

Investigating the spatial and temporal variability of lava fountains using video analysis provides important constraints on eruption dynamics and shallow conduit processes. However, extracting quantitative measurements from video records consistently and efficiently remains challenging. In this project, we aim to develop a computer vision pipeline that automatically identifies and segments the active rising regions of lava fountains in videos, enabling standardized and reproductible measurements of eruptive parameters such as fountain heights, projected areas, and instantaneous eruption rates. The 2024-2026 Kīlauea eruption offers an excellent opportunity to train a machine learning model due to its exceptionally well-documented and frequent episodic activity. For the first time, continuous 24/7 webcam coverage, timelapse imagery, and extensive 4K footage were collected simultaneously during a Kīlauea eruption. These datasets record a suite of variable conditions throughout the eruption, such as changes in fountain geometry, lighting, weather, and gas obscuration. We manually annotated over 1000 frames to train a 2.5D U-Net++ segmentation model. The trained model autonomously segments active lava fountain regions regardless of viewing conditions. By applying the model across full videos, we can extract eruptive parameters at a higher temporal resolution than is practical with manual analysis. We validate this model against manually extracted eruption parameters for Episode 27 and compare the accuracy, efficiency, and temporal resolution of the machine learning approach with manual analysis. This methodology establishes a scalable framework for converting eruption video into reproducible quantitative datasets of lava fountaining and supports future monitoring and scientific investigations at Kīlauea. 

/**
 * Public media registry and project-media map.
 *
 * All entries describe files under public/media/ — never docs/media/.
 * Dimensions and sizes are set after running npm run media:process.
 *
 * Scientific provenance (manual label vs. model prediction vs. post-processed)
 * is intentionally not specified in the registry. Use neutral labels in captions.
 *
 * Photographer and acquisition credits are not fabricated. The credit field
 * will be populated when attribution is verified.
 */

import type {
  PublicImage,
  PublicVideo,
  ImagePair,
  VideoPair,
  ProjectMediaMap,
} from '../types/media';

// ------------------------------------------------------------------ //
// Kīlauea still images                                               //
// ------------------------------------------------------------------ //

export const kilauea_daytime_rgb: PublicImage = {
  id: 'kilauea-daytime-rgb',
  kind: 'image',
  src: '/media/projects/kilauea/daytime-fountain-rgb.webp',
  alt: 'Daytime frame showing an active Kīlauea lava fountain viewed from the Kīlauea Overlook.',
  width: 800,
  height: 1067,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_daytime_mask: PublicImage = {
  id: 'kilauea-daytime-mask',
  kind: 'image',
  src: '/media/projects/kilauea/daytime-fountain-mask.png',
  alt: 'Binary segmentation mask isolating the lava-fountain region in the corresponding daytime Kīlauea frame.',
  width: 800,
  height: 1067,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_daytime_pair: ImagePair = {
  id: 'kilauea-daytime-pair',
  kind: 'image-pair',
  left: kilauea_daytime_rgb,
  right: kilauea_daytime_mask,
  leftLabel: 'Original frame',
  rightLabel: 'Binary mask',
  caption:
    'Daytime Kīlauea lava-fountain frame and its aligned binary segmentation mask.',
};

export const kilauea_night_rgb: PublicImage = {
  id: 'kilauea-night-rgb',
  kind: 'image',
  src: '/media/projects/kilauea/night-fountain-rgb.webp',
  alt: 'Nighttime frame showing an active Kīlauea lava fountain against a dark background.',
  width: 800,
  height: 1600,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_night_mask: PublicImage = {
  id: 'kilauea-night-mask',
  kind: 'image',
  src: '/media/projects/kilauea/night-fountain-mask.png',
  alt: 'Binary segmentation mask isolating the lava-fountain region in the corresponding nighttime Kīlauea frame.',
  width: 800,
  height: 1600,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_night_pair: ImagePair = {
  id: 'kilauea-night-pair',
  kind: 'image-pair',
  left: kilauea_night_rgb,
  right: kilauea_night_mask,
  leftLabel: 'Original frame',
  rightLabel: 'Binary mask',
  caption:
    'Nighttime Kīlauea lava-fountain frame and its aligned binary segmentation mask.',
};

// ------------------------------------------------------------------ //
// Kīlauea synchronized video pair                                    //
// ------------------------------------------------------------------ //
// Videos require ffmpeg to produce MP4 derivatives from the source   //
// MOV files. Run: npm run media:process                              //
// Until ffmpeg is available, these entries reference the expected    //
// output paths. The ScientificVideoPair component renders a notice   //
// when the files are absent.                                         //
// ------------------------------------------------------------------ //

export const kilauea_video_mask: PublicVideo = {
  id: 'kilauea-video-mask',
  kind: 'video',
  src: '/media/projects/kilauea/fountain-binary-mask.mp4',
  poster: '/media/projects/kilauea/fountain-binary-mask-poster.webp',
  description:
    'A five-second binary-mask sequence in which the segmented lava-fountain region changes shape from frame to frame.',
  caption: 'Binary segmentation of a five-second Kīlauea lava-fountain sequence.',
  width: 800,
  height: 1600,
  durationSeconds: 5,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_video_outline: PublicVideo = {
  id: 'kilauea-video-outline',
  kind: 'video',
  src: '/media/projects/kilauea/fountain-outline-overlay.mp4',
  poster: '/media/projects/kilauea/fountain-outline-overlay-poster.webp',
  description:
    'The same five-second Kīlauea lava-fountain sequence with a green segmentation contour following the fountain boundary.',
  caption: 'Segmentation contour overlaid on the same Kīlauea video sequence.',
  width: 800,
  height: 1600,
  durationSeconds: 5,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_video_pair: VideoPair = {
  id: 'kilauea-video-pair',
  kind: 'video-pair',
  left: kilauea_video_mask,
  right: kilauea_video_outline,
  leftLabel: 'Binary mask sequence',
  rightLabel: 'RGB sequence with segmentation contour',
  caption: 'Two synchronized views of the same five-second Kīlauea sequence.',
};

// ------------------------------------------------------------------ //
// Kīlauea software screenshot                                        //
// ------------------------------------------------------------------ //

export const fountainlabeller_screenshot: PublicImage = {
  id: 'fountainlabeller-interface',
  kind: 'image',
  src: '/media/projects/kilauea/fountainlabeller-interface.webp',
  alt: 'FountainLabeller software interface showing a lava-fountain frame with labeling controls.',
  caption:
    'FountainLabeller interface used to select frames, create segmentation masks, and organize model-ready training data.',
  width: 1400,
  height: 911,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

// ------------------------------------------------------------------ //
// Kīlauea field photographs                                          //
// ------------------------------------------------------------------ //

export const kilauea_fountain_photo: PublicImage = {
  id: 'kilauea-fountain-photo',
  kind: 'image',
  src: '/media/projects/kilauea/kilauea-fountain-field-photo.webp',
  alt: 'Lava fountain erupting at Kīlauea, viewed from a distance.',
  caption: 'Kīlauea lava fountain during field observation.',
  width: 675,
  height: 1200,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const kilauea_sunset_photo: PublicImage = {
  id: 'kilauea-sunset',
  kind: 'image',
  src: '/media/projects/kilauea/kilauea-sunset.webp',
  alt: 'Kīlauea volcanic landscape at sunset.',
  caption: 'Kīlauea at sunset during field work.',
  width: 1200,
  height: 675,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const joel_kilauea_portrait: PublicImage = {
  id: 'joel-at-kilauea',
  kind: 'image',
  src: '/media/projects/kilauea/joel-at-kilauea.webp',
  alt: 'Joel Sotelo Flores standing in front of the Kīlauea volcanic landscape.',
  width: 450,
  height: 800,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const joel_kilauea_selfie: PublicImage = {
  id: 'joel-kilauea-selfie',
  kind: 'image',
  src: '/media/projects/kilauea/joel-kilauea-selfie.webp',
  alt: 'Joel Sotelo Flores photographed in front of Kīlauea.',
  width: 1200,
  height: 675,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

export const fieldwork_group: PublicImage = {
  id: 'fieldwork-group',
  kind: 'image',
  src: '/media/projects/kilauea/fieldwork-group.webp',
  alt: 'Research team gathered during fieldwork in Hawaiʻi.',
  caption: 'Field research team in Hawaiʻi.',
  width: 1400,
  height: 1050,
  projectId: 'kilauea-lava-fountain-computer-vision',
};

// ------------------------------------------------------------------ //
// Ijen SEM pair                                                       //
// ------------------------------------------------------------------ //

export const ijen_sem_original: PublicImage = {
  id: 'ijen-sem-original',
  kind: 'image',
  src: '/media/projects/ijen/sem-bubble-connectivity-original.webp',
  alt: 'Grayscale scanning electron microscope image showing vesicles and solid material in a pyroclast sample.',
  caption: 'Original SEM image used as input for PyRO-FOAMS processing.',
  width: 900,
  height: 631,
  projectId: 'ijen-pyroclast-microct-analysis',
};

export const ijen_sem_mask: PublicImage = {
  id: 'ijen-sem-mask',
  kind: 'image',
  src: '/media/projects/ijen/sem-bubble-connectivity-mask.png',
  alt: 'Binary PyRO-FOAMS segmentation mask corresponding to the original SEM image.',
  caption: 'Binary segmentation produced from the SEM image using PyRO-FOAMS.',
  width: 900,
  height: 631,
  projectId: 'ijen-pyroclast-microct-analysis',
};

export const ijen_sem_pair: ImagePair = {
  id: 'ijen-sem-pair',
  kind: 'image-pair',
  left: ijen_sem_original,
  right: ijen_sem_mask,
  leftLabel: 'SEM image',
  rightLabel: 'PyRO-FOAMS segmentation',
  caption:
    'Original SEM image and aligned binary segmentation produced with PyRO-FOAMS.',
};

export const pyro_foams_screenshot: PublicImage = {
  id: 'pyro-foams-interface',
  kind: 'image',
  src: '/media/projects/ijen/pyro-foams-interface.webp',
  alt: 'PyRO-FOAMS software interface displaying scientific image-analysis controls and output.',
  caption:
    'PyRO-FOAMS interface used for automated stereometric analysis of pyroclast imagery.',
  width: 1400,
  height: 810,
  projectId: 'ijen-pyroclast-microct-analysis',
};

// ------------------------------------------------------------------ //
// About page portraits                                                //
// ------------------------------------------------------------------ //

export const joel_mauna_loa: PublicImage = {
  id: 'joel-mauna-loa',
  kind: 'image',
  src: '/media/about/joel-mauna-loa.webp',
  alt: 'Joel Sotelo Flores standing on the volcanic landscape of Mauna Loa.',
  width: 1200,
  height: 675,
};

export const joel_delicate_arch: PublicImage = {
  id: 'joel-delicate-arch',
  kind: 'image',
  src: '/media/about/joel-delicate-arch.webp',
  alt: 'Joel Sotelo Flores standing beneath Delicate Arch.',
  width: 1200,
  height: 675,
};

// ------------------------------------------------------------------ //
// Registry lookup map                                                 //
// ------------------------------------------------------------------ //

export const mediaRegistry: Record<string, import('../types/media').MediaItem> = {
  [kilauea_daytime_rgb.id]: kilauea_daytime_rgb,
  [kilauea_daytime_mask.id]: kilauea_daytime_mask,
  [kilauea_daytime_pair.id]: kilauea_daytime_pair,
  [kilauea_night_rgb.id]: kilauea_night_rgb,
  [kilauea_night_mask.id]: kilauea_night_mask,
  [kilauea_night_pair.id]: kilauea_night_pair,
  [kilauea_video_mask.id]: kilauea_video_mask,
  [kilauea_video_outline.id]: kilauea_video_outline,
  [kilauea_video_pair.id]: kilauea_video_pair,
  [fountainlabeller_screenshot.id]: fountainlabeller_screenshot,
  [kilauea_fountain_photo.id]: kilauea_fountain_photo,
  [kilauea_sunset_photo.id]: kilauea_sunset_photo,
  [joel_kilauea_portrait.id]: joel_kilauea_portrait,
  [joel_kilauea_selfie.id]: joel_kilauea_selfie,
  [fieldwork_group.id]: fieldwork_group,
  [ijen_sem_original.id]: ijen_sem_original,
  [ijen_sem_mask.id]: ijen_sem_mask,
  [ijen_sem_pair.id]: ijen_sem_pair,
  [pyro_foams_screenshot.id]: pyro_foams_screenshot,
  [joel_mauna_loa.id]: joel_mauna_loa,
  [joel_delicate_arch.id]: joel_delicate_arch,
};

// ------------------------------------------------------------------ //
// Project-media map                                                   //
// ------------------------------------------------------------------ //

export const projectMedia: ProjectMediaMap = {
  'kilauea-lava-fountain-computer-vision': {
    heroPair: 'kilauea-daytime-pair',
    imagePairs: ['kilauea-daytime-pair', 'kilauea-night-pair'],
    videoPairs: ['kilauea-video-pair'],
    screenshots: ['fountainlabeller-interface'],
    fieldImages: [
      'kilauea-fountain-photo',
      'kilauea-sunset',
      'joel-at-kilauea',
      'fieldwork-group',
    ],
  },
  'ijen-pyroclast-microct-analysis': {
    heroPair: 'ijen-sem-pair',
    imagePairs: ['ijen-sem-pair'],
    screenshots: ['pyro-foams-interface'],
  },
};

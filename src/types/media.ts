/**
 * Public media types for the portfolio.
 *
 * These types describe only generated public derivatives in public/media/.
 * Source files in docs/media/ are not represented here.
 *
 * No page-layout class names, animation stages, or component paths belong here.
 */

export interface PublicImage {
  id: string;
  kind: 'image';
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  /** Collection ID this media belongs to, when applicable. */
  projectId?: string;
}

export interface PublicVideo {
  id: string;
  kind: 'video';
  src: string;
  poster: string;
  /** Accessible written description of the video content. */
  description: string;
  caption?: string;
  credit?: string;
  width: number;
  height: number;
  durationSeconds: number;
  projectId?: string;
}

export interface ImagePair {
  id: string;
  kind: 'image-pair';
  left: PublicImage;
  right: PublicImage;
  leftLabel: string;
  rightLabel: string;
  caption: string;
}

export interface VideoPair {
  id: string;
  kind: 'video-pair';
  left: PublicVideo;
  right: PublicVideo;
  leftLabel: string;
  rightLabel: string;
  caption: string;
}

/**
 * Derived graphic — a visual identity element generated from real research media.
 * These are simplified contours or geometric elements extracted from actual data.
 */
export interface DerivedGraphic {
  id: string;
  kind: 'derived-graphic';
  src: string;
  /** Source media ID this graphic was derived from */
  sourceMediaId: string;
  /** Whether this graphic conveys unique scientific information or is decorative */
  purpose: 'decorative' | 'informative';
  projectId: string;
}

export type MediaItem =
  PublicImage | PublicVideo | ImagePair | VideoPair | DerivedGraphic;

/**
 * Media placements allow controlled inline placement of registered media
 * within the project narrative, based on section headings.
 */
export interface MediaPlacements {
  /** Maps section heading text to array of media IDs to render after that section */
  afterSection?: Record<string, string[]>;
}

/** Maps a project ID to its associated media. */
export interface ProjectMediaMap {
  [projectId: string]: {
    heroPair?: string;
    imagePairs?: string[];
    videoPairs?: string[];
    screenshots?: string[];
    fieldImages?: string[];
    /** Controlled inline media placement configuration */
    mediaPlacements?: MediaPlacements;
  };
}

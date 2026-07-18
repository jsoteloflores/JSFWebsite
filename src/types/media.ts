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

export type MediaItem = PublicImage | PublicVideo | ImagePair | VideoPair;

/** Maps a project ID to its associated media. */
export interface ProjectMediaMap {
  [projectId: string]: {
    heroPair?: string;
    imagePairs?: string[];
    videoPairs?: string[];
    screenshots?: string[];
    fieldImages?: string[];
  };
}

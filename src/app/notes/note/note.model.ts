export interface Note {
  id?: string;
  title?: string;
  content?: string;
  type?: 'normal' | 'list' | 'drawing' | 'image';
  labels?: string[];
  selected?: boolean;
  pinned?: boolean;
  archived?: boolean;
  background?: string;
  date?: Date;
}

type bgColorsType = { [key: string]: string };
export const bgColors = {
  Default: '',
  Red: '#f28b82',
  Orange: '#fbbc04',
  Yellow: '#fff475',
  Green: '#ccff90',
  Teal: '#a7ffeb',
  Blue: '#cbf0f8',
  Darkblue: '#aecbfa',
  Purple: '#aecbfa',
  Pink: '#fdcfe8',
  Brown: '#e6c9a8',
  Gray: '#e8eaed',
} as bgColorsType;

type bgImagesType = { [key: string]: string };
export const bgImages = {
  Default: '',
  Groceries: '/assets/images/backgrounds/image-1.svg',
  Food: '/assets/images/backgrounds/image-2.svg',
  Music: '/assets/images/backgrounds/image-3.svg',
  Recipes: '/assets/images/backgrounds/image-4.svg',
  Notes: '/assets/images/backgrounds/image-5.svg',
  Places: '/assets/images/backgrounds/image-6.svg',
  Travel: '/assets/images/backgrounds/image-7.svg',
  Video: '/assets/images/backgrounds/image-8.svg',
  Celebration: '/assets/images/backgrounds/image-9.svg',
} as bgImagesType;

export interface Note {
  id?: string;
  title?: string;
  content?: string;
  type?: 'normal' | 'list' | 'drawing' | 'image';
  labels?: string[];
  selected?: boolean;
  pinned?: boolean;
  archived?: boolean;
  backgroundColor?: string;
  date?: Date;
}

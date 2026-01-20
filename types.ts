
export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  author: string;
  description: string;
  category: string;
}

export enum Page {
  LANDING = 'LANDING',
  RESULTS = 'RESULTS'
}

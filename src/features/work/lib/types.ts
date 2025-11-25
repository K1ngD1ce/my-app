export interface WorkDataType {
  title: string;
  works: Works[];
}

interface Works {
  id: number;
  name: string;
  description: string;
  img: string;
}

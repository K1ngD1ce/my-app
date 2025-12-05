export interface WorkDataType {
  title: string;
  works: Works[];
}

interface Works {
  id: number;
  href: string;
  name: string;
  description: string;
  img: string;
  background_card: string
}

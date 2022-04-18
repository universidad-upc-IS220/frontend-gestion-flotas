export interface ItemProps {
  id: number;
  text: string;
  active: boolean;
  url: string;
  icon: ({ fill }: { fill: string }) => any;
}

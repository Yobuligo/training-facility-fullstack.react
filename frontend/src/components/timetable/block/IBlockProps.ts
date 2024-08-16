export interface IBlockProps {
  title: string;
  description?: string;
  color: string;
  startTime: string;
  endTime: string;
  gridColumnStart: number;
  gridRowStart: number;
  gridRowEnd: number;
  showLength?: boolean;
}

export type ComponentProps = {
  type: 'error' | 'success' | 'info' | 'warning';
  closeHandler: () => void;
  title: string;
  message: string;
};

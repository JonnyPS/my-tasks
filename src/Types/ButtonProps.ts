export interface ButtonProps {
  className?: string;
  label: string;
  name?: string;
  onClick: (ev?: React.MouseEvent<HTMLButtonElement>) => void;
}

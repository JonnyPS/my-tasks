import type { ButtonProps } from "../Types/ButtonProps";

export function Button({ className, label, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

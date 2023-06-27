import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  handleChange?: (newText: string) => void;
}

export default function Input({ className, handleChange, ...rest }: Props) {
  return (
    <input
      className={`w-3/4 self-center rounded-md p-4 ${className ?? ""}`}
      onChange={(event) => handleChange && handleChange(event.target.value)}
      {...rest}
    />
  );
}

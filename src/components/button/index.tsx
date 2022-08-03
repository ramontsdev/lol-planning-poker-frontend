import { ReactNode } from 'react';
import { StyledButton } from './styles';

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  isLoading?: boolean
  children: ReactNode
  onClick?(): void
}

export default function Button({
  type, disabled, isLoading,
  children, onClick,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {!isLoading && children}
    </StyledButton>
  );
}


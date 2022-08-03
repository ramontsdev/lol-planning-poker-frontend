/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import { Container } from './styles';

type FormGroupProps = {
  children: ReactNode
  error?: string
  isLoading?: boolean
}

export default function FormGroup({ children, error, isLoading }: FormGroupProps) {
  return (
    <Container>
      <div className="form-item">
        {children}
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}

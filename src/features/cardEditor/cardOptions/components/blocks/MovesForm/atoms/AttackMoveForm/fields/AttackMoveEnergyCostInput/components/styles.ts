import { styled } from '@css';

export const FieldWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.custom.inputBorderColor};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(1.5, 3)};
  gap: ${({ theme }) => theme.spacing(1.5)};

  ${({ theme }) => theme.breakpoints.down(410)} {
    padding: 0;
    border: 0;
  }
`;

export const TypesContainer = styled('div')<{ $gap: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme, $gap }) => theme.spacing($gap)};
`;

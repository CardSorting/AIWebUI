import { styled } from '@css';
import { Box } from '@mui/system';

export const ImgWrapper = styled(Box)`
  padding: ${({ theme }) => theme.spacing(0.25)};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

export const ListItem = styled('li')`
  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }
`;

import { styled } from '@css';

export const Wrapper = styled('div')<{ $isBehindTemplate: boolean }>`
  position: absolute;
  pointer-events: none;
  z-index: ${({ $isBehindTemplate }) => ($isBehindTemplate ? '-2' : '2')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 40px;
`;

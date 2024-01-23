import { NameSymbol } from '@cardEditor/cardStyles/types';

export const getNameSymbolSize = (
  nameSymbol?: NameSymbol,
):
  | {
      width: string;
      height: string;
      top?: string;
    }
  | undefined => {
  switch (nameSymbol) {
    case 'v':
      return {
        height: '3.25em',
        width: '4.5em',
      };
    case 'vmax':
      return {
        height: '3.25em',
        width: '6.6em',
      };
    case 'vstar':
      return {
        height: '4em',
        width: '7em',
      };
    case 'star':
      return {
        height: '3em',
        width: '5.5em',
      };
    case 'ex':
      return {
        height: '3em',
        width: '4.2em',
      };
    case 'gx':
    case 'gxUltraBeast':
      return {
        height: '3em',
        width: '6.8em',
        top: '4%',
      };
    case 'prismStar':
      return {
        height: '3em',
        width: '2.3em',
      };
    case 'lvX':
      return {
        height: '3em',
        width: '4.5em',
      };
    default:
      return undefined;
  }
};

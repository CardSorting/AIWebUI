import {
  AbilitySymbol,
  MoveBackground,
  NameSymbol,
} from '@cardEditor/cardStyles';

const assets = '/assets';
const icons = `${assets}/icons`;
const symbols = `${assets}/symbols`;

const Routes = {
  Home: '/',
  Creator: '/creator',
  PrivacyPolicy: '/privacy-policy',
  CookiePolicy: '/cookie-policy',
  Contact: '/contact',
  EMail: 'leonvdnoll@gmail.com',
  GitHub: {
    Home: 'https://github.com/lvandernoll/pokecardmaker.net',
    ProjectBoard: 'https://github.com/users/lvandernoll/projects/3/',
    Issues: {
      New: 'https://github.com/lvandernoll/pokecardmaker.net/issues/new/choose',
    },
    Discussions: {
      Home: 'https://github.com/lvandernoll/pokecardmaker.net/discussions',
      Ideas:
        'https://github.com/lvandernoll/pokecardmaker.net/discussions/categories/ideas',
      Questions:
        'https://github.com/lvandernoll/pokecardmaker.net/discussions/categories/q-a',
    },
  },
  Assets: {
    Cards: `${assets}/cards`,
    Icons: {
      Set: (slug: string) => `${icons}/sets/${slug}.png`,
      Badge: (slug: string) => `${icons}/badges/${slug}.png`,
      Rotation: (slug: string) => `${icons}/rotations/${slug}.png`,
      Rarity: (slug: string) => `${icons}/rarities/${slug}.png`,
      RarityWhite: (slug: string) => `${icons}/rarities/white/${slug}.png`,
      Type: (baseSetSlug: string, slug: string, withBorder?: boolean) =>
        `${icons}/types/${baseSetSlug}/${
          withBorder ? 'border/' : ''
        }${slug}.png`,
    },
    Symbols: {
      Name: (slug: NameSymbol) => `${symbols}/name/${slug}.png`,
      Ability: (slug: AbilitySymbol) => `${symbols}/ability/${slug}.png`,
      MoveBackground: (slug: MoveBackground) =>
        `${symbols}/moveBackground/${slug}.png`,
    },
  },
};

export default Routes;

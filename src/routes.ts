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
  AIImageGenerator: '/ai-image-generator',
  ImageUploadAndOrder: '/image-upload-and-order',
  PrivacyPolicy: '/privacy-policy',
  CookiePolicy: '/cookie-policy',
  Contact: '/contact',
  SignIn: '/auth/signin',    // Added SignIn route
  SignUp: '/auth/signup',    // Added SignUp route
  EMail: '',
  GitHub: {
    Home: '',
    ProjectBoard: '',
    Issues: {
      New: '',
    },
    Discussions: {
      Home: '',
      Ideas: '',
      Questions: '',
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
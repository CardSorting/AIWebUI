import { SxProps } from '@mui/system';

export type AbilitySymbol =
  | 'sunAndMoon'
  | 'sunAndMoonGold'
  | 'swordAndShield'
  | 'scarletAndViolet'
  | 'v'
  | 'vstar';
export type NameSymbol =
  | 'vmax'
  | 'v'
  | 'star'
  | 'vstar'
  | 'ex'
  | 'gx'
  | 'gxUltraBeast'
  | 'prismStar'
  | 'lvX';
export type TextColor = 'white' | 'black' | 'gx' | 'ultraBeast';
export type Size = 'sm' | 'lg';
export type SpecialMoveType = 'gx';
export type MoveBackground = 'gx' | 'gxUltraBeast' | 'gxGold';

export type Placement = SxProps;

export interface Positions {
  name?: Placement;
  hitpoints?: Placement;
  description?: Placement;
  typeImgContainer?: Placement;
  typeImg?: Placement;
  prevolveName?: Placement;
  prevolveImg?: Placement;
  dexStats?: Placement;
  movesWrapper?: Placement;
  movesAndDescription?: Placement;
  ability?: Placement;
  abilityTitleBar?: Placement;
  abilitySymbol?: Placement;
  abilityName?: Placement;
  abilityDescription?: Placement;
  move2?: Placement;
  typeBar?: Placement;
  weakness?: Placement;
  resistance?: Placement;
  cardInfoContainer?: Placement;
  cardInfoBar?: Placement;
  illustrator?: Placement;
  setIcon?: Placement;
  rotationIcon?: Placement;
  cardNumber?: Placement;
  rarityIcon?: Placement;
  dexEntry?: Placement;
  lastMove?: Placement;
}

export interface SpecialMoveCardLogic
  extends Pick<CardStyles, 'hasAttackCostBorder'> {
  /**
   * @default 'gx'
   */
  type: SpecialMoveType;
  /**
   * @default none
   */
  background?: MoveBackground;
  /**
   * @default 'Third move'
   */
  displayName: string;
  /**
   * @default none
   */
  nameOutline?: TextColor;
  /**
   * @default black
   */
  nameTextColor: TextColor;
  /**
   * @default none
   */
  descriptionOutline?: TextColor;
  /**
   * @default black
   */
  descriptionTextColor: TextColor;
  /**
   * The extra text that will be appended to the special move's name
   * @default none
   */
  nameAddition?: string;
  /**
   * The extra text that will be appended to the special move's description
   * @default none
   */
  descriptionAddition?: string;
}

export interface CardStyles {
  /**
   * @default none
   */
  nameOutline?: TextColor;
  /**
   * @default none
   */
  hpOutline?: TextColor;
  /**
   * @default none
   */
  movesOutline?: TextColor;
  /**
   * Whether the card's attack cost type images have white borders
   * @default true
   */
  hasAttackCostBorder: boolean;
  /**
   * Illustrator, set icon, rotation icon, card number, rarity icon
   * @default none
   */
  cardInfoOutline?: TextColor;
  /**
   * The bar that shows weakness & resistance
   * @default none
   */
  typeBarOutline?: TextColor;
  /**
   * The bar in the middle of the card that describes height and weight
   * @default none
   */
  dexStatsOutline?: TextColor;
  /**
   * @default black
   */
  nameTextColor: TextColor;
  /**
   * @default black
   */
  hpTextColor: TextColor;
  /**
   * @default black
   */
  movesTextColor: TextColor;
  /**
   * The bar that shows weakness & resistance
   * @default black
   */
  typeBarTextColor: TextColor;
  /**
   * Illustrator, set icon, rotation icon, card number, rarity icon
   * @default black
   */
  cardInfoTextColor: TextColor;
  /**
   * The bar in the middle of the card that describes height and weight
   * @default black
   */
  dexStatsTextColor: TextColor;
  /**
   * @default black
   */
  rarityIconColor: TextColor;
  /**
   * @default none
   */
  nameSymbol?: NameSymbol;
  /**
   * @default false
   */
  alignMovesBottom: boolean;
  /**
   * @default 'sm'
   */
  hpSize: Size;
  /**
   * @default none
   */
  abilitySymbol?: AbilitySymbol;
  /**
   * Whether the energy card's type img should have a white border
   * @default true
   */
  hasTypeImgBorder: boolean;
  /**
   * @default false
   */
  hasSubnameBeforeName?: boolean;
  /**
   * @default 'Evolves from'
   */
  prevolveText: string;
  /**
   * How much the move name should move for each overflowing energy cost amount
   * @default 7.35
   */
  moveNameLeftPercentage: number;
  /**
   * Used to change position of items displayed on the card \
   * For example, `Name` is displayed differently on a Pokémon and a Trainer
   */
  positions: Partial<Positions>;
  /**
   * Styling for the special move
   */
  specialMove?: Partial<SpecialMoveCardLogic>;
}

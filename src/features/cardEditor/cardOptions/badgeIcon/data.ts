import {
  sunAndMoon as smBaseSet,
  scarletAndViolet as svBaseSet,
  swordAndShield as swshBaseSet,
} from '../baseSet';
import { BadgeIcon, BadgeIconType } from './types';

// Badge Icon Types //
let iconTypeId = 1;

export const trainerIcon: BadgeIconType = {
  id: iconTypeId++,
  slug: 'trainerIcon',
  displayName: 'Trainer',
  width: 36,
};

export const setLogo: BadgeIconType = {
  id: iconTypeId++,
  slug: 'setLogo',
  displayName: 'Set Logo',
  width: 60,
};

// Badge Icons //
let id = 1;

export const lillie: BadgeIcon = {
  id: id++,
  slug: 'lillie',
  displayName: 'Lillie',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const hau: BadgeIcon = {
  id: id++,
  slug: 'hau',
  displayName: 'Hau',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const gladion: BadgeIcon = {
  id: id++,
  slug: 'gladion',
  displayName: 'Gladion',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const professorKukui: BadgeIcon = {
  id: id++,
  slug: 'professorKukui',
  displayName: 'Professor Kukui',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const ilima: BadgeIcon = {
  id: id++,
  slug: 'ilima',
  displayName: 'Ilima',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const nanu: BadgeIcon = {
  id: id++,
  slug: 'nanu',
  displayName: 'Nanu',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const acerola: BadgeIcon = {
  id: id++,
  slug: 'acerola',
  displayName: 'Acerola',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const hala: BadgeIcon = {
  id: id++,
  slug: 'hala',
  displayName: 'Hala',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const kiawe: BadgeIcon = {
  id: id++,
  slug: 'kiawe',
  displayName: 'Kiawe',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const lana: BadgeIcon = {
  id: id++,
  slug: 'lana',
  displayName: 'Lana',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const mallow: BadgeIcon = {
  id: id++,
  slug: 'mallow',
  displayName: 'Mallow',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const mina: BadgeIcon = {
  id: id++,
  slug: 'mina',
  displayName: 'Mina',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const olivia: BadgeIcon = {
  id: id++,
  slug: 'olivia',
  displayName: 'Olivia',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const sophocles: BadgeIcon = {
  id: id++,
  slug: 'sophocles',
  displayName: 'Sophocles',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const hapu: BadgeIcon = {
  id: id++,
  slug: 'hapu',
  displayName: 'Hapu',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const plumeria: BadgeIcon = {
  id: id++,
  slug: 'plumeria',
  displayName: 'Plumeria',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const guzma: BadgeIcon = {
  id: id++,
  slug: 'guzma',
  displayName: 'Guzma',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const lusamine: BadgeIcon = {
  id: id++,
  slug: 'lusamine',
  displayName: 'Lusamine',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const teamSkullGruntFemale: BadgeIcon = {
  id: id++,
  slug: 'teamSkullGruntFemale',
  displayName: 'Team Skull Grunt ♀',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const teamSkullGruntMale: BadgeIcon = {
  id: id++,
  slug: 'teamSkullGruntMale',
  displayName: 'Team Skull Grunt ♂',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const aetherFoundationEmployeeFemale: BadgeIcon = {
  id: id++,
  slug: 'aetherFoundationEmployeeFemale',
  displayName: 'Aether Foundation Employee ♀',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const aetherFoundationEmployeeMale: BadgeIcon = {
  id: id++,
  slug: 'aetherFoundationEmployeeMale',
  displayName: 'Aether Foundation Employee ♂',
  type: trainerIcon.id,
  baseSet: smBaseSet.id,
};

export const marnie: BadgeIcon = {
  id: id++,
  slug: 'marnie',
  displayName: 'Marnie',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const milo: BadgeIcon = {
  id: id++,
  slug: 'milo',
  displayName: 'Milo',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const nessa: BadgeIcon = {
  id: id++,
  slug: 'nessa',
  displayName: 'Nessa',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const kabu: BadgeIcon = {
  id: id++,
  slug: 'kabu',
  displayName: 'Kabu',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const bea: BadgeIcon = {
  id: id++,
  slug: 'bea',
  displayName: 'Bea',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const allister: BadgeIcon = {
  id: id++,
  slug: 'allister',
  displayName: 'Allister',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const opal: BadgeIcon = {
  id: id++,
  slug: 'opal',
  displayName: 'Opal',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const gordie: BadgeIcon = {
  id: id++,
  slug: 'gordie',
  displayName: 'Gordie',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const melony: BadgeIcon = {
  id: id++,
  slug: 'melony',
  displayName: 'Melony',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const piers: BadgeIcon = {
  id: id++,
  slug: 'piers',
  displayName: 'Piers',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const bede: BadgeIcon = {
  id: id++,
  slug: 'bede',
  displayName: 'Bede',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const leon: BadgeIcon = {
  id: id++,
  slug: 'leon',
  displayName: 'Leon',
  baseSet: swshBaseSet.id,
  type: trainerIcon.id,
};

export const teamYellGrunt: BadgeIcon = {
  id: id++,
  slug: 'teamYellGrunt',
  displayName: 'Team Yell Grunt',
  type: trainerIcon.id,
  baseSet: swshBaseSet.id,
};

export const swordAndShield: BadgeIcon = {
  id: id++,
  slug: 'swordAndShield',
  displayName: 'Sword & Shield',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const rebelClash: BadgeIcon = {
  id: id++,
  slug: 'rebelClash',
  displayName: 'Rebel Clash',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const darknessAblaze: BadgeIcon = {
  id: id++,
  slug: 'darknessAblaze',
  displayName: 'Darkness Ablaze',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const championsPath: BadgeIcon = {
  id: id++,
  slug: 'championsPath',
  displayName: "Champion's Path",
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const vividVoltage: BadgeIcon = {
  id: id++,
  slug: 'vividVoltage',
  displayName: 'Vivid Voltage',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const shiningFates: BadgeIcon = {
  id: id++,
  slug: 'shiningFates',
  displayName: 'Shining Fates',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const battleStyles: BadgeIcon = {
  id: id++,
  slug: 'battleStyles',
  displayName: 'Battle Styles',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const chillingReign: BadgeIcon = {
  id: id++,
  slug: 'chillingReign',
  displayName: 'Chilling Reign',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const evolvingSkies: BadgeIcon = {
  id: id++,
  slug: 'evolvingSkies',
  displayName: 'Evolving Skies',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const celebrationsSwsh: BadgeIcon = {
  id: id++,
  slug: 'celebrationsSwsh',
  displayName: 'Celebrations',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const fusionStrike: BadgeIcon = {
  id: id++,
  slug: 'fusionStrike',
  displayName: 'Fusion Strike',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const brilliantStars: BadgeIcon = {
  id: id++,
  slug: 'brilliantStars',
  displayName: 'Brilliant Stars',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const astralRadiance: BadgeIcon = {
  id: id++,
  slug: 'astralRadiance',
  displayName: 'Astral Radiance',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const lostOrigin: BadgeIcon = {
  id: id++,
  slug: 'lostOrigin',
  displayName: 'Lost Origin',
  type: setLogo.id,
  baseSet: swshBaseSet.id,
};

export const sunAndMoon: BadgeIcon = {
  id: id++,
  slug: 'sunAndMoon',
  displayName: 'Sun & Moon',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const guardiansRising: BadgeIcon = {
  id: id++,
  slug: 'guardiansRising',
  displayName: 'Guardians Rising',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const burningShadows: BadgeIcon = {
  id: id++,
  slug: 'burningShadows',
  displayName: 'Burning Shadows',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const shiningLegends: BadgeIcon = {
  id: id++,
  slug: 'shiningLegends',
  displayName: 'Shining Legends',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const crimsonInvasion: BadgeIcon = {
  id: id++,
  slug: 'crimsonInvasion',
  displayName: 'Crimson Invasion',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const ultraPrism: BadgeIcon = {
  id: id++,
  slug: 'ultraPrism',
  displayName: 'Ultra Prism',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const forbiddenLight: BadgeIcon = {
  id: id++,
  slug: 'forbiddenLight',
  displayName: 'Forbidden Light',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const celestialStorm: BadgeIcon = {
  id: id++,
  slug: 'celestialStorm',
  displayName: 'Celestial Storm',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const dragonMajesty: BadgeIcon = {
  id: id++,
  slug: 'dragonMajesty',
  displayName: 'Dragon Majesty',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const lostThunder: BadgeIcon = {
  id: id++,
  slug: 'lostThunder',
  displayName: 'Lost Thunder',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const teamUp: BadgeIcon = {
  id: id++,
  slug: 'teamUp',
  displayName: 'Team Up',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const detectivePikachu: BadgeIcon = {
  id: id++,
  slug: 'detectivePikachu',
  displayName: 'Detective Pikachu',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const unbrokenBonds: BadgeIcon = {
  id: id++,
  slug: 'unbrokenBonds',
  displayName: 'Unbroken Bonds',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const unifiedMinds: BadgeIcon = {
  id: id++,
  slug: 'unifiedMinds',
  displayName: 'Unified Minds',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const hiddenFates: BadgeIcon = {
  id: id++,
  slug: 'hiddenFates',
  displayName: 'Hidden Fates',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const cosmicEclipse: BadgeIcon = {
  id: id++,
  slug: 'cosmicEclipse',
  displayName: 'Cosmic Eclipse',
  type: setLogo.id,
  baseSet: smBaseSet.id,
};

export const scarletAndViolet: BadgeIcon = {
  id: id++,
  slug: 'scarletAndViolet',
  displayName: 'Scarlet & Violet',
  type: setLogo.id,
  baseSet: svBaseSet.id,
};

export const badgeIcons: BadgeIcon[] = [
  lillie,
  hau,
  gladion,
  professorKukui,
  ilima,
  nanu,
  acerola,
  hala,
  kiawe,
  lana,
  mallow,
  mina,
  olivia,
  sophocles,
  hapu,
  plumeria,
  guzma,
  marnie,
  milo,
  nessa,
  kabu,
  bea,
  allister,
  opal,
  gordie,
  melony,
  piers,
  bede,
  leon,
  lusamine,
  teamYellGrunt,
  teamSkullGruntFemale,
  teamSkullGruntMale,
  aetherFoundationEmployeeFemale,
  aetherFoundationEmployeeMale,
  scarletAndViolet,
  swordAndShield,
  rebelClash,
  darknessAblaze,
  championsPath,
  vividVoltage,
  shiningFates,
  battleStyles,
  chillingReign,
  celebrationsSwsh,
  fusionStrike,
  brilliantStars,
  astralRadiance,
  lostOrigin,
  sunAndMoon,
  guardiansRising,
  burningShadows,
  shiningLegends,
  crimsonInvasion,
  ultraPrism,
  forbiddenLight,
  celestialStorm,
  dragonMajesty,
  lostThunder,
  teamUp,
  detectivePikachu,
  unbrokenBonds,
  unifiedMinds,
  hiddenFates,
  cosmicEclipse,
];

export const badgeIconTypes = [trainerIcon, setLogo];

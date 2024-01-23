import { cardImgHeight, cardImgWidth } from '@cardEditor/cardStyles';

// Form width minus all paddings
export const cropperWidth = 354;
export const cropperHeight = (cropperWidth / cardImgWidth) * cardImgHeight;

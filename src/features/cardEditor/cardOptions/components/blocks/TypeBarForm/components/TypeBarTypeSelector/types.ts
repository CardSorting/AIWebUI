import { Type } from '@cardEditor/cardOptions/type';
import { CardCreatorAnalyticsEvent } from '@features/analytics';

export interface TypeBarTypeSelectorProps {
  slug: string;
  displayName: string;
  type?: Type;
  analyticsEvent: CardCreatorAnalyticsEvent;
  setType: (typeId: number) => void;
}

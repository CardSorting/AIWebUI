import { useCardLogicStore } from '@cardEditor/cardLogic';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { Placement } from '@cardEditor/cardStyles/types';
import keepDoubleSpaces from '@cardEditor/cardStyles/utils/keepDoubleSpaces';
import Routes from '@routes';
import { FC } from 'react';
import DisplayImg from '../DisplayImg';
import {
  AbilityDescriptionText,
  AbilityNameText,
  DESCRIPTION_SCALE,
  NAME_SCALE,
  SymbolContainer,
  TitleBar,
  Wrapper,
} from './styles';
import { AbilityProps } from './types';

const Ability: FC<AbilityProps> = ({ ability, placement }) => {
  const greatestEnergyCost = useCardLogicStore(
    store => store.greatestEnergyCost,
  );
  const {
    abilitySymbol,
    movesTextColor,
    movesOutline,
    moveNameLeftPercentage,
  } = useCardStyles([
    'abilitySymbol',
    'movesTextColor',
    'movesOutline',
    'moveNameLeftPercentage',
  ]);
  const {
    ability: abilityPlacement,
    abilityTitleBar: titleBarPlacement,
    abilityName: abilityNamePlacement,
    abilitySymbol: abilitySymbolPlacement,
    abilityDescription: abilityDescriptionPlacement,
  } = useCardPlacements([
    'ability',
    'abilityTitleBar',
    'abilityName',
    'abilitySymbol',
    'abilityDescription',
  ]);

  const imgSrc =
    !!abilitySymbol && Routes.Assets.Symbols.Ability(abilitySymbol);

  if (!imgSrc) return null;

  return (
    <Wrapper
      placement={
        { ...(placement ?? {}), ...(abilityPlacement ?? {}) } as Placement
      }
    >
      <TitleBar placement={titleBarPlacement}>
        <SymbolContainer placement={abilitySymbolPlacement}>
          <DisplayImg src={imgSrc} />
        </SymbolContainer>
        <AbilityNameText
          textOutline={movesOutline}
          $energyCost={greatestEnergyCost}
          $leftPercentage={moveNameLeftPercentage}
          unscale={NAME_SCALE}
          placement={abilityNamePlacement}
        >
          {ability.name}
        </AbilityNameText>
      </TitleBar>
      <AbilityDescriptionText
        placement={abilityDescriptionPlacement}
        textOutline={movesOutline}
        textColor={movesTextColor}
        unscale={DESCRIPTION_SCALE}
      >
        {keepDoubleSpaces(ability.description)}
      </AbilityDescriptionText>
    </Wrapper>
  );
};

export default Ability;

import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import { useType } from '@cardEditor/cardOptions/type';
import Routes from '@routes';
import { FC } from 'react';
import DisplayImg from '../../../DisplayImg';
import {
  EnergyCostModifierText,
  TypeContainer,
  TypeWrapper,
  Wrapper,
} from './styles';
import { AttackMovePropsEnergyCostProps } from './types';

const AttackMoveEnergyCost: FC<AttackMovePropsEnergyCostProps> = ({
  move,
  hasAttackCostBorder,
  textColor,
  textOutline,
}) => {
  const { baseSet } = useBaseSet();
  const { getTypeById } = useType();

  return (
    <Wrapper>
      {/* If there's no energy cost, display an empty cost symbol */}
      {move?.energyCost.length === 0 && (
        <TypeWrapper>
          <TypeContainer $hasBorder={hasAttackCostBorder}>
            <DisplayImg
              src={Routes.Assets.Icons.Type(
                baseSet.slug,
                'empty',
                hasAttackCostBorder,
              )}
            />
          </TypeContainer>
        </TypeWrapper>
      )}
      {move?.energyCost.length !== 0 &&
        [...(move?.energyCost ?? [])]
          .sort((a, b) => a.typeId - b.typeId)
          .flatMap(energy =>
            new Array(energy.amount).fill(null).map((_, i) => (
              <TypeWrapper key={`${energy.typeId}-${i}`}>
                <TypeContainer $hasBorder={hasAttackCostBorder}>
                  <DisplayImg
                    src={Routes.Assets.Icons.Type(
                      baseSet.slug,
                      getTypeById(energy.typeId)!.slug,
                      hasAttackCostBorder,
                    )}
                  />
                </TypeContainer>
              </TypeWrapper>
            )),
          )}
      {move?.energyCostModifier && (
        <TypeWrapper>
          <EnergyCostModifierText
            textColor={textColor}
            textOutline={textOutline}
            $symbol={move.energyCostModifier}
          >
            {move.energyCostModifier}
          </EnergyCostModifierText>
        </TypeWrapper>
      )}
    </Wrapper>
  );
};

export default AttackMoveEnergyCost;

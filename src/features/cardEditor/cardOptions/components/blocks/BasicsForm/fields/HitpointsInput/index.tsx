import NumberInput from '@components/inputs/NumberInput';
import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';

const HitpointsInput: FC = () => {
  const { hasHitpoints } = useCardLogic(['hasHitpoints']);
  const { hitpoints, setState } = useCardOptions(['hitpoints']);

  if (!hasHitpoints) return null;

  return (
    <NumberInput
      slug="hitpoints"
      label="Hitpoints"
      value={hitpoints}
      min={0}
      max={999}
      onChange={value => setState({ hitpoints: value })}
    />
  );
};

export default HitpointsInput;

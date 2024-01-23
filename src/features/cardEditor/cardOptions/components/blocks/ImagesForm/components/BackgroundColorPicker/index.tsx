import { useCardOptions } from '@cardEditor/cardOptions/hooks';
import ControlledColorPicker from '@components/inputs/ControlledColorPicker';
import { FC, useEffect, useState } from 'react';

const BackgroundColorPicker: FC = () => {
  const { backgroundColor, setState } = useCardOptions(['backgroundColor']);
  const [windowReady, setWindowReady] = useState<boolean>(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  if (!windowReady) return null;

  return (
    <ControlledColorPicker
      label="Background Color"
      slug="backgroundColor"
      onChange={value => setState({ backgroundColor: value })}
      value={backgroundColor}
    />
  );
};

export default BackgroundColorPicker;

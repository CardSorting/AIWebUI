import { useCardLogic } from '@cardEditor/cardLogic';
import TextFormattingTooltip from '@cardEditor/cardOptions/components/atoms/TextFormattingTooltip';
import { useCardOptions } from '@cardEditor/cardOptions';
import TextAreaInput from '@components/inputs/TextAreaInput';
import { FC } from 'react';

const DescriptionInput: FC = () => {
  const { hasDescription } = useCardLogic(['hasDescription']);
  const { description, setState } = useCardOptions(['description']);

  if (!hasDescription) return null;

  return (
    <TextAreaInput
      slug="description"
      label="Description"
      value={description}
      onChange={value => setState({ description: value })}
      tooltipProps={{
        title: 'Text Formatting',
        withPopup: true,
        children: <TextFormattingTooltip />,
      }}
    />
  );
};

export default DescriptionInput;

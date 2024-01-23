import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { useCardOptions } from '@cardEditor/cardOptions';

const CardNumberInput: FC = () => {
  const { cardNumber, setState } = useCardOptions(['cardNumber']);

  return (
    <TextInput
      slug="cardNumber"
      label="Card Number"
      value={cardNumber}
      onChange={value => setState({ cardNumber: value })}
    />
  );
};

export default CardNumberInput;

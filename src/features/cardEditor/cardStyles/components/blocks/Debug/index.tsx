import { useCardDebugStore } from '@cardEditor/cardDebug';
import { FC, memo } from 'react';
import DebugImage from './fields/DebugImage';

const Debug: FC = () => {
  const showDebug = useCardDebugStore(store => store.showDebug);

  if (!showDebug) return null;

  return <DebugImage />;
};

export default memo(Debug);

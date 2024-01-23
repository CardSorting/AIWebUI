import { useStrippedCard } from '@cardEditor/cardOptions/hooks';
import { useCardOptionsStore } from '@cardEditor/cardOptions';
import { AssignmentTurnedIn, DataObject } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC, useCallback, useState } from 'react';

const ExportButton: FC = () => {
  const { state } = useCardOptionsStore();
  const strippedCard = useStrippedCard(state);
  const [Icon, setIcon] = useState(<DataObject />);

  const handleExport = useCallback(() => {
    let timeout: NodeJS.Timeout;

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(strippedCard)).then(() => {
        setIcon(<AssignmentTurnedIn />);
        timeout = setTimeout(() => setIcon(<DataObject />), 2000);
      });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [strippedCard]);

  return (
    <Button
      sx={{ pl: 10 }}
      fullWidth
      variant="outlined"
      startIcon={Icon}
      onClick={handleExport}
    >
      Export object
    </Button>
  );
};

export default ExportButton;

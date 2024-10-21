import { Brush as BrushIcon } from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Link } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { FC } from 'react';

const MobileHeader: FC = () => {
  return (
    <>
      <SwipeableDrawer anchor="left" open={true} onClose={() => {}} onOpen={() => {}}>
        <Box role="presentation" sx={{ width: 250 }}>
          <List>
            <Link href="/create-custom-card" passHref>
              <ListItemButton component="a">
                <ListItemIcon>
                  <BrushIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Create Custom Card" primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </Link>

            {/* Patreon Link */}
            <Link
              href="https://patreon.com/PlayMoreTCG?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
              passHref
              target="_blank"
              rel="noopener"
            >
              <ListItemButton component="a">
                <ListItemIcon>
                  {/* You can choose any icon or leave it blank */}
                  <BrushIcon color="action" /> {/* Replace with an appropriate Patreon-related icon if needed */}
                </ListItemIcon>
                <ListItemText
                  primary="Support me on Patreon"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHeader;
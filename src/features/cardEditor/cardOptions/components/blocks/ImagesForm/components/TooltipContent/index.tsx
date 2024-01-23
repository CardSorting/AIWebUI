import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import crop from '@assets/images/cardImgDemo/crop.png';
import layering from '@assets/images/cardImgDemo/layering.png';
import uploadButton from '@assets/images/cardImgDemo/uploadButton.png';
import advancedCrop from '@assets/images/cardImgDemo/advancedCrop.png';
import { ImgWrapper, ListItem } from './styles';

const TooltipContent: FC = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <ol>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            <b>Upload</b> your image(s) by pressing the &quot;Upload image&quot;
            button.
          </Typography>
          <ImgWrapper height={uploadButton.height} width={uploadButton.width}>
            <Image src={uploadButton} />
          </ImgWrapper>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            You can drag your image around in order to set <b>layers</b>.
          </Typography>
          <ImgWrapper height={layering.height} width={layering.width}>
            <Image src={layering} />
          </ImgWrapper>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            If you drag images <b>above</b> the &quot;Template image&quot;
            divider, they will appear <b>under</b> the image template.
          </Typography>
          <Typography>
            If you drag images <b>below</b> the &quot;Template image&quot;
            divider, they will appear <b>above</b> the image template.
          </Typography>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            Clicking the pencil icon allows you to <b>edit</b> your image. You
            can choose to crop or delete your image.
          </Typography>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            Enabling the <b>cropper</b> allows you to drag zoom your image.
          </Typography>
          <ImgWrapper height={crop.height} width={crop.width}>
            <Image src={crop} />
          </ImgWrapper>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Typography>
            At the bottom of the cropper, you can enable{' '}
            <b>advanced cropping</b>. This allows you to precisely set image
            coordinates and the zoom level.{' '}
            <i>
              While advanced crop is active, you can&apos;t drag and zoom on the
              cropper above.
            </i>
          </Typography>
          <ImgWrapper height={advancedCrop.height} width={advancedCrop.width}>
            <Image src={advancedCrop} />
          </ImgWrapper>
        </Box>
      </ListItem>
    </ol>
  </Box>
);

export default TooltipContent;

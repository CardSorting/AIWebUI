import AccordionForm from '@components/AccordionForm';
import FileUploader from '@components/inputs/FileUploader';
import { FC, useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { useCardOptions } from '@cardEditor/cardOptions';
import ImgItem from './components/ImgItem';
import { constructDroppableList, constructImageList, isCardImg } from './utils';
import TooltipContent from './components/TooltipContent';
import BackgroundColorPicker from './components/BackgroundColorPicker';

const ImagesForm: FC = () => {
  const { images, setState } = useCardOptions(['images']);
  const [windowReady, setWindowReady] = useState<boolean>(false);
  const [droppableList, setDroppableList] = useState(
    constructDroppableList(images),
  );

  useEffect(() => {
    setWindowReady(true);
  }, []);

  useEffect(() => {
    setDroppableList(constructDroppableList(images));
  }, [images]);

  const handleDrop = useCallback(
    (item: DropResult) => {
      // Ignore drop outside droppable container
      if (!item.destination) return;

      const currentIndex = item.source.index;
      const newIndex = item.destination.index;
      // No changes
      if (currentIndex === newIndex) return;

      const newList = [...droppableList];
      const [reorderedItem] = newList.splice(currentIndex, 1);
      newList.splice(newIndex, 0, reorderedItem);

      setDroppableList(newList);
      setState({ images: constructImageList(newList) });
    },
    [droppableList, setState],
  );

  return (
    <AccordionForm slug="imagesForm" header="Images">
      <BackgroundColorPicker />
      <FileUploader
        label="Upload Image"
        slug="imgUpload"
        buttonText={
          <Typography variant="body2" component="span">
            {images.length
              ? 'Click to add another image'
              : 'Click to add your image'}
          </Typography>
        }
        tooltipProps={{
          title: 'Image Layers',
          withPopup: true,
          children: <TooltipContent />,
        }}
        onChange={(name, src) =>
          setState({
            images: [
              {
                id: nanoid(),
                name,
                src,
                behindTemplate: true,
                order: 1,
              },
              ...images.map(img => ({
                ...img,
                order: img.order + 1,
              })),
            ],
          })
        }
      />
      <DragDropContext onDragEnd={handleDrop}>
        {windowReady && (
          <Droppable droppableId="imgList">
            {providedList => (
              <Box
                {...providedList.droppableProps}
                ref={providedList.innerRef}
                mt={-1}
              >
                {droppableList.map((item, index) =>
                  isCardImg(item) ? (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {providedItem => (
                        <ImgItem img={item} provided={providedItem} />
                      )}
                    </Draggable>
                  ) : (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {providedItem => (
                        <Box>
                          <Divider
                            sx={{ mt: 2 }}
                            ref={providedItem.innerRef}
                            // {...providedItem.dragHandleProps}
                            {...providedItem.draggableProps}
                          >
                            Template Image
                          </Divider>
                          {index === droppableList.length - 1 && (
                            <Typography
                              variant="caption"
                              display="block"
                              textAlign="center"
                            >
                              You can{' '}
                              <DragIndicator
                                fontSize="inherit"
                                display="inline"
                              />{' '}
                              drag images under this this line to make them
                              appear above the template image
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Draggable>
                  ),
                )}
                {providedList.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </AccordionForm>
  );
};

export default ImagesForm;

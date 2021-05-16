import { FC, memo, useMemo } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Wish } from 'lib/types/Wish';
import { createStyles, makeStyles, Grow } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  imagePreviewContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
}));

const WishImagePreview: FC<{ control: Control<Wish> }> = ({ control }) => {
  const images = useWatch({ control, name: 'images' });
  const classes = useStyles();

  const imageFiles: File[] = useMemo(() => {
    const elements: File[] = [];
    if (images) {
      for (let i = 0; i < images.length; i += 1) {
        elements.push((images as FileList).item(i));
      }
    }
    return elements;
  }, [images]);

  return (
    <Grow in={Boolean(images)} timeout={1500}>
      <div className={classes.imagePreviewContainer}>
        {imageFiles.map((image) => {
          const objectUrl = URL.createObjectURL(image);
          return (
            <div className="image-upload-preview" key={objectUrl}>
              <img src={objectUrl} className={classes.imagePreview} alt="Uploaded Memory" />
            </div>
          );
        })}
      </div>
    </Grow>
  );
};

export default memo(WishImagePreview);

import {
  TextField,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Wish } from 'lib/types/Wish';
import { FC, memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Controller,
  useFormState,
  useFormContext,
} from 'react-hook-form';
import WishImagePreview from 'components/WishImagePreview';
import { Graduate } from 'lib/types/Graduate';
import useFormSubmit, { SubmitProgressHandler } from 'lib/utils/useFormSubmit';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface WishFormFieldsProps {
  onProgress: SubmitProgressHandler;
  graduates: Graduate[];
}

const richtextToolbar = [
  [{ header: [1, 2, 3, false] }],

  [{ font: [] }],
  [{ align: [] }],

  ['bold', 'italic', 'underline', 'strike', 'link'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'super' }, { script: 'sub' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ color: [] }, { background: [] }],

  ['video'],
  ['clean'],
];

const useStyles = makeStyles((theme) => createStyles({
  imageReset: {
    marginLeft: theme.spacing(2),
  },
}));

const WishFormFields: FC<WishFormFieldsProps> = ({
  graduates,
  onProgress,
}) => {
  const classes = useStyles();
  const {
    register,
    control,
    handleSubmit,
    setValue,
  } = useFormContext<Wish>();
  const {
    isSubmitting,
    errors,
  } = useFormState<Wish>({ control });

  const onSubmit = useFormSubmit(onProgress);

  const resetImage = useCallback(() => setValue('images', undefined), [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="from"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField variant="outlined" margin="normal" fullWidth {...field} label="Your Name" helperText={errors.from && 'Please enter your name'} error={!!errors.from} />}
      />
      <Controller
        name="graduateId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl variant="outlined" margin="normal" fullWidth error={!!errors.graduateId}>
            <InputLabel>Send to</InputLabel>
            <Select native variant="outlined" label="Send to" {...field} value={field.value ?? ''}>
              <option value="">-</option>
              {graduates.map((graduate) => (
                <option value={graduate.id} key={graduate.id}>{graduate.name}</option>
              ))}
            </Select>
            <FormHelperText>{errors.graduateId && 'Please select a graduate'}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="title"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField variant="outlined" margin="normal" fullWidth {...field} label="Wish Title" helperText={errors.title && 'Please enter a title for your wish'} error={!!errors.title} />}
      />
      <Controller
        control={control}
        defaultValue=""
        name="message"
        rules={{ required: true }}
        render={({ field }) => (
          <Box mt={2}>
            <Box mb={1}>
              <InputLabel error={Boolean(errors.message)}>Your Wish</InputLabel>
            </Box>
            <ReactQuill
              theme="snow"
              modules={{
                toolbar: richtextToolbar,
              }}
              onChange={(value, _delta, _source, _editor) => field.onChange(value)}
              value={field.value || ''}
            />
            {Boolean(errors.message) && (
            <Typography color="error" variant="caption">
              Please type the wish message.
            </Typography>
            )}
          </Box>
        )}
      />
      <Box mt={2}>
        <InputLabel>(Optional) Upload your photo with them!</InputLabel>
        <Box mb={1} mt={1}>
          <Button
            variant="contained"
            component="label"
            id="img-upload"
          >
            <span>Select Image(s)</span>
            <input
              type="file"
              {...register('images')}
              style={{ display: 'none' }}
              accept="image/jpeg,image/png"
              multiple
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            id="img-reset"
            className={classes.imageReset}
            onClick={resetImage}
          >
            Reset
          </Button>
        </Box>
        <WishImagePreview control={control} />
      </Box>
      <Box mt={2}>
        <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">Submit Your Wish</Button>
      </Box>
    </form>
  );
};

export default memo(
  WishFormFields,
);

import { FC, memo } from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import { SubmitProgressEvent } from 'lib/utils/useFormSubmit';
import { Control, useWatch } from 'react-hook-form';

interface SubmitProgressProps {
  control: Control<SubmitProgressEvent>;
  isSubmitting: boolean;
}

const SubmitProgress: FC<SubmitProgressProps> = ({ control, isSubmitting }) => {
  const { progress, message } = useWatch({ control });

  if (!isSubmitting) {
    return null;
  }

  return (
    <Box mt={2}>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="caption">
        {message}
      </Typography>
    </Box>
  );
};

export default memo(SubmitProgress);

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { FC } from 'react';

interface WishSubmitStatusProps {
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  onReset: () => void;
}

const WishSubmitStatus: FC<WishSubmitStatusProps> = ({
  isSubmitted,
  isSubmitSuccessful,
  onReset,
}) => {
  const statusTitle = isSubmitSuccessful ? 'Success' : 'Error';
  const statusMessage = isSubmitSuccessful ? 'Wish has been successfully submitted.' : 'Unable to submit wish.';
  const StatusIcon = isSubmitSuccessful ? CheckCircleIcon : ErrorIcon;

  return (
    <Dialog
      open={isSubmitted}
      onClose={onReset}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{statusTitle}</DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          <StatusIcon fontSize="large" style={{ color: isSubmitSuccessful ? '#007E33' : '#CC0000' }} />
          <DialogContentText id="alert-dialog-description">
            {statusMessage}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReset} color="primary" autoFocus>
          {isSubmitSuccessful ? 'Submit Another Wish' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WishSubmitStatus;

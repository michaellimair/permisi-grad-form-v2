import { Graduate } from 'lib/types/Graduate';
import { FC } from 'react';
import Image from 'next/image';
import {
  Paper, Typography, Box, makeStyles, createStyles,
} from '@material-ui/core';
import WishForm from 'components/WishForm';

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    padding: theme.spacing(2),
  },
  logoContainer: {
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const FormContent: FC<{ graduates: Graduate[] }> = ({ graduates }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box>
        <div className={classes.logoContainer}>
          <Image src="/logo.png" width={128} height={80} />
        </div>
        <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          Send your wishes to our graduates!!!
        </Typography>
        <Typography>
          Your wishes will be displayed in our digital graduation card,
          unique to each and every graduate in the below list.
          If there are problems with the form or any missing graduates,
          please contact a PERMISI committee immediately.
        </Typography>
        <WishForm graduates={graduates} />
      </Box>
    </Paper>
  );
};

export default FormContent;

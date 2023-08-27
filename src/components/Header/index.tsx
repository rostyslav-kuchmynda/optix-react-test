import { Typography } from '@mui/material';

import { TotalMovies } from '../TotalMovies';

import classes from './styles.module.scss';

export const Header = () => (
  <header className={classes.headerWrap}>
    <Typography variant="h1">Welcome to Movie database!</Typography>
    <TotalMovies />
  </header>
);

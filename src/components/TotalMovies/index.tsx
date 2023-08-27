import { useCallback } from 'react';

import { Typography } from '@mui/material';
import { CustomButton } from '../CustomButton';

import { useTypedDispatch, useTypedSelector } from '../../hooks/storeHooks';
import { getTotalMovies, uiClearSelectedRowIndex, uiTriggerRefresh } from '../../store';

import classes from './styles.module.scss';

export const TotalMovies = () => {
  const dispatch = useTypedDispatch();

  const totalMovies = useTypedSelector(getTotalMovies);

  const handleRefresh = useCallback(() => {
    dispatch(uiTriggerRefresh());
    dispatch(uiClearSelectedRowIndex());
  }, [dispatch]);

  return (
    <div className={classes.totalMoviesWrap}>
      {totalMovies ? (
        <Typography className={classes.totalMoviesDisplay}>Total movies displayed: {totalMovies}</Typography>
      ) : (
        <Typography className={`${classes.totalMoviesDisplay} ${classes.totalMoviesDisplayWarning}`}>
          No movies found, try to refresh the page.
        </Typography>
      )}
      <CustomButton onClick={handleRefresh} label={'Refresh'} />
    </div>
  );
};

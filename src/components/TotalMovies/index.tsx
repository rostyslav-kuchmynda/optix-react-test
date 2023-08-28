import { useCallback } from 'react';

import { Typography } from '@mui/material';
import { CustomButton } from '../CustomButton';

import { useTypedDispatch, useTypedSelector } from '../../hooks/storeHooks';
import {
  getSuccessMessage,
  getTotalMovies,
  uiClearSelectedRowIndex,
  uiSetSuccessMessage,
  uiTriggerRefresh,
} from '../../store';

import classes from './styles.module.scss';

export const TotalMovies = () => {
  const dispatch = useTypedDispatch();

  const totalMovies = useTypedSelector(getTotalMovies);
  const successMessage = useTypedSelector(getSuccessMessage);

  const handleRefresh = useCallback(() => {
    dispatch(uiTriggerRefresh());
    dispatch(uiClearSelectedRowIndex());
    if (successMessage.length) {
      dispatch(uiSetSuccessMessage(''));
    }
  }, [dispatch, successMessage]);

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

import { useEffect, useMemo } from 'react';

import { Header } from '../../components/Header';
import { DataTable } from '../../components/Table';
import { FeedbackForm } from '../../components/FeedbackForm';
import { ModalForm } from '../../components/Modal';
import { Snackbar } from '../../components/Snackbar';

import { useTypedDispatch, useTypedSelector, useWidthObserver } from '../../hooks';
import {
  getIsLoading,
  getMoviesList,
  getRefreshFlag,
  getSuccessMessage,
  uiFetchMoviesData,
  uiSetIsSmallDevice,
} from '../../store';

import classes from './styles.module.scss';

const BREAKPOINT = 768;

export const AppLayout = () => {
  const dispatch = useTypedDispatch();
  const isSmallBreakPoint = useWidthObserver(BREAKPOINT);

  const successMessage = useTypedSelector(getSuccessMessage);

  const showSuccessPopup = useMemo(
    () => successMessage.length > 0 && isSmallBreakPoint,
    [successMessage, isSmallBreakPoint]
  );

  useEffect(() => {
    dispatch(uiSetIsSmallDevice(isSmallBreakPoint));
  }, [dispatch, isSmallBreakPoint]);

  const movies = useTypedSelector(getMoviesList);
  const refreshFrag = useTypedSelector(getRefreshFlag);
  const isLoaded = useTypedSelector(getIsLoading);

  useEffect(() => {
    dispatch(uiFetchMoviesData());
  }, [dispatch, refreshFrag]);

  return (
    <div className={classes.appLayoutWrapper}>
      <Header />
      <DataTable isLoaded={isLoaded} moviesData={movies} />
      {isSmallBreakPoint ? <ModalForm /> : <FeedbackForm />}
      <Snackbar success condition={showSuccessPopup} message={successMessage} className={classes.snackBarLayout} />
    </div>
  );
};

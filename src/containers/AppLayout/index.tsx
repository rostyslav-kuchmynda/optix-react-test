import { useEffect } from 'react';

import { Header } from '../../components/Header';
import { DataTable } from '../../components/Table';
import { FeedbackForm } from '../../components/FeedbackForm';

import { useTypedDispatch, useTypedSelector, useWidthObserver } from '../../hooks';
import { getIsLoading, getMoviesList, getRefreshFlag, uiFetchMoviesData } from '../../store';

const BREAKPOINT = 768;

export const AppLayout = () => {
  const dispatch = useTypedDispatch();
  const isSmallBreakPoint = useWidthObserver(BREAKPOINT);

  const movies = useTypedSelector(getMoviesList);
  const refreshFrag = useTypedSelector(getRefreshFlag);
  const isLoaded = useTypedSelector(getIsLoading);

  useEffect(() => {
    dispatch(uiFetchMoviesData());
  }, [dispatch, refreshFrag]);

  return (
    <div>
      <Header />
      <DataTable isLoaded={isLoaded} moviesData={movies} />
      <FeedbackForm />
    </div>
  );
};

import { useCallback, useMemo, useState } from 'react';

import { Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { CustomButton } from '../CustomButton';

import { useTypedDispatch, useTypedSelector } from '../../hooks/storeHooks';
import {
  getIsLoading,
  getMoviesList,
  getSelectedMovie,
  getSelectedRowIndex,
  uiClearSelectedRowIndex,
} from '../../store';

import classes from './styles.module.scss';
import { MovieDataType } from '../../types';

const MIN_ROWS = 4;

export const FeedbackForm: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [textAreaValue, setTextAreaValue] = useState('');

  const isLoaded = useTypedSelector(getIsLoading);
  const selectedMovie = useTypedSelector(getSelectedMovie);
  const rowIndex = useTypedSelector(getSelectedRowIndex);
  const movies = useTypedSelector(getMoviesList);

  const showTextArea = useMemo(
    () => isLoaded && Object.keys(selectedMovie).length && rowIndex.length,
    [selectedMovie, rowIndex, isLoaded]
  );

  const showForm = useMemo(() => isLoaded && movies.length, [movies, isLoaded]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(uiClearSelectedRowIndex());
      setTextAreaValue('');
    },
    [dispatch]
  );

  if (!showForm) return;

  return (
    <section className={classes.feedbackFormWrapper}>
      {showTextArea ? (
        <>
          <Typography className={classes.feedbackFormTitle}>
            Please submit the feedback for <b>{(selectedMovie as MovieDataType)?.title}</b>.
          </Typography>
          <form onSubmit={handleSubmit} className={classes.formWrapper}>
            <TextareaAutosize
              className={classes.textAreaStyles}
              minRows={MIN_ROWS}
              value={textAreaValue}
              onChange={e => setTextAreaValue(e.target.value)}
            />
            <CustomButton type="submit" label={'Submit'} />
          </form>
        </>
      ) : (
        <Typography className={classes.feedbackFormTitle}>Please select movie to leave a review.</Typography>
      )}
    </section>
  );
};

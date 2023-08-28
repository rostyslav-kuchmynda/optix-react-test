import { useMemo } from 'react';

import { Typography } from '@mui/material';
import { TextAreaForm } from '../Form';
import { Snackbar } from '../Snackbar';

import { useTypedSelector } from '../../hooks';
import { MovieDataType } from '../../types';
import { getIsLoading, getMoviesList, getSelectedMovie, getSelectedRowIndex, getSuccessMessage } from '../../store';

import classes from './styles.module.scss';

export const FeedbackForm: React.FC = () => {
  const isLoaded = useTypedSelector(getIsLoading);
  const selectedMovie = useTypedSelector(getSelectedMovie);
  const rowIndex = useTypedSelector(getSelectedRowIndex);
  const movies = useTypedSelector(getMoviesList);
  const successMessage = useTypedSelector(getSuccessMessage);

  const showForm = useMemo(() => isLoaded && movies.length, [movies, isLoaded]);

  const showSuccess = useMemo(() => successMessage.length > 0, [successMessage]);
  const showTextArea = useMemo(
    () => isLoaded && Object.keys(selectedMovie).length && rowIndex.length,
    [selectedMovie, rowIndex, isLoaded]
  );

  if (!showForm) return;

  return (
    <section className={classes.feedbackFormWrapper}>
      {showTextArea ? (
        <div className={classes.formContainer}>
          <Typography className={classes.feedbackFormTitle}>
            Please submit the feedback for <b>{(selectedMovie as MovieDataType)?.title}</b>.
          </Typography>
          <TextAreaForm />
        </div>
      ) : (
        <div className={classes.feedbackFormTitleContainer}>
          <Typography className={classes.feedbackFormTitle}>Please select movie to leave a review.</Typography>
          <Snackbar success condition={showSuccess} message={successMessage} />
        </div>
      )}
    </section>
  );
};

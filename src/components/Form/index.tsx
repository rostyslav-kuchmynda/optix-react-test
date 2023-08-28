import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from '@mui/material';
import { CustomButton } from '../CustomButton';
import { CharacterLimit } from '../CharacterLimit';
import { Snackbar } from '../Snackbar';

import { MoviesService } from '../../services/movies';
import { useTypedDispatch, useTypedSelector } from '../../hooks/storeHooks';
import {
  getIsLoading,
  getSelectedMovie,
  getSelectedRowIndex,
  uiClearSelectedRowIndex,
  uiSetSuccessMessage,
} from '../../store';
import { ReviewType } from '../../types';

import classes from './styles.module.scss';

const MIN_ROWS = 4;
const LIMIT_CHAR = 100;

const schema = yup.object({
  review: yup
    .string()
    .test('len', `Review should be less than ${LIMIT_CHAR} characters!`, val => (val ?? '').length <= LIMIT_CHAR),
});

export const TextAreaForm: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [textAreaValue, setTextAreaValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      review: '',
    },
  });

  const isLoaded = useTypedSelector(getIsLoading);
  const selectedMovie = useTypedSelector(getSelectedMovie);
  const rowIndex = useTypedSelector(getSelectedRowIndex);

  const showTextArea = useMemo(
    () => isLoaded && Object.keys(selectedMovie).length && rowIndex.length,
    [selectedMovie, rowIndex, isLoaded]
  );

  const isLimit = useMemo(() => textAreaValue.length > LIMIT_CHAR, [textAreaValue]);
  const isTextareaEmpty = useMemo(() => !textAreaValue.length, [textAreaValue]);
  const charactersLeft = useMemo(() => textAreaValue.length, [textAreaValue]);

  const onSubmit: SubmitHandler<ReviewType> = useCallback(
    data => {
      if (data?.review) {
        MoviesService.submitReview(data?.review).then(val => dispatch(uiSetSuccessMessage(val.message)));
      }
      dispatch(uiClearSelectedRowIndex());
      reset();
    },
    [dispatch, reset]
  );

  const handleOnChange = useCallback(
    (value: string) => {
      setTextAreaValue(value);
    },
    [setTextAreaValue]
  );

  if (!showTextArea) return;

  return (
    <>
      <form onSubmit={handleSubmit(review => onSubmit(review as ReviewType))} className={classes.formWrapper}>
        <TextField
          className={classes.textAreaStyles}
          {...register('review')}
          onChange={event => handleOnChange(event.target.value)}
          label="Review"
          type="review"
          placeholder="Enter your movie review"
          multiline
          minRows={MIN_ROWS}
        />
        <CustomButton disabled={isTextareaEmpty} type="submit" label={'Submit'} className={classes.submitBtn} />
        <CharacterLimit charactersLeft={charactersLeft} isLimit={isLimit} />
      </form>
      <Snackbar
        condition={isLimit}
        message={errors.review?.message ?? `Please keep review under ${LIMIT_CHAR} characters`}
      />
    </>
  );
};

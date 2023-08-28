import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TextAreaForm } from '../Form';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import {
  getIsModalOpen,
  getSelectedMovie,
  getSuccessMessage,
  uiClearSelectedRowIndex,
  uiCloseModalForm,
  uiSetSuccessMessage,
} from '../../store';

import classes from './styles.module.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { MovieDataType } from '../../types';

export const ModalForm: React.FC = () => {
  const dispatch = useTypedDispatch();

  const isOpen = useTypedSelector(getIsModalOpen);
  const successMessage = useTypedSelector(getSuccessMessage);
  const selectedMovie = useTypedSelector(getSelectedMovie);

  const handleClose = useCallback(() => {
    dispatch(uiCloseModalForm());
    dispatch(uiClearSelectedRowIndex());
    if (successMessage.length) {
      dispatch(uiSetSuccessMessage(''));
    }
  }, [dispatch, successMessage]);

  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modalWrapper}>
      <div className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Typography className={classes.modalTitle}>
            Please leave feedback for <br /> <b>{(selectedMovie as MovieDataType)?.title}</b>.
          </Typography>
          <CloseIcon type="button" onClick={handleClose} />
        </div>
        <div className={classes.modalContent}>
          <TextAreaForm />
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

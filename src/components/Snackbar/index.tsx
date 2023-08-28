import cc from 'classcat';

import { SnackbarProps } from '../../types';

import classes from './styles.module.scss';
import { useEffect } from 'react';
import { getSuccessMessage, uiSetSuccessMessage } from '../../store';
import { useTypedDispatch, useTypedSelector } from '../../hooks';

const MSEC = 2000;

export const Snackbar: React.FC<SnackbarProps> = ({ condition, message, success = false, className }) => {
  const dispatch = useTypedDispatch();

  const successMessage = useTypedSelector(getSuccessMessage);

  useEffect(() => {
    if (successMessage.length) {
      const timeout = setTimeout(() => dispatch(uiSetSuccessMessage('')), MSEC);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, successMessage]);

  return (
    <div
      role="alert"
      className={cc([
        classes.alert,
        className,
        {
          [classes.fadeIn]: condition,
          [classes.fadeOut]: !condition,
          [classes.success]: success,
        },
      ])}
    >
      {message}
    </div>
  );
};

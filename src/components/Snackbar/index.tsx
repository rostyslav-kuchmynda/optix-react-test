import cc from 'classcat';

import { SnackbarProps } from '../../types';

import classes from './styles.module.scss';

export const Snackbar: React.FC<SnackbarProps> = ({ condition, message, success = false }) => {
  return (
    <div
      role="alert"
      className={cc([
        classes.alert,
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

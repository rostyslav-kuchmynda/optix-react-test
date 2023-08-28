import { Button } from '@mui/material';

import { CustomButtonProps } from '../../types';

import classes from './styles.module.scss';

export const CustomButton: React.FC<CustomButtonProps> = ({
  type = 'button',
  disabled = false,
  label,
  className,
  onClick,
  ...restProps
}) => (
  <Button
    className={`${classes.customButton} ${className}`}
    disableRipple
    onClick={onClick}
    type={type}
    disabled={disabled}
    {...restProps}
  >
    {label}
  </Button>
);

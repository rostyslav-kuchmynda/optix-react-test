import { Button } from '@mui/material';

import { CustomButtonProps } from '../../types';

import classes from './styles.module.scss';

export const CustomButton: React.FC<CustomButtonProps> = ({
  type = 'button',
  label,
  className,
  onClick,
  ...restProps
}) => (
  <Button className={`${classes.customButton} ${className}`} disableRipple onClick={onClick} type={type} {...restProps}>
    {label}
  </Button>
);

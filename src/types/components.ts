import { GridRowSelectionModel } from '@mui/x-data-grid';

export type CustomButtonProps = {
  className?: string;
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export type GridRowSelectionType = GridRowSelectionModel;

export type CharacterLimitProps = {
  charactersLeft: number;
  LIMIT_CHAR?: number;
  isLimit: boolean;
};

export type ReviewType = { review: string };

export type SnackbarProps = {
  condition: boolean;
  success?: boolean;
  message?: string;
};

import { GridRowSelectionModel } from '@mui/x-data-grid';

export type CustomButtonProps = {
  className?: string;
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
};

export type GridRowSelectionType = GridRowSelectionModel;

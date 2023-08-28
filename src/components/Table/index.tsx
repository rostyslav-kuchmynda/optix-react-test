import { useCallback } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { DataTableTypes, MovieDataType } from '../../types';
import { averageRating } from '../../utils/array';
import {
  getSelectedRowIndex,
  getSuccessMessage,
  uiSelectMovie,
  uiSetSelectedRowIndex,
  uiSetSuccessMessage,
} from '../../store';

import classes from './styles.module.scss';

const COLUMNS_CONFIG: GridColDef[] = [
  { field: 'title', headerName: 'Title', sortable: false, flex: 1, align: 'center', headerAlign: 'center' },
  {
    field: 'reviews',
    headerName: 'Review',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: params => averageRating(params.value),
  },
  {
    field: 'name',
    headerName: 'Film Company',
    sortable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
];

export const DataTable: React.FC<DataTableTypes> = ({ isLoaded, moviesData }) => {
  const dispatch = useTypedDispatch();
  const rowIndex = useTypedSelector(getSelectedRowIndex);
  const successMessage = useTypedSelector(getSuccessMessage);

  const handleRowClick = useCallback((movie: MovieDataType) => dispatch(uiSelectMovie(movie)), [dispatch]);

  const handleSetRowIdx = useCallback(
    (newRowSelectionModel: GridRowSelectionModel) => {
      dispatch(uiSetSelectedRowIndex(newRowSelectionModel));

      if (successMessage.length) {
        //RESET the message in case we selected different movie
        dispatch(uiSetSuccessMessage(''));
      }
    },
    [dispatch, successMessage]
  );

  return (
    <div className={classes.tableContainer}>
      {isLoaded ? (
        <DataGrid
          onRowSelectionModelChange={newRowSelectionModel => handleSetRowIdx(newRowSelectionModel)}
          rowSelectionModel={rowIndex}
          onRowClick={rowData => handleRowClick(rowData.row)}
          className={classes.tableDataGrid}
          disableColumnMenu={true}
          rows={moviesData}
          columns={COLUMNS_CONFIG}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
};

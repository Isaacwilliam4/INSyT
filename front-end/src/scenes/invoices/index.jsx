import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';

const LogData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logData, setLogData] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'file_path',
      headerName: 'File Path',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'date_time',
      headerName: 'Date Time',
      flex: 1,
    },
    { field: 'line_number', headerName: 'Line Number', flex: 1 },
    { field: 'line', headerName: 'Line', flex: 1 },
    { field: 'context', headerName: 'Context', flex: 1 },
    {
      field: 'classification',
      headerName: 'Classification',
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.classification}
        </Typography>
      ),
    },
    { field: 'analysis', headerName: 'Analysis', flex: 1 },
  ];

  const fetchLogDataExceptSeverity = async () => {
    await axios
      .get('http://localhost:5656/api/except-severity')
      .then((response) => {
        console.log(response.data);
        setLogData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchLogDataExceptSeverity();
  }, []);

  return (
    <Box m='20px'>
      <Header
        title='LOG DATA'
        subtitle='List of Attack Classification Based on Logs'
      />
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={logData} columns={columns} />
      </Box>
    </Box>
  );
};

export default LogData;

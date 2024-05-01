/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
// import { useSelector } from 'react-redux';
import { useState } from 'react';

import {Box, Paper,  Table, styled, TableRow, TableBody, TableCell,  TableHead, Pagination,LinearProgress, TableContainer, tableCellClasses } from '@mui/material';

import EditMilesDialog from '../dialog_components/EditMilesDialog';

export function TabMiles() {

  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const rowsPerPage = 10;

  const handleOpenDialog = async () => {
    try {
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching miles data:', error);
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rowData = [
    { id: 1, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 },
    { id: 2, firstName: 'fds', lastName: 'sdf', gender: "M", distance: 3.75 },
    { id: 3, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 4.75 },
    { id: 4, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 5.75 },
    { id: 5, firstName: 'asdf', lastName: 'sdf', gender: "M", distance: 6.75 },
    { id: 6, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 },
    { id: 7, firstName: 'fds', lastName: 'sdf', gender: "M", distance: 3.75 },
    { id: 8, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 4.75 },
    { id: 9, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 5.75 },
    { id: 10, firstName: 'asdf', lastName: 'sdf', gender: "M", distance: 6.75 },
    { id: 11, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 },
    { id: 12, firstName: 'fds', lastName: 'sdf', gender: "M", distance: 3.75 },
    { id: 13, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 4.75 },
    { id: 14, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 5.75 },
    { id: 15, firstName: 'asdf', lastName: 'sdf', gender: "M", distance: 6.75 },
    { id: 16, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 },
    { id: 17, firstName: 'fds', lastName: 'sdf', gender: "M", distance: 3.75 },
    { id: 18, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 4.75 },
    { id: 19, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 5.75 },
    { id: 20, firstName: 'asdf', lastName: 'sdf', gender: "M", distance: 6.75 },
    { id: 31, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 },
    { id: 32, firstName: 'fds', lastName: 'sdf', gender: "M", distance: 3.75 },
    { id: 33, firstName: 'sdf', lastName: 'sdf', gender: "M", distance: 4.75 },
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFFFFF',
      color: "rgb(51, 51, 51, 0.5)",
    },
    [`&.${tableCellClasses.body}`]: {
      paddingTop: '8px',
      paddingBottom: '8px',
      fontFamily: 'Public Sans',
      fontWeight: 'bold',
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Box>

      <TableContainer component={Paper} sx={{ background: '#FFFFFF' }}>
        <Table>
          <TableHead >
            <TableRow>
              <StyledTableCell>Students Name</StyledTableCell>
              <StyledTableCell>Distance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow style={{ cursor: 'pointer' }} key={row.id} onClick={() => handleOpenDialog(`${row.firstName} ${row.lastName}`)}>
                <StyledTableCell width={350} >{`${row.firstName}  ${row.lastName}`}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ width: '5%', fontStyle: 'italic' }}>{row.distance}</div>
                    <div style={{ width: '95%' }}>
                      <LinearProgress sx={{
                        height: 15,
                        borderRadius: 5,
                        backgroundColor: "rgba(185,236,81,0.3)",
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          backgroundColor: '#B9EC51',
                        },
                      }} variant="determinate" value={row.distance} />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          sx={
            {
              float: 'right',
              '& .MuiPaginationItem-page': {
                color: '#A9A9A9'
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                color: '#000000', // Set your desired color here
                backgroundColor: '#B9EC51', // Set your desired color here
              },
            }
          }
          count={Math.ceil(rowData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
      <EditMilesDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </Box>
  );
}

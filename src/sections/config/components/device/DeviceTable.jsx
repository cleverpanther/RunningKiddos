import * as React from 'react';
import PropTypes from 'prop-types';

import { Paper, Table, Button, styled, TableRow, TableCell, TableHead, TableBody, Pagination, TableContainer ,tableCellClasses} from '@mui/material';

export function DeviceTable({ tableData, startIndex, endIndex, handleDelete, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage }) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFFFFF',
      color: "rgb(51, 51, 51, 0.5)",
    },
    [`&.${tableCellClasses.body}`]: {
      paddingTop:'8px',
      paddingBottom:'8px',
      fontFamily:'Public Sans',
      fontWeight: 'bold',
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ background: '#FFFFFF' }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Device Name</StyledTableCell>
            <StyledTableCell>Device Manufacturer</StyledTableCell>
            <StyledTableCell>Last Sync</StyledTableCell>
            <StyledTableCell>Version</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(startIndex, endIndex).map((row) => (
            <StyledTableRow key={row.uuid}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.manufacturer}</StyledTableCell>
              <StyledTableCell>{row.updateDate}</StyledTableCell>
              <StyledTableCell>{row.appVersion}</StyledTableCell>
              <StyledTableCell align='center'>
                <Button
                  sx={{
                    background: '#FFFFFF', 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        color: '#333333', 
                        fontFamily: 'PingFang SC Regular',
                        fontWeight: 'bold',
                        minWidth:'40px'
                  }}
                  onClick={() => handleDelete(row.uuid, row.name)}
                >
                  <img width={14} height={14} src="assets/Config_Devices/ban.png" alt="Logo" />
                </Button>
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
              color: '#000000',
              backgroundColor: '#B9EC51',
            },
          }
        }
        count={Math.ceil(tableData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

DeviceTable.propTypes = {
  tableData: PropTypes.array,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  handleDelete: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number
}

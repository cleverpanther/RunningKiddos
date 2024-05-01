import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import {Box, Paper,  Table, styled, TableRow, TableBody, TableCell,  TableHead, Pagination, TableContainer, tableCellClasses } from '@mui/material';

export function TabParticipation() {

      const sampleData = [
        {id: 1, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 2, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 3, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 4, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 5, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 6, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 7, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 8, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 9, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 10, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 11, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 12, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 13, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 14, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 15, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 16, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 17, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 18, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 19, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 20, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
        {id: 21, firstName: 'Hewitt', lastName: 'Claire', scoreSun:1.92, scoreMon:1.92, scoreTue:1.92, scoreWed:1.92, scoreThu:1.92, scoreFri:1.92, scoreSat:1.92, scoreTotal:1.92},
    ];

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowData, setRowData] = useState([sampleData])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FFFFFF',
        color: "rgb(51, 51, 51, 0.5)",
      },
      [`&.${tableCellClasses.body}`]: {
        paddingTop:'8px',
        paddingBottom:'8px',
        fontFamily:'Public Sans',
        fontSize: 14,
      },
    }));
    useEffect(() => {
      const fetchData = async () => {
        try {
          const groupId = localStorage.getItem("groupId")
          const programId = localStorage.getItem('programId');
          const token = localStorage.getItem('token');
        
          const response = await axios.get(
            `https://api.runningkiddos.com/api/LapEntries/getStudentMilesByGroupForClassSheet?groupId=${groupId}&programId=${programId}`,
            {
              headers: {
                Authorization: `${token}`
              }
            }
          );
  
          const students = response.data.table
          // const distance = response.data.totals.miles
         setRowData(students)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); // Include schoolId in the dependency array
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
          
          <TableContainer  component={Paper} sx={{background:'#FFFFFF'}}>
            <Table>
              <TableHead >
                <TableRow>
                  <StyledTableCell width={300}>Students Name</StyledTableCell>
                  <StyledTableCell width={120}>Sun</StyledTableCell>
                  <StyledTableCell width={120}>Mon</StyledTableCell>
                  <StyledTableCell width={120}>Tue</StyledTableCell>
                  <StyledTableCell width={120}>Wed</StyledTableCell>
                  <StyledTableCell width={120}>Thu</StyledTableCell>
                  <StyledTableCell width={120}>Fri</StyledTableCell>
                  <StyledTableCell width={120}>Sat</StyledTableCell>
                  <StyledTableCell align='right'>Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {rowData.slice(startIndex, endIndex).map((row) => (
                  <StyledTableRow key={row.id}>
                  <StyledTableCell width={300}>{`${row.firstName  }  ${  row.lastName}`}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreSun}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreMon}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreTue}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreWed}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreThu}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreFri}</StyledTableCell>
                  <StyledTableCell width={120}>{row.scoreSat}</StyledTableCell>
                  <StyledTableCell align='right' sx={{fontWeight:'bold'}}>{row.scoreTotal}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>      
            </Table>        
              <Pagination
                sx ={
                  {
                    float: 'right',
                    '& .MuiPaginationItem-page': {
                      color:'#A9A9A9'
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
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </TableContainer>
        </Box>
    );
}

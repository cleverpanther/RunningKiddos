import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import {Box, Paper,  Table, styled, TableRow, TableBody, TableCell,  TableHead, Pagination, TableContainer, tableCellClasses } from '@mui/material';

import AwardsDialog from '../dialog_components/AwardsDialog';

export function TabAwards() {
  const sampleData = [
    {id: 1, firstName: 'Hewitt', lastName: 'Claire', awards1: 1, awards3: 0, awards5: 0},
  ];
  
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowData, setRowData] = useState([sampleData])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [awardsData, setAwardsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };

    // const handleOpenDialog = async (student) => {
    //   setSelectedStudent(student);
    //   try {
    //     // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch awards data for the selected student
    //     // const response = await fetch(`YOUR_API_ENDPOINT/${student}`);
    //     // const data = await response.json();
    //     const data = [
    //       {id: 1, distance: '0 mi', name: 'Claire', earnd: 1, awarded: 0},
    //       {id: 2, distance: '1 mi', name: 'Claire', earnd: 0, awarded: 1},
    //       {id: 3, distance: '1 mi', name: 'Black White', earnd: 1, awarded: 0},
    //       {id: 4, distance: '5 mi', name: 'Toe Token', earnd: 1, awarded: 0},
    //     ];
    //     setAwardsData(data); // Assuming the API response is an array of awards data
    //     setDialogOpen(true);
    //   } catch (error) {
    //     console.error('Error fetching awards data:', error);
    //   }
    // };
  
    const handleCloseDialog = () => {
      setSelectedStudent(null);
      setDialogOpen(false);
    };
  
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const groupId = localStorage.getItem("groupId")
          const programId = localStorage.getItem('programId');
          const token = localStorage.getItem('token');
          
          console.log(programId)
          console.log(groupId)
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
         setAwardsData(students)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); // Include schoolId in the dependency array

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const getAwardsImage = (value) => {
      // Add your logic to determine the image URL based on the value
      if (value) 
          return 'assets/Class_School/prize2.png';
      return 'assets/Class_School/prize1.png';
  };

    return (
        <Box>
          
          <TableContainer  component={Paper} sx={{background:'#FFFFFF'}}>
            <Table>
              <TableHead >
                <TableRow>
                  <StyledTableCell>Students Name</StyledTableCell>
                  <StyledTableCell>Distance</StyledTableCell>
                  <StyledTableCell>1mi</StyledTableCell>
                  <StyledTableCell>3mi</StyledTableCell>
                  <StyledTableCell>5mi</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {rowData.slice(startIndex, endIndex).map((row) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell width={350}>{`${row.firstName  }  ${  row.lastName}`}</StyledTableCell>
                    <StyledTableCell>
                        <div style={{width: '5%', fontStyle:'italic'}}>{row.distance}</div>                    
                    </StyledTableCell>  
                    <StyledTableCell>
                      <img width={24} height={24} src={getAwardsImage(row.awards1)} alt="Awards1" />
                    </StyledTableCell>  
                    <StyledTableCell>
                      <img width={24} height={24} src={getAwardsImage(row.awards3)} alt="Awards3" />
                    </StyledTableCell>  
                    <StyledTableCell>
                      <img width={24} height={24} src={getAwardsImage(row.awards5)} alt="Awards5" />
                    </StyledTableCell>  
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
        {/* Render the AwardsDialog component */}
	      <AwardsDialog
	        open={dialogOpen}
	        onClose={handleCloseDialog}
	        studentName={selectedStudent}
	        awardsData={awardsData}
	      />
        </Box>
    );
}

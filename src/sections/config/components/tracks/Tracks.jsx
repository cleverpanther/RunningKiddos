import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Box, Paper, Table, Button, Select, TableRow, MenuItem, TableBody, TableHead, TextField, TableCell, Pagination, TableContainer } from '@mui/material';

import Text from '../Text';
import AddTrack from './AddTrack';
import TextSmall from '../Text_small';

export function Tracks() {
  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState([]);
  const [maxrow, setMaxrow] = useState(null);
  
  const units = [
    { value: 1, displayValue: 'mile' },
    { value: 2, displayValue: 'kilometer' },
    // Add more options as needed
  ];

  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  useEffect(() => {
    const courselist = JSON.parse(localStorage.getItem('courses'));
    console.log(courselist);
    setTableData(courselist);
    // fetchData();
  }, []);

  const handleAddRow = () => {
    const newId = Math.max(...tableData.map((row) => row.id), 0) + 1;
    setTableData([...tableData, { id: newId, name: '', distance: 0, unitId: 1, laps: 0, scanDelay: 0, createDate: Date(), updateDate: Date(), active: false }]);
    setEditingId(newId);
    setMaxrow(newId);
    setPage(Math.ceil((tableData.length + 1) / rowsPerPage));
  };

  const handleDelete = async (id) => {
    const apiUrl = `https://api.runningkiddos.com/api/Courses/${id}`;

      // Send a Delete request to update the track data
      await axios.delete(apiUrl,
        {
          headers: {
            Authorization: `${token}`
          },
        }
      )
      .then(response => {
        // Handle success
        alert('Successfully Deleted!');
        setMaxrow(maxrow - 1);
      })
      .catch(error => {
        // Handle error
        alert(error);
      });

    const updateTableData = tableData.filter((row) => row.id !== id);
    setTableData(updateTableData);
  };

  const handleEdit = (id) => {

    setEditingId(id);
  };

  const handleSave = async (id) => {
    try {
      const trackToUpdate = tableData.find((row) => row.id === id);
      let apiUrl;
    
      if (id === maxrow) {
        // If the ID matches maxrow, it means it's a new track, so use POST
        apiUrl = 'https://api.runningkiddos.com/api/Courses';
        delete trackToUpdate.id;
        console.log(trackToUpdate);
        await axios.post(apiUrl, trackToUpdate, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        // If the ID doesn't match maxrow, it means it's an existing track, so use PUT
        apiUrl = `https://api.runningkiddos.com/api/Courses/${id}`;
        trackToUpdate.updateDate = Date();
        await axios.put(apiUrl, trackToUpdate, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    
      console.log(trackToUpdate.id, trackToUpdate.name);
    } catch (error) {
      alert(error.message || 'An error occurred during the update.');
    } finally {
      alert('Successfully Updated!');
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = tableData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div style={{ paddingTop: '46px' }}>
      <Text s='40px' t='Tracks' />
      <TextSmall mt={4} mb={5} children='A course is a ‘track’ your students run (i.e., outside loop, gym, hallway). Create as many courses as needed. Simply name each course and enter the number of laps per mile/kilometer.
        Mileage information for your students automatically updates in the database. Scan Delay is the minimum time between each scan for an individual student. This prevents double scanning. Adjust the Scan Delay time as needed.' />
      <AddTrack handleAddRow={handleAddRow} />
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Name</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Distance</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Unit</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Laps</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Scan Delay</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(startIndex, endIndex).map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <TextField
                      value={row.name}
                      onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <TextField
                      type="number"
                      value={row.distance}
                      onChange={(e) => handleInputChange(row.id, 'distance', e.target.value)}
                    />
                  ) : (
                    row.distance
                  )}
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <Select
                      value={row.unitId}
                      onChange={(e) => handleInputChange(row.id, 'unitId', e.target.value)}
                    >
                      {units.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.displayValue}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    units.find((option) => option.value === row.unitId)?.displayValue
                  )}
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <TextField
                      type="number"
                      value={Math.round(1 / row.distance)}
                      onChange={(e) => handleInputChange(row.id, 'laps', e.target.value)}
                    />
                  ) : (
                    `${Math.round(1 / row.distance)} laps per ${units.find((option) => option.value === row.unitId)?.displayValue}`
                  )}
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <TextField
                      type="number"
                      value={row.scanDelay}
                      onChange={(e) => handleInputChange(row.id, 'scanDelay', e.target.value)}
                    />
                  ) : (
                    `${row.scanDelay} seconds`
                  )}
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {editingId === row.id ? (
                    <>
                      <Button
                        sx={{
                          background: '#B9EC51',
                          fontFamily: 'Public Sans',
                          width: '71px',
                          height: '30px',
                          borderRadius: '90px',
                          color: '#333333',
                          marginRight: '10px'
                        }}
                        onClick={() => handleSave(row.id)}
                      >
                      SAVE
                    </Button>
                    <Button
                        sx={{
                          background: '#B9EC51',
                          fontFamily: 'Public Sans',
                          width: '71px',
                          height: '30px',
                          borderRadius: '90px',
                          color: '#333333',
                        }}
                        onClick={handleCancel}
                      >
                      Cancel
                    </Button>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
                      <Button
                        sx={{
                          background: '#FFFFFF',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          color: '#333333',
                          fontFamily: 'PingFang SC Regular',
                          fontWeight: 'bold',
                          minWidth: '40px',
                        }}
                        onClick={() => handleEdit(row.id)}
                      >
                        <img width={16} height={14} src="assets/Config/Config_Tracks/edit.png" alt="Logo" />
                      </Button>
                      <Button
                        sx={{
                          background: '#FFFFFF',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          color: '#333333',
                          fontFamily: 'PingFang SC Regular',
                          fontWeight: 'bold',
                          minWidth: '40px',
                        }}
                        onClick={() => handleDelete(row.id)}
                      >
                        <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo" />
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          sx={{
            float: 'right',
            '& .MuiPaginationItem-page': {
              color: '#A9A9A9',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              color: '#000000',
              backgroundColor: '#B9EC51',
            },
          }}
          count={Math.ceil(tableData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

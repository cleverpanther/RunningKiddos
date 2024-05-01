import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import {Box } from '@mui/material';

import { DeviceInfo } from './DeviceInfo';
import { DeviceTable } from './DeviceTable';

export function Devices() {
  const schools = useSelector((state) => state.school.schools);
    const selectedSchoolRedux = useSelector((state) => state.school.selectedschool);
    const [tableData, setTableData] = useState([]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
          const response = await axios.get(`https://api.runningkiddos.com/api/Devices/?filter={"where":{"schoolId":"${  schoolid  }"}}`);
          console.log(response.data);
          setTableData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [selectedSchoolRedux, schools]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };

    const handleDelete = async (id, name) => {
      const token = localStorage.getItem('token');
      axios.delete(`https://api.runningkiddos.com/api/Devices/${id}`, {
        headers: {
          Authorization: `${token}`
        },
      })
        .then(response => {
          alert(`Device ${name} is deleted from DB.`);
        })
        .catch(error => {
          alert(error);
        });
      const updateTableData = tableData.filter((row) => row.uuid !== id);
      setTableData(updateTableData);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

  return (
    <Box style={{ paddingTop: '46px' }}>
      <DeviceInfo />
      <DeviceTable
        tableData={tableData}
        startIndex={startIndex}
        endIndex={endIndex}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
}

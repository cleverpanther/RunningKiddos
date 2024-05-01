import axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Text from '../Text';
// import ProgramRow from './ProgramRow';
import AddProgram from './AddProgram';
import TextSmall from '../Text_small';
import ProgramTable from './ProgramTable';
import ArchivedPrograms from './ArchivedPrograms';
// import ArchivedPrograms from './ArchivedPrograms';

export function Program() {
  const [programData, setProgramData] = useState([]);

  const schools = useSelector((state) => state.school.schools);
  const selectedSchoolRedux = useSelector((state) => state.school.selectedschool) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch program data
        const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
        const programResponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}/sessions`);
        setProgramData(programResponse.data);
 
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          // Do nothing for 404 errors
          // You can leave this block empty
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, [schools, selectedSchoolRedux]);

  const handleAddProgram = async () => {
    
    const data = {
      "name":'Mile',
      "schoolId":JSON.parse(localStorage.getItem('school'))[0].id,
      "startDate":new Date().toISOString().split('T')[0],
      "endDate":new Date().toISOString().split('T')[0],
      "createDate":new Date().toISOString().split('T')[0],
      "createUserId":localStorage.getItem('userid')
    }
    const response = await axios.post(`https://api.runningkiddos.com/api/sessions/initializeNewSession`, data);
    console.log('response :')
    console.log(response.data.id)
  
    // const newId = Math.max(...programData.map((row) => row.id), 0) + 1
    const newId = response.data.id

    // Add a new row to the state
    setProgramData([...programData, { id: newId, name: '', start: '', end: '', isArchived: false }]);
  };

  const handleSaved = async (selectedData) => {

    const token = localStorage.getItem("token");

    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": false,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }
    
    try{

      await axios.patch(`https://api.runningkiddos.com/api/sessions`,data , {headers:{Authorization: `${token}`}});

    }catch(error){
        console.log("error :")
        console.log(error)
    }
    
    // Handle delete action  
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': false } : row
    );
    setProgramData(newList);
  };

  const handleAchievedSaved = async (selectedData) =>{

    const token = localStorage.getItem("token");
    
    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": true,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    await axios.patch(`https://api.runningkiddos.com/api/sessions`, data , {headers:{Authorization: `${token}`}});
    // Handle delete action  
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'name': selectedData.name } : row
    );
    setProgramData(newList);
  };

  const handleAchieved = async (selectedData) => {
    // Handle delete action  

    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": true,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    const token = localStorage.getItem("token");
    await axios.patch(`https://api.runningkiddos.com/api/sessions`,data , {headers:{Authorization: `${token}`}});
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': true } : row
    );
    setProgramData(newList);
  };

  const handleUnachieved = async (selectedData) => {
    // Handle delete action  
    const token = localStorage.getItem("token");

    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": false,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    await axios.patch(`https://api.runningkiddos.com/api/sessions`,data , {headers:{Authorization: `${token}`}});
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': false } : row
    );
    setProgramData(newList);
  };

  const handleDelete = async (id) => {
    // Handle delete action
    const token = localStorage.getItem("token");
    await axios.delete(`https://api.runningkiddos.com/api/sessions/${id}`,{headers:{Authorization: `${token}`}});

    const updateTableData = programData.filter((row) => row.id !== id);
    setProgramData(updateTableData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = programData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setProgramData(updatedRows);
  };

  return (
    <div style={{ paddingTop: '46px' }}>
      <Text t='Program' s='40px' />
      <TextSmall mt={4} mb={5} children='To create a program, simply give it a name and provide dates for the period of time in which data will be collected.
        (Sample names: Noon Hour Mileage Club or Morning Miles.) Program names and dates may be changed at a later time.' />
      <AddProgram handleAddProgram={handleAddProgram} />
      <ProgramTable programData={programData} handleInputChange={handleInputChange} handleSaved={handleSaved} handleAchieved={handleAchieved} handleDelete={handleDelete} />
      <Text t='Archieved Programs' s='40px' />
      <TextSmall mt={4} mb={5} children='Archived Programs are preserved records of past data.
        Archived data is not editable - you cannot scan, change, or delete data. Contact support if you need to make changes.' />
      <ArchivedPrograms programData={programData} handleInputChange={handleInputChange} handleAchievedSaved={handleAchievedSaved} handleUnachieved={handleUnachieved} />
    </div>
  );
}

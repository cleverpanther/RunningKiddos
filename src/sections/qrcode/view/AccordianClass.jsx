// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import * as React from 'react';
import { useState , useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import { Table, Paper, Button, TableRow, Accordion, TextField, TableBody, TableHead, TableCell, Typography, TableContainer,AccordionDetails, AccordionSummary } from '@mui/material';

export default function AccordianClass() {
  const [accordionList, setAccordionList] = useState([]);
  const [customUser, setCustomUser] = useState();

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [checkedNum, setCheckedNum] = useState([]);
  // const newArray = new Array();
  const [, setNewArrayofPeople] = useState([]);

  const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = (await axios.get(`https://api.runningkiddos.com/api/schools/${schoolid}/customUsers`)).data
        setCustomUser(user[0])

        const response = await axios.get(
          `https://api.runningkiddos.com/api/Schools/${schoolid}/groups`,
          {
            params: {
              filter: '{"where":{"isClassroom": true}}',
            },
          }
        );
  
        const accordionData = response.data;
        // console.log("response :")
        // console.log(response.data);
  
        // Fetch student data for each accordion
        const accordionWithStudents = await Promise.all(
          accordionData.map(async (accordion) => {
            const studentResponse = await axios.get(
              `https://api.runningkiddos.com/api/Groups/${accordion.id}/studentList`
            );
            // console.log(studentResponse.data);
            return {
              ...accordion,
              students: studentResponse.data,
            };
          })
        );
  
        setAccordionList(accordionWithStudents);
        console.log(accordionWithStudents[0].students[0].id); // Log the updated state instead

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [schoolid]); // Include schoolid in the dependency array
  // const [checkNum, setCheckNum] = useState(Array(accordionList.length).fill(null)); 

  const handleSave = async (selectedData) => {
    alert("save")
    const token = localStorage.getItem("token");
    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "grade": selectedData.grade,
      "isClassroom": selectedData.isClassroom,
      "isGrade": selectedData.isGrade,
      "isActive": selectedData.isActive,
      "deactivateDate": selectedData.deactivateDate,
      "sortOrder": selectedData.sortOrder,
      "programId": selectedData.programId,
      "id": selectedData.id
    }
    console.log(data)
    try{

      await axios.patch(`https://api.runningkiddos.com/api/groups/${selectedData.id}`, data , {headers:{Authorization: `${token}`}});

    }catch(error){

      console.log("Class Save Error :")
      console.log(error)
    }
    
    setAccordionList((prevList) => {
      const newList = [...prevList];
      newList[selectedData.id].isEditing = false;
      return newList;
    });
  };

  const handleCancel = (index) => {
    setAccordionList((prevList) => {
      const newList = [...prevList];
  
      if (newList[index].isEditing) {
        // If the accordion is being edited, close the edit mode only
        newList[index].isEditing = false;
      } else {
        // If the accordion is not being edited, remove it
        newList.splice(index, 1);
      }
  
      return newList;
    });
  };

  const handleExpand = (index) => {
    // Expand the clicked accordion and collapse others
    setAccordionList((prevList) => {
      const newList = prevList.map((accordion, i) => ({
        ...accordion,
        isExpanded: i === index ? !accordion.isExpanded : false,
      }));
      return newList;
    });
  };

  const handleChecked = (row_id) => {
    
    
    setCheckedNum((prevArray) => [...prevArray, row_id]);
    const resultArray = Object.values(accordionList).flatMap((classPeople) => 
      classPeople.students.filter((person) => checkedNum.includes(person.id))
    );
    
    setNewArrayofPeople(resultArray);
    
    let checkedIds = []
    if(localStorage.getItem("checkedStudents") === '')
    {
      checkedIds.push(row_id)
    }else{
      checkedIds = JSON.parse(localStorage.getItem("checkedStudents"))
      alert(checkedIds.length)
      if(!checkedIds.includes(row_id))
      {
        console.log("pushed!  ")
        checkedIds.push(row_id)
      }
    }

    localStorage.setItem("checkedStudents", JSON.stringify(checkedIds))
  };

  return (
    <div>
      {accordionList.map((accordion, index) => (
        <Accordion
          key={index}
          expanded={accordion.isExpanded}
          sx={{ marginBottom: '10px', backgroundColor: '#F8F8FA', width:'900px' }} // Customize the style here
          onChange={() => {}}
        >
          <AccordionSummary
            aria-controls={`panel-content-${index}`}
            id={`panel-header-${index}`}
          >
            <div style={{width:'100%', margin:'15px 30px 15px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column'}}>                  
                    <Typography sx={{
                    fontFamily:'Public Sans',
                    fontSize: '24px',
                    color:'#333333',
                    fontWeight:'bold'
                    }}>{accordion.name}</Typography>
                </div>
                <div style={{display:"flex", justifyContent:'space-between', alignItems:'left'}}>
                    <Button 
                    sx={{backgroundColor:'#FFFFFF', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}
                    onClick={() => handleExpand(index)}>
                    {accordion.isExpanded ? <img width={18} height={10}  src='assets/Config_Classes/up.png' alt='Edit'/> : <img width={18} height={10}  src='assets/Config_Classes/down.png' alt='Edit'/>}
                    </Button>
                </div>                
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {accordion.isEditing ? (
              <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                <TextField
                    label="Name"
                    value={accordion.name}
                    onChange={(e) =>
                      setAccordionList((prevList) => {
                        const newList = [...prevList];
                        newList[index].name = e.target.value;
                        return newList;
                      })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Teacher"
                    value={customUser.firstName + customUser.lastName}
                    onChange={(e) =>
                      setAccordionList((prevList) => {
                        const newList = [...prevList];
                        newList[index].teacher = e.target.value;
                        return newList;
                      })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Grade"
                    value={accordion.grade}
                    onChange={(e) =>
                      setAccordionList((prevList) => {
                        const newList = [...prevList];
                        newList[index].grade = e.target.value;
                        return newList;
                      })
                    }
                    fullWidth
                  />
                </div>
                <div>                  
                  <Button
                    sx={{
                      marginTop: '20px',
                      background: '#B9EC51', 
                      width: '150px', 
                      height: '40px', 
                      borderRadius: '30px', 
                      color: '#333333', 
                      fontFamily: 'Public Sans',
                      marginRight:'20px'
                    }}
                    onClick={() => handleSave(accordion)}>
                      Create Class
                  </Button>
                  <Button
                    sx={{
                      marginTop: '20px',
                      background: '#97B9FF', 
                      width: '100px', 
                      height: '40px', 
                      borderRadius: '30px', 
                      color: '#333333', 
                      fontFamily: 'Public Sans'
                    }}
                    onClick={() => handleCancel(index)}>
                      Cancel
                  </Button>
                  </div>
              </div>
            ) : (
              <div>                
                <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', maxHeight: '400px'}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>First Name</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Last Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accordion.students.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                              {row.firstName}
                          </TableCell>
                          <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                              {row.lastName}
                          </TableCell>
                          <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                            <Checkbox {...label} onClick={() => handleChecked(row.id)}/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
              </div>
              
            )}
          </AccordionDetails>
        </Accordion>
      ))}     
    </div>
  );
}

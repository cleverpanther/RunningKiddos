import axios from 'axios';
import * as React from 'react';
import { useState , useEffect } from 'react';

import { Table, Paper, Button, TableRow, Accordion, TextField, TableBody, TableHead, TableCell, Typography, TableContainer,AccordionDetails, AccordionSummary } from '@mui/material';

export function Classes() {
  const [accordionList, setAccordionList] = useState([]);
  const [customUser, setCustomUser] = useState();

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
        console.log("response :")
        console.log(response.data);
  
        // Fetch student data for each accordion
        const accordionWithStudents = await Promise.all(
          accordionData.map(async (accordion) => {
            const studentResponse = await axios.get(
              `https://api.runningkiddos.com/api/Groups/${accordion.id}/studentList`
            );
  
            return {
              ...accordion,
              students: studentResponse.data,
            };
          })
        );
  
        setAccordionList(accordionWithStudents);
        console.log(accordionWithStudents); // Log the updated state instead
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [schoolid]); // Include schoolid in the dependency array

  const addAccordion = () => {
    // Collapse all accordions
    const updatedList = accordionList.map((accordion) => ({
      ...accordion,
      isExpanded: false,
    }));

    // Add a new accordion
    setAccordionList([
      ...updatedList,
      {
        textfield1: '',
        textfield2: '',
        isEditing: true,
        isExpanded: true,
      },
    ]);
  };

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

  const handleEdit = (index) => {
    setAccordionList((prevList) => {
      const newList = [...prevList];
      newList[index].isEditing = true;
      newList[index].isExpanded = true;
      return newList;
    });
  };

  const handleDelete = (index) => {
    setAccordionList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1); // Remove the Accordion
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
            {accordion.isEditing ? (
              <div style={{width:'100%', margin:'15px 30px 15px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Typography style={{
                    fontFamily:'Public Sans', 
                    fontSize:'14px',
                    color:'rgb(51, 51, 51, 0.6)'
                }}>
                    Please provide a name for this class. 
                    This is the name that will be displayed on the class sheet and all printed material. 
                    Examples: &ldquo;First Grade&ldquo;, &ldquo;Mrs. Smith Fourth Grade&ldquo;, or &ldquo;First Hour Physical Education&ldquo;.
                </Typography>
                <Button onClick={() => handleExpand(index)}>
                  {accordion.isExpanded ? 'Collapse' : 'Expand'}
                </Button>
              </div>
            ) : (
              <div style={{width:'100%', margin:'15px 30px 15px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column'}}>                  
                  <Typography sx={{
                    fontFamily:'Public Sans',
                    fontSize: '24px',
                    color:'#333333',
                    fontWeight:'bold'
                  }}>{accordion.name}</Typography>
                  <div style={{display:'flex', flexDirection:'row', marginTop:'10px'}}>
                    <div style={{display:'flex', flexDirection:'row', marginRight:'30px'}}>
                      <img width={18} height={18} src='assets/Config/Config_Classes/teacher.png' alt="Teacher"/>
                      <Typography sx={{lineHeight:'18px', fontSize:'14px', color:'rgb(0, 0, 0, 0.4)'}}>Teacher: {customUser.firstName + customUser.lastName}</Typography>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', marginRight:'30px'}}>
                      <img width={18} height={18} src='assets/Config/Config_Classes/grade.png' alt="Teacher"/>
                      <Typography sx={{lineHeight:'18px', fontSize:'14px', color:'rgb(0, 0, 0, 0.4)'}}>Grade: {accordion.grade}</Typography>
                    </div>
                  </div>
                </div>
                <div style={{width:'18%', display:"flex", justifyContent:'space-between', alignItems:'center'}}>
                  <Button 
                    sx={{backgroundColor:'#FFFFFF', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}
                    onClick={() => handleEdit(index)}>
                    <img width={18} height={18} src='assets/Config/Config_Classes/edit.png' alt='Edit'/>
                  </Button>
                  <Button 
                    sx={{backgroundColor:'#FFFFFF', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}
                    onClick={() => handleDelete(index)}>                  
                    <img width={18} height={18}  src='assets/Config/Config_Classes/ban.png' alt='Edit'/>
                  </Button>
                  <Button 
                    sx={{backgroundColor:'#FFFFFF', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}
                    onClick={() => handleExpand(index)}>
                    {accordion.isExpanded ? <img width={18} height={10}  src='assets/Config/Config_Classes/up.png' alt='Edit'/> : <img width={18} height={10}  src='assets/Config/Config_Classes/down.png' alt='Edit'/>}
                  </Button>
                </div>                
              </div>
            )}
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
                <div>
                  <Button
                      sx={{
                        marginTop: '20px',
                        background: '#B9EC51', 
                        width: '180px', 
                        height: '40px', 
                        borderRadius: '30px', 
                        color: '#333333', 
                        fontFamily: 'Public Sans'
                      }}
                    >
                      Copy/Paste Students
                    </Button>
                  <Button
                      sx={{
                        marginTop: '20px',
                        background: '#B9EC51', 
                        width: '180px', 
                        height: '40px', 
                        borderRadius: '30px', 
                        color: '#333333', 
                        fontFamily: 'Public Sans'
                      }}
                    >
                      Add Students
                    </Button>
                </div>                
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
      <Button
          sx={{
            marginTop: '20px',
            background: '#B9EC51', 
            width: '180px', 
            height: '40px', 
            borderRadius: '30px', 
            color: '#333333', 
            fontFamily: 'Public Sans'
          }}
          onClick={addAccordion}>
          <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{marginRight: '6px'}}/>
            Add Class
        </Button>
              
    </div>
  );
}

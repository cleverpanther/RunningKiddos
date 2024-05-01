import axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react';

import {List, Paper, Table, Button, Select,Popover, ListItem, TableRow, MenuItem, TableBody, TableHead, TextField, TableCell, Typography, TableContainer  } from '@mui/material';

export function Awards() {
  // ------Awards------//
    const [awardsData, setAwardsData] = useState([]);

    const schools = useSelector((state) => state.school.schools);
    const selectedProgramRedux = useSelector((state) => state.school.selectedschool) || 1;

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItemsList, setSelectedItemsList] = useState([]);
    const [itemsList, setItemList] = useState(['Item1', 'Item2', 'Item3']); // Define your items here

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch program data
          const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
          const awardResponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}/incentives`);
          setAwardsData(awardResponse.data);

          const awardLevelsResponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}/incentiveTiers`);
          setLevelData(awardLevelsResponse.data);
   
        } catch (error) {
          console.log("error")
          console.log(error)
          if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            // Do nothing for 404 errors
            // You can leave this block empty
          } else {
            console.error('Error fetching data:', error);
          }
        }
      };
    
      fetchData();
    }, [schools, selectedProgramRedux]);

    const handleAddAwardsData = async () => {
      try {
        // Send a request to create a new row with no name
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'https://api.runningkiddos.com/api/incentives',
          { name: '' }, // You can adjust the payload based on your API requirements
          { headers: { Authorization: `${token}` } }
        );
    
        // Assuming the server responds with the created row data, update the state
        setAwardsData((prevData) => [...prevData, response.data]);
        // setAwardsData((prevData) => [...prevData, response.data])
      } catch (error) {
        console.error('Error adding award:', error);
      }
    };

    const handleDeleteAwardsData = async (id) => {
 
      const token = localStorage.getItem("token");
      await axios.delete(`https://api.runningkiddos.com/api/incentives/${id}`, {headers:{Authorization: `${token}`}});

      // Handle delete action
      const updateTableData = awardsData.filter((row) => row.id !== id);
      setAwardsData(updateTableData);
    };

    const handleSaveAwardsData = async (id) => {
      try {
        const token = localStorage.getItem('token');
        const rowToSave = awardsData.find((row) => row.id === id);
    
        // Check if the row exists and has a valid name (you can add more validations)
        if (rowToSave && rowToSave.name.trim() !== '') {
          // Assuming you have an API endpoint to update the award by ID
          await axios.put(`https://api.runningkiddos.com/api/incentives/${id}`, rowToSave, {
            headers: { Authorization: `${token}` }
          });
    
          // Optionally, you can fetch the updated data after saving
          const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
          const updatedAwardsResponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}/incentives`);
          setAwardsData(updatedAwardsResponse.data);
        } else {
          // Handle the case where the row data is not valid
          console.error('Invalid row data. Cannot save.');
        }
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    const handleAwardsDataInputChange = (id, field, value) => {
    
      const updatedRows = awardsData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      setAwardsData(updatedRows);
    };

    // --------Awards Level----------------//

    const [levelData, setLevelData] = useState([
      { id: 1, unit: 1, distance: 2, certificate:1, awards: '1'},
      { id: 2, unit: 1, distance: 2, certificate:2, awards: '1'},
      { id: 3, unit: 1, distance: 2, certificate:1, awards: '1'},
      // Add more initial rows as needed
    ]);

    const units = [
      { value: 1, displayValue: 'mi' },
      { value: 2, displayValue: 'cm' },
      { value: 3, displayValue: 'm' },
      // Add more options as needed
    ];

    const certificates = [
      { value: 1, displayValue: 'No Certificate' },
      { value: 2, displayValue: 'White' },
      { value: 3, displayValue: 'Black' },
      // Add more options as needed
    ];

    const handleAddLevelData =  () => {

      // Generate a unique ID for the new row
      const newId = Math.max(...levelData.map((row) => row.id), 0) + 1;

      // Add a new row to the state
      setLevelData([...levelData, { id: newId, unit: 1, distance:0, certificate:1, awards:''}]);
    };
    
    const handleDeleteLevelData = async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`https://api.runningkiddos.com/api/incentiveTiers/${id}`, {headers:{Authorization: `${token}`}});
      // Handle delete action
      const updateTableData = levelData.filter((row) => row.id !== id);
      setLevelData(updateTableData);
    };
    
    const handleLevelDataInputChange = (id, field, value) => {
      const updatedRows = levelData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      setLevelData(updatedRows);
    };

    const handleButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleItemSelect = (item) => {
      setSelectedItemsList((prevList) => [...prevList, item]);
      setItemList((prevList) => prevList.filter((i) => i !== item));
      // setSelectedItem('');
      setAnchorEl(null); // Close the popover when an item is selected
    };
  
    const handleRemoveButton = (item) => {
      setSelectedItemsList((prevList) => prevList.filter((i) => i !== item));
      setItemList((prevList) => [...prevList, item]);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div style={{paddingTop: '46px'}}>
          <Typography sx={{fontSize:'40px', width:'148px', height:'18px', fontFamily:'Public Sans', fontWeight: 'Bold', color: '#333333', lineHeight: '18px'}}>Awards</Typography>        
          <Typography mt={4} mb ={1} sx={{
              width:'1038px', 
              height:'18px', 
              fontSize:'14px', 
              fontFamily:'Public Sans', 
              fontWeight: '500', 
              color:'rgb(51, 51, 51, 0.6)', 
              lineHeight: '18px',
              textAlignL: 'justify'
              }}>
            Add the names of the awards used in this program.
            </Typography>
          <Button 
            sx={{
              marginTop: '20px',
              marginBottom: '0px',
              background: '#B9EC51', 
              width: '180px', 
              height: '40px', 
              borderRadius: '30px', 
              color: '#333333', 
              fontFamily: 'PingFang SC-Bold'
            }}
            onClick={handleAddAwardsData}
          >
            <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{marginRight: '6px'}}/>
            ADD AWARDS
          </Button>

          <TableContainer component={Paper} sx={{backgroundColor:'#FFFFFF'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}> </TableCell>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {awardsData.map((row) => (
                  <TableRow key={row.id}>
                  <TableCell sx={{backgroundColor:'#F8F8FA', width:'100px', align:'center', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                    <img width={20} src="assets/Config/Config_Awards/prize.png" alt="Logo" style={{marginRight: '6px'}}/>
                  </TableCell>
                  <TableCell sx={{backgroundColor:'#F8F8FA', width:'350px', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                      <TextField
                        value={row.name}
                        onChange={(e) => handleAwardsDataInputChange(row.id, 'name', e.target.value)}
                        sx={{
                          '& .MuiInputBase-root': {
                            // Your custom styles for the input base
                            height: '40px',
                            width: '200px',
                            background: '#FFFFFF'
                          },
                        }}
                      />
                  </TableCell>
                  <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                      <div style={{display:'flex', flexDirection:'row', width:'90px', justifyContent:'space-between'}}>
                        <Button                       
                          sx={{
                            background: '#FFFFFF', 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%', 
                            color: '#333333', 
                            fontFamily: 'PingFang SC Regular',
                            fontWeight: 'bold',
                            minWidth:'40px'
                          }}
                          onClick={() => handleSaveAwardsData(row.id)}
                        >
                          <img width={18} height={18} src="assets/Config/Config_Program/save.png" alt="Logo"/>
                        </Button>
                        <Button                       
                          sx={{
                            background: '#FFFFFF', 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%', 
                            color: '#333333', 
                            fontFamily: 'PingFang SC Regular',
                            fontWeight: 'bold',
                            minWidth:'40px'
                          }}
                          onClick={() => handleDeleteAwardsData(row.id)}
                        >
                          <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo"/>
                        </Button>
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h3' sx={{marginTop: '20px'}}>Awards Levels</Typography>
        <Typography
          sx={{
            width: '1038px',
            fontSize: '14px',
            fontFamily: 'PingFang SC-Medium',
            fontWeight: 500,
            color: '#333333',
            opacity: 0.6
          }}
        >
          Click on ‘Select Award’ to add the Awards you entered. Use the dropdown to select a 
          Certificate.Black and White certificates are unlimited.
        </Typography>
        <Button 
          sx={{
            marginTop: '20px',
            background: '#B9EC51', 
            width: '240px', 
            height: '40px', 
            borderRadius: '30px', 
            color: '#333333', 
            fontFamily: 'PingFang SC-Bold'
          }}
          onClick={handleAddLevelData}
        >
          <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{marginRight: '6px'}}/>
          ADD AWARDS LEVELS
        </Button>
        <TableContainer component={Paper} sx={{backgroundColor:'#FFFFFF'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Units</TableCell>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Distance to Achieve</TableCell>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Certificates</TableCell>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Awards</TableCell>
                  <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levelData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{backgroundColor:'#F8F8FA', width:'100px', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                      <Select
                        value={row.unit}
                        onChange={(e) => handleLevelDataInputChange(row.id, 'unit', e.target.value)}
                      >
                        {units.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.displayValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell sx={{backgroundColor:'#F8F8FA', width:'200px', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                        <TextField
                          type='number'
                          value={row.name}
                          onChange={(e) => handleAwardsDataInputChange(row.id, 'distance', e.target.value)}
                        />
                    </TableCell>
                    <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                      <Select
                        value={row.certificate}
                        onChange={(e) => handleLevelDataInputChange(row.id, 'certificate', e.target.value)}
                      >
                        {certificates.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.displayValue}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                      {selectedItemsList.map((selecteditem) => (
                        <b style={{
                          backgroundColor:'#FFFFFF',
                        }} >
                          {selecteditem}   
                          <Button                       
                            sx={{
                              background: '#B9EC51 ', 
                              width: '25px', 
                              height: '35px',  
                              color: '#333333', 
                              fontFamily: 'PingFang SC Regular',
                              fontWeight: 'bold',
                              minWidth:'35px',
                              marginLeft: '8px',
                              marginRight: '8px'
                            }}
                            onClick={() => handleRemoveButton(selecteditem)}
                          >
                            <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo"/>
                          </Button>
                        </b>
                      ))}
                      
                      <Button variant="outlined" 
                        sx={{
                          backgroundColor:'#FFFFFF', 
                          borderBottom:'none',
                          color:'#000000',
                          borderColor:'#FFFFFF'
                        }} 
                          onClick={handleButtonClick}
                        >
                        Select Award
                      </Button>

                      <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <List>
                          {itemsList.map((item) => (
                            <ListItem button key={item} onClick={() => handleItemSelect(item)}>
                              {item}
                            </ListItem>
                          ))}
                        </List>
                      </Popover>
                    </TableCell>  
                    <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
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
                          onClick={() => handleDeleteLevelData(row.id)}
                        >
                          <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo"/>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
    );
}

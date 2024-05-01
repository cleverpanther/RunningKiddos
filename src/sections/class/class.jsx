import axios from 'axios';
import React, { useState, useEffect } from "react";

import ClassTitle from 'src/sections/class/components/ClassTitle';
import TotalDistance from 'src/sections/class/components/TotalDistance';
import ClassSelector from 'src/sections/class/components/ClassSelector';
import AddMilesButton from 'src/sections/class/components/AddMilesButton';

import CustomTab from "./components/CustomTab";
import AddMilesDialog from './components/dialog_components/AddMilesDialog';

export default function Class() {
    const [classData, setClassData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [classTitle, setClassTitle] = useState(''); 
    const [openAddMilesDialog, setOpenAddMilesDialog] = useState(false);

    const schoolData = JSON.parse(localStorage.getItem('school'));
    const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id : null;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://api.runningkiddos.com/api/Schools/${schoolId}/groups`,
              {
                params: {
                  filter: '{"where":{"isClassroom": true}}',
                },
              }
            );
    
            setClassData(response.data);
            const courses = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/courses`);
            setCourseData(courses.data);

        
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [schoolId]); // Include schoolId in the dependency array

    const handleClassTitleChange = (value) => {
        setClassTitle(classData.filter((row) => row.id === value).at(0).name);
        localStorage.setItem("groupId", value)
    }
    console.log(courseData.length);
    const handleAddMilesClick = () => {
        setOpenAddMilesDialog(true);
    };

    const handleAddMilesDialogClose = () => {
        setOpenAddMilesDialog(false);
    };

    const handleSaveMiles = (selectedOption, input1Value, input2Value) => {
        const newValue = `${selectedOption} - ${input1Value} - ${input2Value}`;
        console.log(newValue);
    };

    return (
        <div className='main_1'>   
            {courseData !== undefined && courseData.length > 0 && (
                <AddMilesDialog open={openAddMilesDialog} handleClose={handleAddMilesDialogClose} onSave={handleSaveMiles} courseData={courseData} />
            )}
            
            <div className='main_2'>
                <div style={{ width: '70%', display: 'flex', flexDirection: 'row' }}>
                    <ClassSelector classData={classData} handleClassTitleChange={handleClassTitleChange} />
                    <AddMilesButton onClick={handleAddMilesClick} />
                </div>
            </div>
            <div className='main_3'>
                <ClassTitle title={classTitle} />
                <TotalDistance distance={16.345} />
            </div>
            <CustomTab/>
        </div>
    );
}
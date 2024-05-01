import axios from 'axios';
import * as React from 'react';
// import { useSelector } from 'react-redux';  

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import MyRadioGroup from './MyRadioGroup';
import AccordianClass from './AccordianClass';
import { HEADER } from '../../../layouts/dashboard/config-layout';


const steplist = {
  steps_1: ['Choose QR Size', 'Choose Labeling Options', 'Choose Who to Print', 'Generate'],
  steps_2: ['Choose QR Size', 'Choose Who to Print', 'Select the Class'],
};

const optionlist = {
  step1: [
    { value: '1', label: 'Business Card size' },
    { value: '2', label: '2x2' },
  ],
  step2: [
    { value: '3', label: 'School' },
    { value: '4', label: 'Class Name' },
    { value: '5', label: 'Grade' },
  ],
  step3: [
    { value: '6', label: 'All Students' },
    { value: '7', label: 'Students by Class' },
    { value: '8', label: 'Individual Students' },
  ],
};

const descriptions = ['Note: Placing the grade and teacher on a QR code could make the card inaccurate for future years.', 'You need to sync the devices before scanning so that new QR codes are valid.'];

const buttonTextMap = {
  '1': 'Choose Labeling Option',
  '2': 'Choose Who to Print',
  '6': 'Print All Students',
  '7': 'Choose The Class',
  '8': 'Choose Individual Students',
};

let selectedStudents;
let selectedFormat;

const QRCodeView = () => {
  const lgUp = useResponsive('up', 'lg');
  const SPACING = 30;

  const schoolId = JSON.parse(localStorage.getItem('school'))[0].id;
  const schoolName = JSON.parse(localStorage.getItem('school'))[0].name;
  const token = localStorage.getItem('token')
  const programId = localStorage.getItem("programId")
  // const selectedSchoolRedux = useSelector((state) => state.school.selectedschool) || 1;

  const [selectedValue, setSelectedValue] = React.useState('1');
  const [activeStep, setActiveStep] = React.useState(0);
  const [radioOptions, setRadioOptions] = React.useState(optionlist.step1);
  const [description, setDescription] = React.useState('');
  const [steptitle, setStepTitle] = React.useState('Choose QR Size');
  const [steps, setSteps] = React.useState(steplist.steps_1);
  const [skipped, setSkipped] = React.useState(new Set());
  const [ButtonText, setButtonText] = React.useState('Choose Labeling Option');
  const [showRadioGroup, setShowRadioGroup] = React.useState(true);

  const isStepSkipped = (step) => skipped.has(step);

  const updateStepValues = (options, title, desc, value, buttonText) => {
    setRadioOptions(options);
    setStepTitle(title);
    setDescription(desc);
    setSelectedValue(value);
    setButtonText(buttonText);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (selectedValue === '1') {
      updateStepValues(optionlist.step2, steplist.steps_1[1], descriptions[0], '3', 'Choose Who to Print');
      selectedFormat = ("2x5")
    } else if (selectedValue === '2') {
      updateStepValues(optionlist.step3, steplist.steps_1[2], '', '6', 'Print All Students');
      selectedFormat = ("2x2")
    } else if (['3', '4', '5'].includes(selectedValue)) {
      updateStepValues(optionlist.step3, steplist.steps_1[2], '', '6', 'Print All Students');
    } else if (selectedValue === '6') {
      updateStepValues([], 'Print All Students', descriptions[1], '', 'Download All Students');
      const filterParam = {"where":{"programId":programId,"endDate":null},"include":[{"relation":"group"},{"relation":"student","scope":{"order":["firstName asc","lastName asc"]}}],"order":"groupId desc"}
      const studentList = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/studentGroups`,{
        params:{
          headers: {
            Authorization: `${token}`
          },
          filter:filterParam
        }
      });

      selectedStudents = studentList.data.map((one) => ({
            id: one.studentId,
            class: one.group.name,
            firstName: one.student.firstName,
            grade: one.group.grade,
            group: one.group.name,
            groupId: one.group.id,
            lastName: one.student.lastName,
            school: schoolName,
            schoolId: one.schoolId
          })
      )

    } else if (['7', '8'].includes(selectedValue)) {
      if(selectedValue === '8'){

        setShowRadioGroup(false);
        const checkedStudents = JSON.parse(localStorage.getItem("checkedStudents")) 
        console.log("checked list po :")
        console.log(checkedStudents)
        const filterParam = {"where":{"programId":programId,"endDate":null},"include":[{"relation":"group"},{"relation":"student","scope":{"order":["firstName asc","lastName asc"]}}],"order":"groupId desc"}
        const studentList = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/studentGroups`,{
          params:{
            headers: {
              Authorization: `${token}`
            },
            filter:filterParam
          }
        });
  
        // const selectedStudents1 = studentList.data.map((one) => {
        //   if (checkedStudents.includes(one.group.id)) {
          
        //     return {
        //       id: one.studentId,
        //       class: one.group.name,
        //       firstName: one.student.firstName,
        //       grade: one.group.grade,
        //       group: one.group.name,
        //       groupId: one.group.id,
        //       lastName: one.student.lastName,
        //       school: schoolName,
        //       schoolId: one.schoolId
        //     }
        //   }
        //     return null
        // }
        // )
        const selectedStudents1 = studentList.data.find((element) => checkedStudents.includes(element.group.id))
        console.log(selectedStudents1)
        
        console.log(selectedStudents1)
        console.log(selectedStudents)

      } else {
        setShowRadioGroup(true);
      }
      updateStepValues([], 'Select the Class', descriptions[1], '', 'Generate');
      const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
      const response = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}/groups`, { params: { filter: '{"where":{"isClassroom": true}}' } });
      const ClassItems = response.data;
      const ClassRadioText = ClassItems.map((classitem, index) => ({ value: (9 + index).toString(), label: classitem.name, id: classitem.id}));
      setRadioOptions(ClassRadioText);
    }else
    {
      downloadQR()  
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleChange = async (event) => {
    setSelectedValue(event.target.value);

    if (event.target.value === '1' || event.target.value === '2') {
      setSteps(steplist[`steps_${event.target.value}`]);
    } else if(event.target.value <=8 ){
      setSteps(steplist.steps_1)

    }else{
      // setSteps(steplist.steps_1)
      const index = event.target.value - 8 
      const selectedindex = radioOptions[index].id

      const filterParam = {"where":{"programId":programId,"endDate":null},"include":[{"relation":"group"},{"relation":"student","scope":{"order":["firstName asc","lastName asc"]}}],"order":"groupId desc"}
      const studentList = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/studentGroups`,{
        params:{
          headers: {
            Authorization: `${token}`
          },
          filter:filterParam
        }
      });

      selectedStudents = studentList.data.map((one) => {
        if (one.group.id === selectedindex) {
          return {
            id: one.studentId,
            class: one.group.name,
            firstName: one.student.firstName,
            grade: one.group.grade,
            group: one.group.name,
            groupId: one.group.id,
            lastName: one.student.lastName,
            school: schoolName,
            schoolId: one.schoolId
          }
        }
        return []
      }
      )
     }

    setButtonText(buttonTextMap[event.target.value] || 'Choose Labeling Option');
  };

  const handleReset = () => {
    setActiveStep(0);
    setRadioOptions(optionlist.step1);
    setStepTitle(steplist.steps_1[0]);
    setDescription(descriptions[0]);
    setSelectedValue('1');
    setSteps(steplist.steps_1);
    setShowRadioGroup(true);
  };

  const downloadQR = async () =>
  {
    console.log("download items :")
    console.log(selectedStudents)
      const data = {format:selectedFormat, students:selectedStudents}
      await axios.post(`https://rql8wk4tb9.execute-api.us-east-1.amazonaws.com/prod/qr`, data, {
        headers: {
          Authorization: `${token}`
        },
      })     
      // eslint-disable-next-line no-shadow
      .then(response => {
        const link = document.createElement('a');
        link.href = `https://s3.amazonaws.com/hadron-final-pdfs/${response.data.filename}`;
        link.setAttribute('download', 'file.pdf'); // or any other filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error fetching the PDF: ', error);
        // Handle error appropriately
      });
      
      selectedStudents = []
      localStorage.setItem("checkedStudents", "")
  }

  return (
    <Box
      sx={{
        marginTop: `${HEADER.H_MOBILE + SPACING}px`,
        marginBottom: '20px',
        background: '#FFFFFF',
        borderRadius: '20px',
        opacity: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...(lgUp && {
          px: 2,
          paddingTop: '29px',
          paddingLeft: '41px',
        }),
      }}
    >
      <Box lg={5} sm={12} sx={{ justifyContent: 'space-around' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            width: '339px',
            fontSize: '14px',
            fontFamily: 'PingFang SC, PingFang SC',
            fontWeight: '500',
            color: '#333333',
            lineHeight: '18px',
          }}
        >
          <Typography
            sx={{
              marginTop: '60px',
              fontSize: '30px',
              fontFamily: 'PingFang SC, PingFang SC',
              fontWeight: 'bold',
              color: '#333333',
              lineHeight: '18px',
            }}
          >{steptitle}</Typography>
          <Typography
            sx={{
              width: '339px',
              fontSize: '14px',
              fontFamily: 'PingFang SC, PingFang SC',
              fontWeight: '500',
              color: '#333333',
              lineHeight: '18px',
              marginTop: '20px',
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Conditional rendering based on showRadioGroup state */}
        {showRadioGroup ? (
          <Box sx={{ marginTop: '25px' }}>
            <MyRadioGroup
              options={radioOptions}
              selectedValue={selectedValue}
              onChange={handleChange}
            />
          </Box>
        ) : (
          <AccordianClass />
        )}

        {activeStep === steps.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              onClick={handleNext}
              sx={{
                width: '288px',
                height: '40px',
                marginLeft: '10px',
                background: '#97B9FF',
                color: '#333333',
                borderRadius: '90px',
              }}
            >
              {activeStep === steps.length - 1 ? `${ButtonText}` : `STEP ${activeStep + 2} : ${ButtonText}`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QRCodeView;

import axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

import Text from '../Text';
import Field from './Field';
import Common from './Common';
import UnitDistance from './Unit';
import Selector from './Selector';
import SubmitButton from './SubmitButton';

const StateList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carollina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];

const StateListLibre = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NG", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AB", "BC", "MB", "NB", "NL", "BT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"];

export function School() {
  const [State, setState] = React.useState('1');
  const [Unit, setUnit] = React.useState('1');
  const [schoolData, setSchoolData] = React.useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    enrolled: 0,
    defaultUnitId: 1,
    createDate: Date(),
    updateDate: Date(),
    ezTally1Id: null,
    migrateWizardDismissDate: null,
    id: '',
    acceptedTOS: '',
  });

  const schools = useSelector((state) => state.school.schools);
  const selectedProgramRedux = useSelector((state) => state.school.selectedschool) || 1;

  const StatehandleChange = (event) => {
    setState(event.target.value);
    handleInputChange('state', event.target.value);
  };

  const UnithandleChange = (event) => {
    setUnit(event.target.value);
    handleInputChange('defaultUnitId', event.target.value);
  };

  const handleInputChange = (field, value) => {
    setSchoolData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
        console.log(selectedProgramRedux);
        const response = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolid}`);
        const { data } = response;
        console.log(data);

        // Set the school data in the state
        setSchoolData({
          name: data.name || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          enrolled: data.enrolled || '',
          defaultUnitId: data.defaultUnitId || '',
          createDate: data.createDate,
          updateDate: data.updateDate,
          ezTally1Id: data.ezTally1Id,
          migrateWizardDismissDate: data.migrateWizardDismissDate,
          id: data.id,
          acceptedTOS: data.acceptedTOS
        });

        // Set the selected state and unit based on the fetched data
        setState(data.state);
        setUnit(data.defaultUnitId || 1);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchSchoolData();
  }, [schools, selectedProgramRedux]);

  return (
    <Box sx={{ paddingTop: '46px', paddingLeft: '0px' }}>
      <Text s='40px' t='School Profile' />
      <Grid container spacing={3} sx={{ marginTop: '30px' }}>
        <Grid lg={5} sm={12}>
          <Text s='16px' t='School Name*' m='0 0 5px 0' />
          <Field schoolData={schoolData} fieldName='name' handleInputChange={handleInputChange} size='650px' />
        </Grid>
        <Common lg={7} />
        <Grid lg={5} sm={12}>
          <Text s='16px' t='Address*' m='0 0 5px 0' />
          <Field schoolData={schoolData} fieldName='address' handleInputChange={handleInputChange} size='650px' />
        </Grid>
        <Common lg={7} />
        <Grid sx={{ width: '670px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Grid lg={1.5} sm={12} >
            <Text s='16px' t='City' m='0 0 5px 0' />
            <Field schoolData={schoolData} fieldName='city' handleInputChange={handleInputChange} size='200px' />
          </Grid>
          <Grid lg={1.5} sm={12}>
            <Text s='16px' t='State' m='0 0 5px 0' />
            <Selector i={State} handle={StatehandleChange} StateList={StateList} StateListLibre={StateListLibre} />
          </Grid>
          <Grid lg={1.5} sm={12}>
            <Text s='16px' t='Zip Code' m='0 0 5px 0' />
            <Field schoolData={schoolData} fieldName='zip' handleInputChange={handleInputChange} size='200px' />
          </Grid>
        </Grid>
        <Common lg={7} />
        <Grid sx={{ width: '670px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Grid lg={2.2} sm={12}>
            <Text s='16px' t='(Optional) # of Enrolled Students' m='0 0 5px 0' />
            <Field schoolData={schoolData} fieldName='enrolled' handleInputChange={handleInputChange} size='310px' />
          </Grid>
          <Grid lg={2.2} sm={12}>
            <Text s='16px' t='Default Unit' m='0 0 5px 0' />
            <UnitDistance i={Unit} handle={UnithandleChange} />
          </Grid>
        </Grid>
        <Grid lg={4} sm={12}>
          <Typography sx={{ fontSize: '16px', fontFamily: 'Public Sans', fontWeight: 'bold' }}> </Typography>
        </Grid>
        <Grid lg={10} sm={12}>
          <SubmitButton onClick={onsubmit} />
        </Grid>
      </Grid>
    </Box>
  );
}

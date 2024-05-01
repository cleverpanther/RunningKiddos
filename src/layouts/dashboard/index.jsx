import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [courses, setcourses] = useState();
  const [program, setprogram] = useState([]);
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userid');
        const response = await axios.get(`https://api.runningkiddos.com/api/CustomUsers/${userId}/schools`);
    
        if (response.data.length > 0) {
          const schoolId = response.data[0].id;
          localStorage.setItem('school', JSON.stringify(response.data));
          const courseresponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/courses`, {
            headers: {
              Authorization: `${token}`
            },
          });
    
          setcourses(courseresponse.data);
          localStorage.setItem('courses', JSON.stringify(courseresponse.data));
          const programresponse = await axios.get(`https://api.runningkiddos.com/api/Schools/${schoolId}/sessions`, {
            headers: {
              Authorization: `${token}`
            },
          });
          console.log(program)
          console.log(courses)
          console.log(programresponse.data);
          setprogram(programresponse.data);
        } else {
          console.error("No schools found.");
        }
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchSchoolData();
  }, [program, courses]);
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} programs={program} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

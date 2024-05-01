import { Helmet } from 'react-helmet-async';

import { Class } from 'src/sections/class';

// ----------------------------------------------------------------------

export default function AppPage() {

  if (localStorage.getItem("username") === null || localStorage.getItem("username") === undefined)
  {
    window.location.href = "/login";
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Running Kiddos</title>
      </Helmet>

      <Class />
    </>
  );
}


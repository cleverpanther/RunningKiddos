import { Helmet } from 'react-helmet-async';

import { ConfView } from 'src/sections/config/view';

// ----------------------------------------------------------------------

export default function ConfPage() {
  return (
    <>
      <Helmet>
        <title> Config | Running Kiddos </title>
      </Helmet>

      <ConfView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import { QRCodeView } from 'src/sections/qrcode/view';

// ----------------------------------------------------------------------

export default function QRCodePage() {
  return (
    <>
      <Helmet>
        <title> QRCode | Minimal UI </title>
      </Helmet>

      <QRCodeView />
    </>
  );
}

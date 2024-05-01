import React from 'react';
import PropTypes from 'prop-types';

function YourComponent({ nav }) {
  switch (nav.title) {
    case 'class':
      return <div>Class</div>;
    case 'qrcode':
      return <div>Qrcode</div>;
    case 'config':
      return <div>Config</div>;
    default:
      return <div>Unknown Title</div>; // Handle default case
  }
}
YourComponent.propTypes = {
    nav: PropTypes.object
}
export default YourComponent;

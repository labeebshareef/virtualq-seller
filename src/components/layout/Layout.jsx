import React from 'react';

import PropTypes from 'prop-types';

import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';

const Layout = ({component}) => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        {component}
      </div>
    </div>
  );
};
Layout.propTypes = {
  component: PropTypes.any.isRequired,
};
export default Layout;

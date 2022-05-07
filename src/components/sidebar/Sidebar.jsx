import React, {useState, useEffect} from 'react';

import './sidebar.css';
import {
  LineStyle,
  PermIdentity,
} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

/**
 * @return {Component} sidebar.
 */
export default function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  useEffect(() => {
  }, []);
  const filter = (e, filterId) => {
    setActive(filterId);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <li
            // className="sidebarListItem "
              className={`sidebarListItem ${active === 0 ? 'active' : ''}`}
              onClick={(e) => {
                navigate('/appointment');
                filter(e, 0);
              }}>
              <LineStyle className="sidebarIcon" />
              Appointment
            </li>

            <li className={`sidebarListItem ${active === 1 ? 'active' : ''}`}
              onClick={(e) => {
                navigate('/timeslot');
                filter(e, 1);
              }}>
              <PermIdentity className="sidebarIcon" />
              Timeslots
            </li>

          </ul>
        </div>


      </div>
    </div>
  );
}

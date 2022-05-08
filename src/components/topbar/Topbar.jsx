import React, {useState} from 'react';
import IconButton from '@mui/material/Button';
import './topbar.css';
import {Person} from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useSnackbar} from 'react-simple-snackbar';
import {logout} from '../../APIServices';
import {useNavigate} from 'react-router-dom';

/**
 * @return {Component} topbar.
 */
export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const successHandler = (response) => {
    localStorage.clear();
    navigate('/');
  };
  const errorHandler = async (response) => {
    openSnackbar(response.error.response.data.message);
    // dispatch(showHideLoader(false));
  };
  const handleLogout = () => {
    logout(successHandler, errorHandler);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo-sidebar">
            <span className='logo-main-sidebar'>VirtualQ </span>
            <span className='logo-sub-sidebar'>Seller</span>
          </div>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}

          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Person/>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

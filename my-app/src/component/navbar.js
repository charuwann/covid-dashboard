import "../styles/Navbar.css";
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

function Navbar({handleChange, selectDate, periodMonth}) {
  return (
    <>
    <div className="navbar">
      <div className="nav-content">
        <div className="navbar-body">
          <p className="navbar-body-topic">COVID-19 Thailand</p>
          <p className="navbar-body-sub">แสดงสถิติรายวันสถานการณ์โรคติดเชื้อไวรัสโคโรนา 2019 ในประเทศไทย อ้างอิงข้อมูลจากรายงานของกรมควบคุมโรค</p>
        </div>
        <div>
          <TextField className="navbar-select-date" select size="small" value={periodMonth} onChange={handleChange}>
            {
              selectDate.map(item => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))
            }
          </TextField>
        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar;
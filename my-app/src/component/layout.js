import Navbar from "./navbar";
import AirportData from "./airportData";
import CurrentCase from "./currentCase";
import PUIdata from "./PUIdata";

import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';

export const CovidResponse = createContext();
const headers = {
  "Access-Control-Allow-Credentials": true
}

function Layout() {
  const [data, setData] = useState();
  const api = 'http://localhost:3080/covid';
  const handleGetData = async() => {
    const response = await axios(api);
    if (response.status === 200) {
      const result = response.data.results.reverse()
      setData(result)
    }
  }

  useEffect(() => {
    handleGetData();
  }, [])

  const [periodMonth, setPeriodMonth] = useState('01');
  const selectDate = [
    {value:'01', label: 'มกราคม'},
    {value:'02', label: 'กุมภาพันธ์'},
    {value:'03', label: 'มีนาคม'},
    {value:'04', label: 'เมษายน'},
    {value:'05', label: 'พฤษภาคม'},
    {value:'06', label: 'มิถุนายน'},
    {value:'07', label: 'กรกฎาคม'},
    {value:'08', label: 'สิงหาคม'},
    {value:'09', label: 'กันยายน'},
    {value:'10', label: 'ตุลาคม'},
    {value:'11', label: 'พฤศจิกายน'},
    {value:'12', label: 'ธันวาคม'},
  ]

  const handleChange = (event) => {
    setPeriodMonth(event.target.value);
  };
  return (
    <div>
      <Navbar 
        handleChange={handleChange}
        selectDate={selectDate}
        periodMonth={periodMonth}
      />
      <CovidResponse.Provider value={{data , periodMonth}}>
        <div className="layout">
          <CurrentCase />
          <PUIdata/>
          <AirportData />
        </div>
      </CovidResponse.Provider>
    </div>
  );
}

export default Layout;
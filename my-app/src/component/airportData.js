import "../styles/AirportData.css"
import React, { useEffect, useState, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import {CovidResponse} from "./layout";

function AirportData() {
  const response = useContext(CovidResponse);
  const [periodDate, setPeriodDate] = useState('01');
  const [dataAirport, setDataAirport] = useState([]);  
  const [totalAirlinePUI, setTotalAirlinePUI] = useState();
  const [totalAir, setTotal] = useState();
  const [totalBKKAirportPUI, setTotalBKKAirportPUI] = useState();
  const [totalDMKAirportPUI, setTotalDMKAirportPUI] = useState();
  const [totalHKTAirportPUI, setTotalHKTAirportPUI] = useState();
  const [totalCNXAirportPUI, setTotalCNXAirportPUI] = useState();
  const [totalURTAirportPUI, setTotalURTAirportPUI] = useState();
  const [totalUBPAirportPUI, setTotalUBPAirportPUI] = useState();
  const [totalUTPAirportPUI, setTotalUTPAirportPUI] = useState();
  const [totalUTHAirportPUI, setTotalUTHAirportPUI] = useState();
  const [date, setDate] = useState();

  const series = [
    {"name": "สนามบินทั้งหมด", "data": totalAirlinePUI},
    {"name": "สนามบินสุวรรณภูมิ", "data": totalBKKAirportPUI},
    {"name": "สนามบินดอนเมือง", "data": totalDMKAirportPUI},
    {"name": "สนามบินภูเก็ต", "data": totalHKTAirportPUI},
    {"name": "สนามบินเชียงใหม่", "data": totalCNXAirportPUI},
    {"name": "สนามบินสุราษฎร์ธานี", "data": totalURTAirportPUI},
    {"name": "สนามบินอุบลราชธานี", "data": totalUBPAirportPUI},
    {"name": "สนามบินอู่ตะเภา", "data": totalUTPAirportPUI},
    {"name": "สนามบินอุดรธานี", "data": totalUTHAirportPUI},
  ]

  const chartOptions = {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: date
    }
  }
  
  useEffect(() => {
    setDataAirport(response?.data?.filter((item, index) => item.publishdate.split('-')[1] === response?.periodMonth))
  }, [periodDate, response])

  useEffect(() => {
    setDate(dataAirport?.map(item => item.publishdate))
    setTotal(dataAirport?.slice(-1)[0]?.totalAirlinePUI || 0)
    setTotalAirlinePUI(dataAirport?.map(item => item.totalAirlinePUI))
    setTotalBKKAirportPUI(dataAirport?.map(item => item.totalBKKAirportPUI))
    setTotalDMKAirportPUI(dataAirport?.map(item => item.totalDMKAirportPUI))
    setTotalHKTAirportPUI(dataAirport?.map(item => item.totalHKTAirportPUI))
    setTotalCNXAirportPUI(dataAirport?.map(item => item.totalCNXAirportPUI))
    setTotalURTAirportPUI(dataAirport?.map(item => item.totalURTAirportPUI))
    setTotalUBPAirportPUI(dataAirport?.map(item => item.totalUBPAirportPUI))
    setTotalUTPAirportPUI(dataAirport?.map(item => item.totalUTPAirportPUI))
    setTotalUTHAirportPUI(dataAirport?.map(item => item.totalUTHAirportPUI))
  }, [dataAirport])
  

  return (
    <div className="airport-data">
      <div className="airport-data-topic">
        <p style={{fontSize: '30px',fontWeight: 900}}>จำนวนผู้ป่วยที่มีอาการตามนิยามพบที่สนามบิน(สะสม)</p>
      </div>
      <div className="airport-data-topic" style={{gab: '50px'}}>
        <ReactApexChart className="airport-chart" type="line" series={series} options={chartOptions} width={'100%'} height={400} />
        <div className="airport-data-total">  
        <h3 className="total-topic">ยอดสะสมรวม</h3>
        <h1 className="total-text">{totalAir}</h1>
        </div>
      </div>
    </div>
  );  
}

export default AirportData;
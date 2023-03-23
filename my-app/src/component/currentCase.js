import "../styles/CurrentCase.css";
import React, { useEffect, useState, useContext } from "react";
import { CovidResponse } from "./layout";
import ReactApexChart from "react-apexcharts";

function CurrentCase() {
  const response = useContext(CovidResponse);
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [totalCases, setTotalCases] = useState();
  const [totalRecovered, setTotalRecovered] = useState();
  const [totalDeaths, setTotalDeaths] = useState();
  const [totalTests, setTotalTests] = useState();
  const [totalScreening, setTotalScreening] = useState();
  const [totalRecoveredPerDay, setTotalRecoveredPerDay] = useState();
  const [totalDeathsPerDay, setTotalDeathsPerDay] = useState();
  
  const chartOptions = {
    chart: {
      height: 280,
      width: "50%",
      type: "area",
      fontFamily: 'sans-serif'
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: date,
      labels: {
        style: {
          fontSize: '10px',
        },
      }
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#EC7063', '#45B39D'],
    noData: {
      text: "no data",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '60px',
        fontFamily: undefined
      }
    }
  }

  const series = [
    {"name": "จำนวนผู้เสียชีวิต", "data": totalDeathsPerDay},
    {"name": "จำนวนผู้หายป่วย", "data": totalRecoveredPerDay},
  ]

  useEffect(() => {
    setData(response?.data?.filter((item, index) => item.publishdate.split('-')[1] === response?.periodMonth))
  }, [response])

  useEffect(() => {
    setTotalCases(data?.slice(-1)[0]?.totalCases || "no data")
    setTotalRecovered(data?.slice(-1)[0]?.totalRecovered || "no data")
    setTotalTests(data?.slice(-1)[0]?.totalTests || "no data")
    setTotalScreening(data?.slice(-1)[0]?.totalScreening || "no data")
    setTotalDeaths(data?.slice(-1)[0]?.totalDeaths || "no data")
    setDate(data?.map(item => item?.publishdate || 0 ))
    setTotalRecoveredPerDay(data?.map(item => item.newRecovered || 0))
    setTotalDeathsPerDay(data?.map(item => item.newDeaths  || 0))
  }, [data])

  const CardCustom = ({topic, content}) => {
    return (
      <>
        <p className={`topic-case`}>
          {topic}
        </p>
        <p className={`sub-topic-case`}>
          {content}
        </p>
      </>
    )
  }

  return (
    <div>
    <div className="current-case">
      <div className="current-case-content">
        <div className="current-case-content-l">
          <div className="current-case-content-l-c-t infomation">
            <CardCustom topic="จำนวนคัดกรอง" content={totalScreening}/>
          </div>
          <div className="current-case-content-l-c-b">
            <div className="infomation">
              <CardCustom topic="ตรวจแล้ว" content={totalTests}/>
            </div>
            <div className="infomation">
              <CardCustom topic="ผู้ป่วยยืนยัน" content={totalCases}/>
            </div>
          </div>
        </div>
        <div className="current-case-content-r">
          <div className="death">
            <CardCustom topic="จำนวนผู้เสียชีวิต" content={totalDeaths} status="death"/>
          </div>
          <div className="alive">
            <CardCustom topic="จำนวนผู้หายป่วย" content={totalRecovered} status="alive"/>
          </div>
        </div>
      </div>
    </div>
    <div className="current-case-body">
      <div className="current-case-chart-content">
        <ReactApexChart series={series} options={chartOptions} width={"100%"} height={400} />
      </div>
    </div>
    </div>
  );
}

export default CurrentCase;
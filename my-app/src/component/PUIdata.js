import "../styles/PUIdata.css";
import React, { useEffect, useState, useContext } from "react";
import {CovidResponse} from "./layout";
import ReactApexChart from "react-apexcharts";

function PUIdata() {
  const response = useContext(CovidResponse);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataTotalMonthly, setDataTotalMonthly] = useState();
  const [totalHospitalPUI, setTotalHospitalPUI] = useState();

  useEffect(() => {
    const result = response?.data?.filter((item, index) => item.publishdate.split('-')[1] === response?.periodMonth)
    const getLastData = result?.slice(-1)[0]
    setDataTotalMonthly(getLastData?.totalPUI || 0)
    setTotalHospitalPUI(getLastData?.totalHospitalPUI || 0)
    setDataMonthly([
      getLastData?.totalAirlinePUI || 0,
      getLastData?.totalAirlinesAndShipsPUI || 0,
      getLastData?.totalShipPUI || 0,
      getLastData?.totalOtherPUI || 0,
    ])
  }, [response])

  const options = {
    series: [
      {
        name: "Radar Series 1",
        data: dataMonthly
      },
    ],
    labels: [
      'พบที่สนามบิน',
      'พบที่ช่องทางเข้าออกประเทศ',
      'พบที่ท่าเรือ',
      'อื่นๆ'
    ],
    stroke: {
      show: true,
      width: 2,
      colors: [],
      dashArray: 0
    }
  }
  return (
    <div className="pui-data">
      <div className="pui-data-body">
        <p className="pui-topic">จำนวนผู้ป่วยเข้าเกณฑ์ PUI (สะสม)</p>
        <div className="piu-content">
          <div className="piu-data-total-c">
            <div className="piu-data-total">  
              <h3 className="piu-total-topic">ยอดสะสมรวม</h3>
              <h1 className="piu-total-content">{dataTotalMonthly}</h1>
            </div>
            <div className="piu-data-total-2">  
              <h3 className="piu-total-topic-2">เข้าโรงพยาบาลด้วยตนเอง</h3>
              <h1 className="piu-total-content-2">{totalHospitalPUI}</h1>
            </div>
          </div>
          <div className="piu-data-chart">
            <ReactApexChart  type="radar" series={options.series} options={options} width={'100%'} height={600} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PUIdata;
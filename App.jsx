import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

  function App() {
    const [sensorVals, setSensorVals] = useState({
    sensor1: null,
    sensor2: null,
    sensor3: null,
  });
  
    const getSensorValues = async () => {
      try {
      const fetchTemperatureValue1 = await fetch(
      "https://api.waziup.io/api/v2/devices/bootstrap/sensors/TC/values"
      );
      const fetchTemperatureValue2 = await fetch(
      "https://api.waziup.io/api/v2/devices/bootstrap/sensors/TC2/values"
      );
      const fetchTemperatureValue3 = await fetch(
      "https://api.waziup.io/api/v2/devices/bootstrap/sensors/TC3/values"
      );
      
      const res1 = await fetchTemperatureValue1.json();
      const res2 = await fetchTemperatureValue2.json();
      const res3 = await fetchTemperatureValue3.json();
      
        setSensorVals({
        sensor1: res1[0].value,
        sensor2: res2[0].value,
        sensor3: res3[0].value,
      });
      } catch (error) {
      console.log(error);
    }
  };
  
    useEffect(() => {
    getSensorValues();
  });
  
  return (
  <>
  <h1>React Waziup Application</h1>
  <div className="card">
  <div className="row p-2">
  <div class="col-sm-4">
  <h2>Sensor 1</h2>
  <p id="t1">
  {sensorVals.sensor1 ? `${sensorVals.sensor1}` : "---"} &deg;C
  </p>
  </div>
  <div className="col-sm-4">
  <h2>Sensor 2</h2>
  <p id="t2">
  {sensorVals.sensor2 ? `${sensorVals.sensor2}` : "---"} &deg;C
  </p>
  </div>
  <div className="col-sm-4">
  <h2>Sensor 3</h2>
  <p id="t3">
  {sensorVals.sensor3 ? `${sensorVals.sensor3}` : "---"} &deg;C
  </p>
  </div>
  </div>
  </div>
  </>
  );
}

export default App;

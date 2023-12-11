// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshClick = () => {
    fetchData();
  };

  return (
    <div className="App">
      <h1>Spectrum Status</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <div className="gaugeContainer">
            <div className="gaugeItem">
              <h2>Velocity</h2>
              <ReactSpeedometer
                maxValue={150}
                value={data.velocity}
                needleColor="blue"
                startColor="lightblue"
                segments={10}
                endColor="darkblue"
                height={200}
                width={300}
              />
            </div>
            <div className="gaugeItem">
              <h2>Altitude</h2>
              <ReactSpeedometer
                maxValue={50000}
                value={Math.abs(data.altitude)}
                needleColor="green"
                startColor="lightgreen"
                segments={10}
                endColor="darkgreen"
                height={200}
                width={300}
              />
            </div>
            <div className="gaugeItem">
              <h2>Temperature</h2>
              <ReactSpeedometer
                maxValue={50}
                value={Math.abs(data.temperature)}
                needleColor="red"
                startColor="orange"
                segments={10}
                endColor="darkred"
                height={200}
                width={300}
              />
            </div>
          </div>
          <p>
            <b>Status Message:</b> {data.statusMessage}
          </p>
          <p>
            <b>Is Ascending:</b> {data.isAscending ? "Yes" : "No"}
          </p>
          <p>
            <b>Is Action Required:</b> {data.isActionRequired ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
      <button onClick={handleRefreshClick}>Refresh Status</button>
    </div>
  );
}

export default App;

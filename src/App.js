import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [scanResult, setScanResult] = useState([]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success);

    function success(result) {
      console.log("Success");
      //push result to array
      setScanResult((prev) => [...prev, result]);
    }
    return () => {
      scanner.clear().catch((e) => {
        console.error("Failed to clear html5QrcodeScanner. ", e);
      });
    };
  }, []);

  useEffect(() => {
    console.log("scanResult", scanResult);
  }, [scanResult]);

  return (
    <div className="App ">
      <h1>QR Code Scanner in React</h1>
      <div>
        <div
          id="reader"
          style={{
            maxWidth: "350px",
            margin: "0 auto",
          }}
        ></div>
        {scanResult && (
          <div
            className="scan-result"
            style={{
              maxWidth: "350px",
              margin: "0 auto",
            }}
          >
            <h2>Scan Result</h2>

            <ResultContainerPlugin results={scanResult} />
          </div>
        )}
        {/* <div>
        <button onClick={() => scanner.start()}>Start</button>
        <button onClick={() => scanner.stop()}>Stop</button>
      </div> */}
      </div>
    </div>
  );
}

export default App;

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i] !== results[i - 1]) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainerTable = ({ data }) => {
  const results = filterResults(data);
  return (
    <table className={"Qrcode-result-table"}>
      <thead>
        <tr>
          <td>#</td>
          <td>Decoded Text</td>
        </tr>
      </thead>
      <tbody>
        {results.map((a, i) => {
          
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{a}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);
  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({results.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

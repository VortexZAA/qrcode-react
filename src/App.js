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

  return (
    <div className="App ">
      <h1>QR Code Scanner in React</h1>
      <div>
        <div
          id="reader"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        ></div>
        {scanResult && (
          <div className="scan-result">
            <h2>Scan Result</h2>

            <p>
              {scanResult.map((a,index) => (
                <div key={index}>
                  <p>{index+1}. - {a}</p>
                </div>
              ))}
            </p>
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

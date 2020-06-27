import React, { useState, useEffect } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Form from './components/Form';

import Installments from './components/Installments';

function App() {
  const [value, setValue] = useState(0);
  const [swearTax, setSwearTax] = useState(0);
  const [time, setTime] = useState(0);
  const [installments, setInstallmenst] = useState([]);
  useEffect(() => {
    let installments = [];
    for (let i = 1; i <= time; i++) {
      const composeSwearTax = Math.pow(1 + swearTax / 100, i);
      const mouthTotalValue = value * composeSwearTax;
      const mouthSwearValue = mouthTotalValue - value;
      installments.push({
        id: i,
        mouthTotalValue,
        mouthSwearValue,
        composeSwearTax: composeSwearTax - 1,
      });
    }
    setInstallmenst(installments);
  }, [value, swearTax, time]);

  return (
    <div className="container">
      <h1>React Juros composto</h1>
      <div className="row">
        <div className="col c4">
          <input
            type="number"
            id="initialValue"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="col c4">
          <input
            type="number"
            name=""
            id="swearTax"
            step="0.1"
            onChange={(event) => setSwearTax(event.target.value)}
          />
        </div>
        <div className="col c4">
          <input
            type="number"
            name=""
            id="time"
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Installments
          value={installments}
          isNegative={swearTax < 0 ? true : false}
        />
      </div>
    </div>
  );
}

export default App;

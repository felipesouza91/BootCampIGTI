import React from 'react';

import './style.css';

function Installment({ value, isNegative }) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    signDisplay: '',
  });
  const formatterPercent = Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 2,
    signDisplay: 'always',
  });
  return (
    <div className="result-container">
      <div className="id-container">
        <span>{value.id}</span>
      </div>
      <div
        className="info-name"
        style={{ color: isNegative ? 'red' : 'green' }}
      >
        <span>{formatter.format(value.mouthTotalValue)}</span>
        <span>
          {isNegative
            ? `${formatter.format(value.mouthSwearValue)}`
            : `+ ${formatter.format(value.mouthSwearValue)}`}
        </span>
        <span>
          {isNegative
            ? `${formatterPercent.format(value.composeSwearTax)}`
            : `+ ${formatterPercent.format(value.composeSwearTax)}`}
        </span>
      </div>
    </div>
  );
}

export default Installment;

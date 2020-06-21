import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import './App.css';
import { calculateSalaryFrom } from './helper/salary';
import { formatNumber, formatNumberPercent } from './helper/format-helper';
import InputFullSalary from './component/InputFullSalary';
import InputReadOnly from './component/InputReadOnly';
import ProgressBarSalary from './component/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: null,
    };
  }

  handleSalaryInput = (fullSalary) => {
    this.setState({
      fullSalary,
    });
  };

  calculatePercernt = (fullSalary, discountINSS, discountIRPF, netSalary) => {
    if (fullSalary === null) {
      return { percentINSS: 0, percentIPRF: 0, percentNetSalary: 0 };
    }
    const percentINSS = (discountINSS / fullSalary) * 100;
    const percentIPRF = (discountIRPF / fullSalary) * 100;
    const percentNetSalary = (netSalary / fullSalary) * 100;
    return { percentINSS, percentIPRF, percentNetSalary };
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);
    const {
      percentINSS,
      percentIPRF,
      percentNetSalary,
    } = this.calculatePercernt(
      fullSalary,
      discountINSS,
      discountIRPF,
      netSalary
    );
    return (
      <div className="container">
        <h1>React Salário</h1>
        <div className="row">
          <div className="input-salary">
            <InputFullSalary
              labelText="Salário Bruto"
              onSalaryInput={this.handleSalaryInput}
              value={fullSalary}
            />
          </div>
        </div>
        <div className="row">
          <div className="results-inputs">
            <InputReadOnly
              labelText="Base INSS"
              value={`${formatNumber(baseINSS)}`}
            />
            <InputReadOnly
              labelText="Desconto INSS"
              value={`${formatNumber(discountINSS)} (${formatNumberPercent(
                percentINSS
              )})`}
              color="#e67e22"
            />
            <InputReadOnly
              labelText="Base IRPF"
              value={`${formatNumber(baseIRPF)}`}
            />
            <InputReadOnly
              labelText="Desconto IRPF"
              value={`${formatNumber(discountIRPF)} (${formatNumberPercent(
                percentIPRF
              )})`}
              color="#c0392b"
            />
          </div>
        </div>
        <div className="row">
          <div style={{ width: '350px' }}>
            <InputReadOnly
              labelText="Salario Liquido"
              value={`${formatNumber(netSalary)} (${formatNumberPercent(
                percentNetSalary
              )})`}
              color="#16a085"
            />
          </div>
        </div>
        <div className="row bar-container">
          <ProgressBarSalary value={percentINSS} color="#e67e22" />
          <ProgressBarSalary value={percentIPRF} color="#c0392b" />
          <ProgressBarSalary value={percentNetSalary} color="#16a085" />
        </div>
      </div>
    );
  }
}

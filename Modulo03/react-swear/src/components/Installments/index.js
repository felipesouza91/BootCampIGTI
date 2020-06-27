import React from 'react';
import Installment from '../Installment';
// import { Container } from './styles';

function Installments({ value, isNegative }) {
  return value.map((item) => (
    <Installment key={item.id} value={item} isNegative={isNegative} />
  ));
}

export default Installments;

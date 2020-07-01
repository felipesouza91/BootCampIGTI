import React, { useEffect } from 'react';

import './App.css';
import { getAllGrades } from './service/api';

function App() {
  useEffect(() => {
    async function getInfo() {
      const response = await getAllGrades();
      
      console.log(response);
    }
    getInfo();
  });

  return <div></div>;
}

export default App;

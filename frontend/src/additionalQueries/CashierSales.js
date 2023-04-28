import React, { useState } from 'react';
import axios from 'axios';

function CashierSales() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cashierSales, setCashierSales] = useState(null);

  const fetchCashierSales = async () => {
    try {
      const response = await axios.post('http://localhost:3001/getCashierSales', {
        start_date: startDate,
        end_date: endDate,
      });
      setCashierSales(response.data);
    } catch (error) {
      console.error('Error fetching cashier sales:', error);
    }
  };

  return (
    <div>
      <h2>Cashier Sales</h2>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={fetchCashierSales}>Fetch Cashier Sales</button>
      {cashierSales && (
        <table className="table mt-3 table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {cashierSales.map((cashier, index) => (
              <tr key={index}>
                <td>{cashier.empl_name}</td>
                <td>{cashier.empl_surname}</td>
                <td>{cashier.total_sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CashierSales;

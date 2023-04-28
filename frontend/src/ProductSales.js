import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductSales = ({ user }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [productSales, setProductSales] = useState([]);

  const fetchProductSales = async () => {
    try {
      const response = await axios.post('http://localhost:3001/getProductSales', {
        start_date: startDate.toISOString().slice(0, 10),
        end_date: endDate.toISOString().slice(0, 10),
      });
      setProductSales(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">Product Sales</h1>
      <div className="d-flex justify-content-center mt-3">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={fetchProductSales} className="btn btn-info btn-lg mt-3 btn-block">Fetch Sales</button>
      </div>
      <table className="table mt-3 table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {productSales.map((productSale) => (
            <tr key={productSale.product_name}>
              <td>{productSale.product_name}</td>
              <td>{productSale.total_product_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSales;

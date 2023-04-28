import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddCustomer from "./addingForms/addCustomer";
import 'jspdf-autotable';
import CustomersAllCategories from './additionalQueries/CustomersAllCategories';
import jsPDF from 'jspdf';

export default function Customers() {
  const [customers, setCustomers] = useState(null);
  const [addIsClicked, setAddisClicked] = useState(false);
  const [showCustomersAllCategories, setShowCustomersAllCategories] = useState(false);

  const deleteCustomer = (e) => {
    e.preventDefault();
    const card_number = e.target.name;
    console.log(card_number);

    try {
      axios
        .delete(`http://localhost:3001/customers/deleteCustomer/${card_number}`)
        .then((res) => {
          console.log("super!");
          const customers2 = customers.filter(
            (object) => object.card_number !== card_number
          );
          setCustomers(customers2);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const sortByName = (e) => {
    e.preventDefault();

    try {
      axios
        .get(`http://localhost:3001/customers/getSortedCustomers`)
        .then((res) => setCustomers(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const showAll = () => {
    axios
      .get("http://localhost:3001/getAllCards")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  const findByPercent = (e) => {
    e.preventDefault();
    const percent = document.getElementById("searchByPercent").value;
    console.log(percent);

    try {
      axios
        .get(`http://localhost:3001/customers/findByPercent/${percent}`)
        .then((res) => setCustomers(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.response.data);
    }
    document.getElementById("searchByPercent").value = "";
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set up the table headers
    const headers = [
      [
        "Card Number",
        "Surname",
        "Name",
        "Patronymic",
        "Phone",
        "City",
        "Street",
        "Zip Code",
        "Percent",
      ],
    ];

    // Map through customers data to format the data for the table
    const data = customers.map(
      ({
        card_number,
        cust_surname,
        cust_name,
        cust_patronymic,
        phone_number,
        city,
        street,
        zip_code,
        percent,
      }) => [
        card_number,
        cust_surname,
        cust_name,
        cust_patronymic,
        phone_number,
        city,
        street,
        zip_code,
        percent,
      ]
    );

    // AutoTable plugin formats and inserts the table into the PDF
    doc.autoTable({
      head: headers,
      body: data,
      startY: 10,
    });

    // Save and open the PDF file
    doc.save("customers.pdf");
  };

      const findBySurname = (e) => {
        e.preventDefault();
        var customerSurname = document.getElementById('searchByCustomerSurname').value;
    
        console.log(customerSurname);

        try {
          axios.get(`http://localhost:3001/customers/searchByCustomerSurname/${customerSurname}`)
          .then(res => setCustomers(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      document.getElementById('searchByCustomerSurname').value = ''
      }


    if(customers) {

        return(
            
        
        <div>
            {showCustomersAllCategories && <CustomersAllCategories />}
            <h1 className="text-center mt-3">Customers</h1>
            {(addIsClicked) ? <AddCustomer /> : null }

            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 btn-block ms-3">Sort by surname</button>
                <button type="button" onClick={generatePDF} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Print</button>
                <button type="button" onClick={() => setShowCustomersAllCategories(!showCustomersAllCategories)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Customers All Categories</button>
            </div>

            <div className="input-group mb-3 mt-3 finder">
              <input type="number" min='1' max='100' className="form-control" id='searchByPercent' placeholder="Search by Percents" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={findByPercent}>Search</button>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <input type="text" className="form-control" id='searchByCustomerSurname' placeholder="Search by Customer Surname"/>  
                <button className="btn btn-outline-secondary" type="button" onClick={findBySurname}>Search</button>
            </div>
            
            <table className="table mt-3 table-striped">
            <thead>
                <tr>
                <th scope="col">Card Number</th>
                <th scope="col">Surname</th>
                <th scope="col">Name</th>
                <th scope="col">Patronymic</th>
                <th scope="col">Phone</th>
                <th scope="col">City</th>
                <th scope="col">Street</th>
                <th scope="col">Zip code</th>
                <th scope="col">Percent</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(el => 
                <tr key={el.card_number}>
                <th scope="row">{el.card_number}</th>
                <td>{el.cust_surname}</td>
                <td>{el.cust_name}</td>
                <td>{el.cust_patronymic}</td>
                <td>{el.phone_number}</td>
                <td>{el.city}</td>
                <td>{el.street}</td>
                <td>{el.zip_code}</td>
                <td>{el.percent}</td>
                <td><button type="button" className="btn btn-warning">Update</button>
                <button type="button" className="btn btn-danger" onClick={deleteCustomer} name={el.card_number}>Delete</button></td>
                </tr>
                  
                )}
            </tbody>
            </table>

        </div>
    ) 
                }
    else{ showAll() }
}
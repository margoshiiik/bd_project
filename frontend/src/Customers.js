import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddCustomer from "./addingForms/addCustomer";

export default function Customers() {

    const [customers, setCustomers] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)

    const deleteCustomer = (e) => {
        e.preventDefault();
        const card_number = e.target.name;
        console.log(card_number);
        
        try {
          axios.delete(`http://localhost:3001/customers/deleteCustomer/${card_number}`)
          console.log('super!')
          let customers2 =  customers.filter(object => {
            return object.card_number != card_number;
          });
          setCustomers(customers2)
      } catch(err){
          console.log(err.response.data)
      }
      }

      const sortByName = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/customers/getSortedCustomers`)
          .then(res => setCustomers(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

      const showAll = () => {
        axios.get('http://localhost:3001/getAllCards')
        .then(res => setCustomers(res.data))
        .catch(err => console.log(err))
      }


    if(customers) {

        return(
            
        
        <div>
            <Menu />
            <h1 className="text-center mt-3">Customers</h1>
            {(addIsClicked) ? <AddCustomer /> : null }

            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 btn-block ms-3">Sort by surname</button>
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
import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddEmployee from "./addingForms/addEmployee";
import './app.css'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CashierSales from "./additionalQueries/CashierSales";
import CashiersSoldAllPromotionalProducts from './CashiersSoldAllPromotionalProducts';

export default function Employee({user}) {

    const [employees, setEmployees] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)
    const [showCashierSales, setShowCashierSales] = useState(false);
    const [showCashiersSoldAllPromotionalProducts, setShowCashiersSoldAllPromotionalProducts] = useState(false);

    const sortByName = (e) => {
        e.preventDefault();
        
        try {
          axios.get(`http://localhost:3001/employee/getSortedEmployee`)
          .then(res => setEmployees(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      }

    const deleteEmployee = (e) => {
        e.preventDefault();
        const employeeId = e.target.name;
        console.log(employeeId);
        const values = {id: employeeId}

        try {
          axios.delete(`http://localhost:3001/employee/deleteEmployee/${employeeId}`)
          let employees2 =  employees.filter(object => {
            return object.id_employee != employeeId;
          });
          setEmployees(employees2)
      } catch(err){
          console.log(err.response.data)
      }
      }


      const updateEmployee = (e) => {
        e.preventDefault();
        const employeeId = e.target.name;

        console.log(document.getElementById(`birthday${employeeId}`).innerText)

        const empl_surname = document.getElementById(`employeeSurname${employeeId}`).value;
        const empl_name = document.getElementById(`employeeFirstname${employeeId}`).value;
        const empl_patronymic = document.getElementById(`employeePatronymic${employeeId}`).value;
        const date_of_birth = new Date(document.getElementById(`birthday${employeeId}`).innerText).toISOString().substring(0, 10);
        const date_of_start = new Date(document.getElementById(`dateOfStart${employeeId}`).innerText).toISOString().substring(0, 10);
        const empl_role = document.getElementById(`role${employeeId}`).value;
        const salary = parseInt(document.getElementById(`employeeSalary${employeeId}`).value);
        const phone_number = document.getElementById(`employeephone${employeeId}`).value;
        const city = document.getElementById(`employeeCity${employeeId}`).value;
        const street = document.getElementById(`employeeStreet${employeeId}`).value;
        const zip_code = document.getElementById(`employeeZip${employeeId}`).value;



        try {
          axios.put(`http://localhost:3001/employee/updateEmployee/${employeeId}`, {
            empl_surname,
            empl_name,
            empl_patronymic,
            empl_role,
            salary,
            date_of_birth,
            date_of_start,
            phone_number,
            city,
            street,
            zip_code,
          }).then((response) => {
            console.log(response.data);
          });
        } catch (err) {
          console.log(err.response.data);
        }
      };


      const findBySurname = (e) => {
        e.preventDefault();
        const empl_surname = document.getElementById('searchSurname').value;
        console.log(empl_surname);

        try {
          axios.get(`http://localhost:3001/employee/findBySurname/${empl_surname}`)
          .then(res => setEmployees(res.data))
          .catch(err => console.log(err))
      } catch(err){
          console.log(err.response.data)
      }
      document.getElementById('searchSurname').value = ''
      }

      const showAll = () => {
        axios.get('http://localhost:3001/getAllEmployees')
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
      }

      const showCahiers = () => {
        axios.get('http://localhost:3001/employee/getSortedCashiers')
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
      }

const generatePDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text('Employee Report', 14, 15);

  const headers = [
    'Id', 'Surname', 'Name', 'Patronymic', 'Role', 'Salary', 'Birth', 'Start', 'Number', 'City', 'Street', 'Zip code'
  ];

  const data = employees.map(employee => {
    return [
      employee.id_employee,
      employee.empl_surname,
      employee.empl_name,
      employee.empl_patronymic,
      employee.empl_role,
      employee.salary,
      employee.date_of_birth,
      employee.date_of_start,
      employee.phone_number,
      employee.city,
      employee.street,
      employee.zip_code
    ];
  });

  doc.autoTable({
    head: [headers],
    body: data,
    startY: 20,
    styles: {
      halign: 'center',
      valign: 'middle',
      fontSize: 10,
      cellPadding: 3,
    },
  });

  doc.save('employee_report.pdf');
};

    

    if(employees) return(

        <div>
            {showCashierSales && <CashierSales />}
            {showCashiersSoldAllPromotionalProducts && <CashiersSoldAllPromotionalProducts />}
            <h1 className="text-center mt-3">Employees</h1>
            {(addIsClicked) ? <AddEmployee /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
               {user === 'manager' ? <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button> : null} 
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Surname</button>
                <button type="button" onClick={showCahiers} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Cashiers</button>
                <button type="button" onClick={generatePDF} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Print</button>
                <button type="button" onClick={() => setShowCashierSales(!showCashierSales)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Cashier Sales</button>
                <button type="button" onClick={() => setShowCashiersSoldAllPromotionalProducts(!showCashiersSoldAllPromotionalProducts)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Cashiers Sold All Promotional Products</button>
            </div>

            <div className="input-group mb-3 mt-3 finder">
              <input type="text" className="form-control" id='searchSurname' placeholder="Search by Surname" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={findBySurname}>Search</button>
              </div>
            </div>


            <table className="table mt-5 table-striped">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Surname</th>
                <th scope="col">Name</th>
                <th scope="col">Patronymic</th>
                <th scope="col">Role</th>
                <th scope="col">Salary</th>
                <th scope="col">Birth</th>
                <th scope="col">Start</th>
                <th scope="col">Number</th>
                <th scope="col">City</th>
                <th scope="col">Street</th>
                <th scope="col">Zip code</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(el => 
                <tr key={el.id_employee}>
                <th scope="row">{el.id_employee}</th>
                <td><input type="text" className="form-control" id={`employeeSurname${el.id_employee}`} placeholder={el.empl_surname}/></td>
                <td><input type="text" className="form-control" id={`employeeFirstname${el.id_employee}`} placeholder={el.empl_name}/></td>
                <td><input type="text" className="form-control" id={`employeePatronymic${el.id_employee}`} placeholder={el.empl_patronymic}/></td>
                <td><input type="text" className="form-control" id={`role${el.id_employee}`} placeholder={el.empl_role}/></td>
                <td><input type="text" className="form-control" id={`employeeSalary${el.id_employee}`} placeholder={el.salary}/></td>
                <td id={`birthday${el.id_employee}`} value={el.date_of_birth}>{el.date_of_birth}</td>
                <td id={`dateOfStart${el.id_employee}`}>{el.date_of_start}</td>
                <td><input type="text" className="form-control" id={`employeephone${el.id_employee}`} placeholder={el.phone_number}/></td>
                <td><input type="text" className="form-control" id={`employeeCity${el.id_employee}`} placeholder={el.city}/></td>
                <td><input type="text" className="form-control" id={`employeeStreet${el.id_employee}`} placeholder={el.street}/></td>
                <td><input type="text" className="form-control" id={`employeeZip${el.id_employee}`} placeholder={el.zip_code}/></td>
                <td>
                  {user === 'manager' ? (<div><button type="button" className="btn btn-warning"  name={el.id_employee} onClick={updateEmployee}>Update</button>
                  <button type="button" className="btn btn-danger ms-3" name={el.id_employee} onClick={deleteEmployee}>Delete</button></div>) : null}
                  
                </td>
                </tr>
                  
                )}
                
            </tbody>
            </table>
        </div>
    ) 
    else showAll(); 
}
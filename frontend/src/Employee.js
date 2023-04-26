import { useEffect, useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddEmployee from "./addingForms/addEmployee";
import './app.css'

export default function Employee() {

    const [employees, setEmployees] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)

   
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
          console.log('super!')
          let employees2 =  employees.filter(object => {
            return object.id_employee != employeeId;
          });
          setEmployees(employees2)
      } catch(err){
          console.log(err.response.data)
      }
      }


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

    

    if(employees) return(
        
        <div>
            <Menu />
            <h1 className="text-center mt-3">Employees</h1>
            {(addIsClicked) ? <AddEmployee /> : null }
            <div className="menu mt-3 d-flex justify-content-center">
                <button type="button" onClick={showAll} className="btn btn-info btn-lg mt-3 btn-block">Show All</button>
                <button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Add</button>
                <button type="button" onClick={sortByName} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Sort by Surname</button>
                <button type="button" onClick={showCahiers} className="btn btn-info btn-lg mt-3 ms-3 btn-block">Cashiers</button>
            </div>

            <div class="input-group mb-3 mt-3 finder">
              <input type="text" class="form-control" id='searchSurname' placeholder="Search by Surname" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick={findBySurname}>Search</button>
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
                <td>{el.empl_surname}</td>
                <td>{el.empl_name}</td>
                <td>{el.empl_patronymic}</td>
                <td>{el.empl_role}</td>
                <td>{el.salary}</td>
                <td>{el.date_of_birth}</td>
                <td>{el.date_of_start}</td>
                <td>{el.phone_number}</td>
                <td>{el.city}</td>
                <td>{el.street}</td>
                <td>{el.zip_code}</td>
                <td><button type="button" className="btn btn-warning">Update</button>
                <button type="button" className="btn btn-danger ms-3" name={el.id_employee} onClick={deleteEmployee}>Delete</button></td>
                </tr>
                  
                )}
                
            </tbody>
            </table>
        </div>
    ) 
    else showAll(); 
}
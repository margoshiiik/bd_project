import './addStyles.css'
import axios from 'axios';
import { useEffect, useState } from "react"

export default function AddEmployee() {

    const [employees, setEmployees] = useState(null); 
    console.log(employees)

    useEffect(() => {
        axios.get('http://localhost:3001/getAllEmployees')
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
    }, [])


    const addEmployee = (e) => {
        e.preventDefault();
        
        const id_employee = (employees.length +1).toString(); 
        const surname = document.getElementById('employeeSurname').value;
        const name = document.getElementById('employeeFirstname').value;
        const patronymic = document.getElementById('employeePatronymic').value;
        const birthday = new Date(document.getElementById('birthday').value);
        const dateOfStart = new Date(document.getElementById('dateOfStart').value);
        const role = document.getElementById('role').value;
        const employeeSalary = parseInt(document.getElementById('employeeSalary').value);
        const phone_number = document.getElementById('employeephone').value;
        const employeeCity = document.getElementById('employeeCity').value;
        const employeeStreet = document.getElementById('employeeStreet').value;
        const employeeZip = document.getElementById('employeeZip').value;
        const values = {
            id_employee: id_employee,
            empl_surname: surname,
            empl_name: name,
            empl_patronymic: patronymic,
            empl_role: role,
            salary: employeeSalary,
            date_of_birth: birthday,
            date_of_start: dateOfStart,
            phone_number: phone_number,
            city: employeeCity,
            street: employeeStreet,
            zip_code: employeeZip
          };
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/employee/addEmployee`, values);
        } catch(err){
            console.log(err)
        }

      }

if(employees !== null) {
    return (
        <div className='form'> 
        <form>
            
            
            <input type="text" className="form-control mt-3" id='employeeSurname' placeholder="Surname" required/>
            
    
            <input type="text" className="form-control mt-3" id='employeeFirstname' placeholder="First name"  required/>
            

            <input type="text" className="form-control mt-3" id='employeePatronymic' placeholder="Patronymic" required/>

            <select className="custom-select mt-3" id='role'>
                <option defaultValue>Choose the role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>

            <input type="number" className="form-control mt-3" id='employeeSalary'  placeholder="Salary" required/>
            
            <div className='mt-3'>
            <label>Birthday:</label>
            <input type="date" id="birthday" name="birthday" className='ms-5'/>
            </div>

            <div className='mt-3'>
            <label>Date of start:</label>
            <input type="date" id='dateOfStart' className='ms-4'/>
            </div>

            <input type="text" className="form-control mt-3" id='employeephone' placeholder="Phone" required/>

            <input type="text" className="form-control mt-3" id='employeeCity' placeholder="City" required/>

            <input type="text" className="form-control mt-3" id='employeeStreet'  placeholder="Street" required/>

            <input type="text" className="form-control mt-3" id='employeeZip' placeholder="Zip code" required/>
        
    
            <button className="btn btn-primary mt-3" type="submit" onClick={addEmployee}>Add employee</button>
</form>
      </div>
    )
    } else return null;
}
import { useEffect, useState } from 'react'
import './addStyles.css'

import axios from 'axios';
 
export default function AddCheck() {

    const [checks, setChecks] = useState(null);
    const [employees, setEmployees] = useState(null); 


    const showAllChecks = () => {
        axios.get('http://localhost:3001/getAllCheck')
        .then(res => setChecks(res.data))
        .catch(err => console.log(err))
    }

    const addCheck = (e) => {
        e.preventDefault();
        
        const checkNumber = document.getElementById('checkNumber').value;
        const employee = document.getElementById('selectEmployee').value
        const card_number = document.getElementById('cardnumber').value;
        const date = new Date(Date.now()).toLocaleString().split(',')[0];
        const sum = document.getElementById('sum').value;
        const vat = sum * 0.2;

        const values = {check_number: checkNumber, id_employee: employee, card_number: card_number, date: date, sum_total: sum, vat:vat};
        console.log(values)
        
        try {
            axios.post(`http://localhost:3001/checks/addCheck`, values);
        } catch(err){
            console.log(err.response.data)
        }

    }

    if(checks && employees) {

    return (
        <div className='form'> 
        <form>
            
            <input type="text" className="form-control mt-3" id='checkNumber'placeholder="Check Number" required/> 
            
            <select className="custom-select mt-3" id='selectEmployee'>
                        <option defaultValue>Select Employee id</option>
                        {employees.map(item => 
                            <option key={item.id_employee} value={item.id_employee}>{item.id_employee}</option>
                        )}
            </select>

            <input type="text" className="form-control mt-3" id='cardnumber' placeholder="Card number" required/>

            <input type="number" className="form-control mt-3" id='sum' placeholder="Sum" required/>
    
            <button class="btn btn-primary mt-3" type="submit" onClick={addCheck}>Add check</button>
</form>
      </div>
    )
    } else {
        showAllChecks(); 
        axios.get('http://localhost:3001/employee/getSortedCashiers')
            .then(res => setEmployees(res.data))
            .catch(err => console.log(err))
    }

}
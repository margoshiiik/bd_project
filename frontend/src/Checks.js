import { useEffect,useState } from "react"
import axios from 'axios'
import Menu from "./Menu";
import AddCheck from "./addingForms/addCheck";

export default function Checks() {

    const [checks, setChecks] = useState(null); 
    const [addIsClicked, setAddisClicked] = useState(false)

    const deleteCheck = (e) => {
        e.preventDefault();
        const check_number = e.target.name;
        console.log(check_number);
        
        try {
          axios.delete(`http://localhost:3001/checks/deleteCheck/${check_number}`)
          console.log('super!')
          let checks2 =  checks.filter(object => {
            return object.check_number != check_number;
          });
          setChecks(checks2)
      } catch(err){
          console.log(err.response.data)
      }
      }

    useEffect(() => {
        axios.get('http://localhost:3001/getAllCheck')
        .then(res => setChecks(res.data))
        .catch(err => console.log(err))
    })

    if(checks) {
    
    return(
        <div>
            <Menu />
            <h1 className="text-center mt-3">Checks</h1>
            {(addIsClicked) ? <AddCheck /> : null }
            <div className="d-flex justify-content-around"><button type="button" onClick={() => setAddisClicked(!addIsClicked)} className="btn btn-info btn-lg mt-3 btn-block">Add</button></div>
            
            <table className="table mt-3 table-striped">
            <thead>
                <tr>
                <th scope="col">Number</th>
                <th scope="col">Employee id</th>
                <th scope="col">Card Number</th>
                <th scope="col">Total sum</th>
                <th scope="col">Vat</th>
                </tr>
            </thead>
            <tbody>
                {checks.map(el => 
                <tr key={el.check_number}>
                <th scope="row">{el.check_number}</th>
                <td>{el.id_employee}</td>
                <td>{el.card_number}</td>
                <td>{el.sum_total}</td>
                <td>{el.vat}</td>
                <td><button type="button" className="btn btn-warning">Update</button>
                <button type="button" className="btn btn-danger ms-4" name={el.check_number} onClick={deleteCheck}>Delete</button></td>
                </tr>
                  
                )}
            </tbody>
            </table>
        </div>
    ) 

                }
                else return (
                    <h1>Fetching the data</h1>
                )
}
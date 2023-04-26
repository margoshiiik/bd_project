import './addStyles.css'

export default function AddCheck() {

    return (
        <div className='form'> 
        <form>
            
            {/* <input type="text" className="form-control mt-3" placeholder="Check Number" required/> */}
            
            <input type="text" className="form-control mt-3" placeholder="Employee id" required/>

            <input type="number" className="form-control mt-3"  placeholder="Card number" required/>
    
            <button class="btn btn-primary mt-3" type="submit">Add check</button>
</form>
      </div>
    )

}
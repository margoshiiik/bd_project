import { NavLink as Link } from "react-router-dom";


export default function Menu() {

    return(
        <div className="menu mt-3 d-flex justify-content-center">
            
                <Link to="/employee"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Employees</button></Link>
                <Link to="/category"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Category</button></Link>
                <Link to="/products"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Products</button></Link>
                <Link to="/productsInShop"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Products in the shop</button></Link>
                <Link to="/checks"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Checks</button></Link>
                <Link to="/customers"> <button type="button" className="btn btn-secondary ms-5 btn-lg">Customers</button></Link>
        </div>
    ) 
}
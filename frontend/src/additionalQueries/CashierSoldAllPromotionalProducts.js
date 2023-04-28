// CashiersSoldAllPromotionalProducts.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const CashiersSoldAllPromotionalProducts = () => {
    const [cashiers, setCashiers] = useState([]);

    useEffect(() => {
        fetchCashiers();
    }, []);

    const fetchCashiers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/cashiersSoldAllPromotionalProducts');
            setCashiers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Cashiers who sold all promotional products</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {cashiers.map((cashier) => (
                    <tr key={cashier.id_employee}>
                        <td>{cashier.id_employee}</td>
                        <td>{cashier.full_name}</td>
                        <td>{cashier.empl_role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CashiersSoldAllPromotionalProducts;

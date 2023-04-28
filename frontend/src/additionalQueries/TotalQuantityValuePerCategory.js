import { useState } from "react";
import axios from "axios";

export default function TotalQuantityValuePerCategory() {
    const [results, setResults] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:3001/totalQuantityValuePerCategory?startDate=${startDate}&endDate=${endDate}`
            );
            setResults(response.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div>
            <h2 className="text-center mt-3">Total Quantity & Value Per Category</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            {results && (
                <table className="table mt-3 table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Total Quantity</th>
                        <th scope="col">Total Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((result) => (
                        <tr key={result.category_name}>
                            <td>{result.category_name}</td>
                            <td>{result.total_quantity}</td>
                            <td>{result.total_value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

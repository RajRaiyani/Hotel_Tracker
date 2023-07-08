
import { Link } from "react-router-dom";
import useGetTables from "../../Hooks/useGetTables";


const Waiter = () => {
	var [tables] = useGetTables([]);


	function Tables() {
		return tables.map((table, index) => {
			return (
				<Link to={"/waiter/table/"+table._id} key={table._id}>
				<div className="card m-5 my-table-card" style={{ width: "13rem", border: "none" }}>
					<h5 className="my-card-name text-success">{table.name}</h5>
					<img src="http://localhost:3007/api/v1/images/tableimg.png" className="card-img-top my-table-card-img" alt="..." />
				</div>
				</Link>
			)
		})
	}

	return (
		<>
		<h2 className="my-3 mx-5 text-success">Waiter</h2>
			<div className=" d-flex justify-content-center flex-wrap">
				<Tables />
			</div>
		</>
	)
}


export default Waiter;
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { Link } from "react-router-dom";


const Waiter = () => {
	var [tables, setTables] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3007/api/getTables", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				setTables(res.data);
			})
			.catch(e => {
				console.log(e);
			})
	}, [])

	function Tables() {
		return tables.map((table, index) => {
			return (
				<Link to={"/waiter/table/"+table._id} key={table._id}>
				<div className="card m-5 my-table-card" style={{ width: "13rem", border: "none" }}>
					<h5 className="my-card-name text-success">{table.name}</h5>
					<img src="http://localhost:3007/api/images/tableimg.png" className="card-img-top my-table-card-img" alt="..." />
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
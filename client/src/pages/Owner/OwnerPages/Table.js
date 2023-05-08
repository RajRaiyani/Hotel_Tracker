import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { Link } from "react-router-dom";

const Table = () => {
	var [tableName, setTableName] = useState("");
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
				<Link to={"/owner/table/"+table._id} key={table._id}>
					<div className="card m-5 my-table-card" style={{ width: "13rem", border: "none" }}>
						<h5 className="my-card-name text-success">{table.name}</h5>
						<img src="http://localhost:3007/api/images/tableimg.png" className="card-img-top my-table-card-img" alt="..." />
					</div>
				</Link>
			)
		})
	}

	function addTable() {
		fetch("http://localhost:3007/api/owner/addTable", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("ownerToken")
			},
			body: JSON.stringify({ tableName })
		}).then(res => res.json())
			.then(res => {
				setTables(res.data);
				setTableName("");
			})
			.catch(e => console.log("error : " + e));
	}

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1 className="m-5 text-success">Table</h1>
				<button type="button" className="btn btn-outline-success m-5 fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Add +
				</button>
			</div>


			<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Add Table</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<label className="form-label">Table Name</label>
							<input type="text" className="form-control border-dark" placeholder="Table Name" value={tableName}
								onChange={(e) => {
									setTableName(e.target.value);
								}} />

						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								onClick={addTable}>add</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container d-flex flex-wrap">
				<Tables />
			</div>



		</>
	);
}
export default Table;
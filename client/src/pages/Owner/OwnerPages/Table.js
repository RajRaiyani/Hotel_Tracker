
import { Link } from "react-router-dom";
import PopUp from "../../../components/PopUp";
import AddTablePopUp from "./../OwnerComponents/AddTablePopUp";
import useGetTables from "../../../Hooks/useGetTables";

const Table = () => {

	var [tables, setTables] = useGetTables();

	var [AddTableBox,addTableBoxToggle] = PopUp(AddTablePopUp,{tables,setTables});

	function Tables() {
		return tables.map((table, index) => {
			return (
				<Link to={"/owner/table/" + table._id} key={table._id}>
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
			<div className="d-flex justify-content-between">
				<h1 className="m-5 text-success">Table</h1>
				<button type="button" className="btn btn-outline-success m-5 fs-4" onClick={addTableBoxToggle}>
					Add +
				</button>
			</div>

			<AddTableBox />

			<div className="container d-flex flex-wrap">
				<Tables />
			</div>
		</>
	);
}
export default Table;
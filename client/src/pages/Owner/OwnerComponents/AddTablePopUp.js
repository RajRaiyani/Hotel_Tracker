import { useState } from "react";
import addTable from "./../../../utility/APIcalls/addTable";




function AddTablePopUp(props) {
	var [tableName, setTableName] = useState("");

	async function submit(){
		let res = await addTable(tableName);
		if(res){
			if(res.status==="OK"){
				props.setTables([...props.tables,res.data])
			}
		}
		props.close();
	}

	return (
		<div className="modal" style={{ display: "inline" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">Add Table</h1>
						<button type="button" className="btn-close" onClick={props.close}></button>
					</div>
					<div className="modal-body">
						<label className="form-label">Table Name</label>
						<input type="text" className="form-control border-dark" placeholder="Table Name" value={tableName}
							onChange={(e) => {
								setTableName(e.target.value);
							}} />

					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"
							onClick={submit}>Add +</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddTablePopUp;
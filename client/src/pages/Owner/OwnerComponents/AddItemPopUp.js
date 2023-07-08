import { useState } from "react";
import addItem from "./../../../utility/APIcalls/addItem";




function AddItemPopUp(props) {

	var [data, setData] = useState({ number: "", name: "", price: "" });

	function handleData(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	async function sendData(){
		let res = await addItem(data);
		console.log(res);
		if(res){
			if(res.status==="OK"){
				props.setItems([...props.items,res.data])
			}
		}
		props.close();
	}

	return (
		<div className="modal" style={{ display: "inline" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Add Table</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.close}></button>
						</div>
						<div className="modal-body">
							<label className="form-label">Item Number</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Number" name="number"
								onChange={handleData} value={data.number} />
							<label className="form-label">Item Name</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Name" name="name"
								onChange={handleData} value={data.name} />
							<label className="form-label">Price</label>
							<input type="text" className="form-control border-dark" placeholder="Price" name="price"
								onChange={handleData} value={data.price} />

						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								onClick={sendData}>add</button>
						</div>
					</div>
				</div>
			</div>
	)
}

export default AddItemPopUp;
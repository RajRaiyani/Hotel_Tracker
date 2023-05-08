import { useState, useEffect } from "react";
import cookie from "js-cookie";

var Item = () => {
	var [items, setItems] = useState([]);
	var [data, setData] = useState({ number: "", name: "", price: "" });
	useEffect(() => {
		fetch("http://localhost:3007/api/getItems", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				setItems(res.data);
			})
			.catch(e => {
				console.log(e);
			})
	}, [])

	function handleData(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	function sendData() {
		fetch("http://localhost:3007/api/owner/addItem", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("ownerToken")
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
			.then(res => {
				if (res.status === "ok") {
					setItems(res.data);
					console.log(res);
					setData({ number: "", name: "", price: "" });
				}

			})
			.catch((e) => {
				console.log(e);
			})

	}

	function Items() {
		return items.map((item, index) => {
			return (
				<tr key={item._id}>
					<td>{item.number}</td>
					<td>{item.name}</td>
					<td>{item.price}</td>
				</tr>
			)
		})
	}

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1 className="m-5 text-success">Food Items</h1>
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
			<div className="container-sm">
			<table className="table table-light border text-center">
				<thead>
					<tr>
						<th>Number</th>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					<Items />
				</tbody>
			</table>
			</div>
			
		</>
	);
}

export default Item;
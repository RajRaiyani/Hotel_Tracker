import { useEffect, useState } from "react";
import cookie from "js-cookie";

const Chef = () => {

	const [order, setOrder] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3007/api/v1/chef", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "ok") {
					setOrder(res.data);
				}
			})
			.catch(e => console.log("error : " + e));
	}, []);

	function orderDone(orderId){
		fetch("http://localhost:3007/api/v1/chef/orderComplete", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			},
			body:JSON.stringify({orderId})
		}).then(res=>res.json())
		.then(res=>{
			if(res.status==="ok"){
				setOrder(res.data);
			}
		}).catch(e=>{console.log(e)});

	}

	function Order() {
		return order.map(item => {
			return (
				<tr className="" key={item._id}>
					<td className="py-3">{item.tableName}</td>
					<td className="py-3">{item.itemNumber}</td>
					<td className="py-3">{item.itemName}</td>
					<td className="py-3">{item.quantity}</td>
					<td className="text-end">
					<button type="button" className="btn btn-success"
					onClick={()=>{orderDone(item._id)}}>done</button>
					</td>
				</tr>
			);
		})
	}



	return (
		<>
			<h1 className="m-3 mx-5 text-success">Chef</h1>
			<div className="p-5">
				<table className="table table-light border">
					<thead>
						<tr>
							<th>Table</th>
							<th>Number</th>
							<th>Name</th>
							<th>Quantity</th>
							<th className="text-end">Done</th>
						</tr>
					</thead>
					<tbody>
						<Order />
					</tbody>
				</table>
			</div>

		</>

	)
}

export default Chef;
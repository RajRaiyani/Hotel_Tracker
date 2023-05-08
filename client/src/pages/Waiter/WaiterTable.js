import { Link, useParams } from "react-router-dom";
import useGetItems from "../../Hooks/useGetItems";
import { useEffect, useState } from "react";
import cookie from "js-cookie";





const WaiterTable = () => {

	var [tableName,setTableName] = useState("");
	var params = useParams();
	var items = useGetItems();
	var [order, setOrder] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3007/api/waiter/table/" + params.id, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				if(res.status==="ok"){
					setTableName(res.data.name);
				}
			})
			.catch(e => {
				console.log(e);
			})
	}, [params.id]);


	function addItem(id) {
		for (let i = 0; i < order.length; i++) {
			if (order[i]._id === id) {
				var temp = [...order];
				temp[i].count++;
				setOrder(temp);
				return;
			}
		}
		for (let i = 0; i < items.length; i++) {
			var e = items[i];
			if (e._id === id) {
				setOrder([...order, { _id: id, number: e.number, name: e.name, price: e.price, count: 1 }]);
				return;
			}
		}
	}

	function Items() {
		return items.map(item => {
			return (
				<tr className="" key={item._id}
					onClick={() => { addItem(item._id) }}>
					<td className="py-3">{item.number}</td>
					<td className="py-3">{item.name}</td>
					<td className="py-3">&#x20B9;{item.price}</td>
				</tr>
			);
		})
	}
	function OrederItems() {
		return order.map((item) => {
			return (
				<tr className="" key={item._id}>
					<td className="py-3">{item.name}</td>
					<td className="py-3">&#x20B9;{item.price}</td>
					<td className="py-3 text-success fs-5 text-center border">{item.count}</td>
				</tr>
			);
		})
	}
	
	function placeOrder(){
		fetch("http://localhost:3007/api/waiter/table/placeOrder",{
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			},
			body:JSON.stringify({table_id:params.id,data:order})
		}).then(res=>res.json())
		.then(res=>{
			if(res.status==="ok"){
				setOrder([]);
			}
		}).catch(e=>{
			console.log(e);
		})

	}

	return (
		<>
			<Link to="/waiter" className="text-decoration-none p-2 fs-2 ms-3 text-success">{tableName}</Link>
			<div className="d-flex border justify-content-around flex-wrap border">
				<div className="w-50 p-3" style={{ minWidth: "400px" }}>
					<div className="border p-2">
						<input className="form-control ms-auto" style={{ width: "40%" }} type="test" placeholder="Search" />
					</div>
					<div className="" style={{ maxHeight: "70vh", overflowX: "auto" }}>
						<table className="table table-light border">
							<tbody>
								<Items />
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-50 p-3" style={{ minWidth: "400px", maxHeight: "69vh", overflowX: "auto", height: "69vh" }}>
					<div className="d-flex">
					<button type="button" className="btn fs-4 px-5 btn-outline-success m-2 ms-auto"
					onClick={placeOrder}>Order</button>
					</div>
				
					<div className="border border-2" >
						<table className="table table-light border">
							<tbody>
								<OrederItems />
							</tbody>
						</table>
					</div>
					
				</div>
			</div>

		</>
	);
}

export default WaiterTable;
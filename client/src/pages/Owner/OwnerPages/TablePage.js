import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";

const TablePage = () => {
	var params = useParams();

	var [order,setOrder] = useState([]);
	var [tableName,setTableName] = useState("");
	
	useEffect(()=>{
		fetch("http://localhost:3007/api/getOrder/"+params.id,{
			method:"GET",
			headers:{
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res=>res.json())
		.then(res=>{
			if(res.status==="ok"){
				setTableName(res.tableName);
				setOrder(res.data);
			}
		}).catch(e=>{
			console.log(e);
		})
	},[params.id]);


	function Order() {
		return order.map(item => {
			return (
				<tr className="" key={item._id}>
					<td className="py-3">{item.number}</td>
					<td className="py-3">{item.name}</td>
					<td className="py-3">&#x20B9;{item.price}</td>
					<td className="py-3">{item.count}</td>
				</tr>
			);
		})
	}

	return (
		<>

			<h1 className="text-success p-3 px-5">{tableName}</h1>
			<div className="d-flex">
				<div key="key1" className="w-50 p-2" style={{maxBlockSize:"80vh",overflowX:"auto"}}>
					<table className="table table-light border">
						<tbody>
							<Order />
						</tbody>
					</table>
				</div>
				<div key="key2" className="p-2">
				<button type="button" className="btn btn-outline-success fs-4 px-5">Print</button>
				</div>
			</div>

		</>
	);
}


export default TablePage
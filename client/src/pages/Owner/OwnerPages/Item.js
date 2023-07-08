

import useGetItems from "./../../../Hooks/useGetItems";
import AddItemPopUp from "../OwnerComponents/AddItemPopUp";
import PopUp from "../../../components/PopUp";


var Item = () => {
	var [items, setItems] = useGetItems();

	var [AddItemBox,addItemBoxToggle] = PopUp(AddItemPopUp,{items,setItems});

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

			<AddItemBox />
			
			<div className="d-flex justify-content-between">
				<h1 className="m-5 text-success">Food Items</h1>
				<button type="button" className="btn btn-outline-success m-5 fs-4" data-bs-toggle="modal" onClick={addItemBoxToggle}>
					Add +
				</button>
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
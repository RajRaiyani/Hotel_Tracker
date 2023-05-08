import { useEffect, useState } from "react";
import cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";

var useGetItems = () => {
	var [items,setItems] = useState([]);

	useEffect(()=>{
		fetch("http://localhost:3007/api/getItems",{
		method:"GET",
		headers:{
			'Content-Type': 'application/json',
				"token": cookie.get("token")
		}
	}).then(res=>res.json())
	.then(res=>{
		if(res.status==="ok"){
			setItems(res.data);
		}else{
			console.log("something went wrong in useGetItems hook");
		}
		
	})
	.catch(e=>{
		console.log(e);
	})},[]);
	return items;
}

export default useGetItems;
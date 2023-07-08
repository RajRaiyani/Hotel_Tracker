import { Outlet,useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import Header from "./OwnerComponents/OwnerHeader";
import Footer from "./../../components/Footer"
import cookie from "js-cookie";


const OwnerApp = ()=>{
	var[name,setName] = useState("");
	var navigate = useNavigate();
	useEffect(()=>{
		if(!cookie.get("ownerToken")){
			return navigate("/ownerlogin");	
		}
			fetch("http://localhost:3007/api/v1/owner",{
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token":cookie.get("ownerToken")
			}
		}).then(res=>res.json())
			.then(res=>{
				if(res.status==="ok"){
					setName(res.data.hotelName);
				}else{
					navigate("/ownerlogin");
				}
			}).catch(e=>{
				console.log(e);
			})
		
		
	},[navigate]);
	

	return(
		<>
		<Header name={name} />
		<Outlet />
		<Footer />
		</>
	);
}

export default OwnerApp;
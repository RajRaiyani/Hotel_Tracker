import { useState } from "react";


var PopUp = (Component,props) => {
	const [flag,setFlag] = useState(false);
	
	function toggleFlag(){
		setFlag(!flag);
	}

	return [()=>(flag?<Component close={toggleFlag} {...props} />:<></>),toggleFlag];
}

export default PopUp;
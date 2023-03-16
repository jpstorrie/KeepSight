import {useNavigate} from "react-router-dom"

export default function Navbar(){

    const navigate = useNavigate()

    function handleClick(){
        fetch("/logout", {
            method: "DELETE"
        }).then(navigate("/login"))
    }

    return(
        <div className="flex-row  flex-nowrap">
            <h1>Navbar here</h1>
            {/* <button className="float-right" onClick={handleClick}>Logout</button> */}
        </div>
    )
}
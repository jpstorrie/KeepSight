import { useNavigate } from "react-router-dom"
import {BsLightbulbFill, BsLightbulbOffFill} from "react-icons/bs"

export default function Navbar({updateUser, user, toggleDarkMode, darkMode}) {

    const navigate = useNavigate()

    function handleClick() {
        fetch("/logout", {
            method: "DELETE"
        }).then(navigate("/login"))
    }

    if(!user){
        return (
            <div className="pr-2.5">
            <nav
                className="flex-wrap relative flex w-full justify-between bg-amber-500 py-2.5 shadow-md shadow-black/5 rounded-br-3xl">
                <div className="flex w-full flex-wrap  justify-between px-6">
                    {/* <a
                        className="hidden-arrow float right flex whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href=""
                        role="button"
                        aria-expanded="false">
                    </a> */}
                        <img
                            src="https://media.licdn.com/dms/image/D5603AQHu7Kj5X0ljIA/profile-displayphoto-shrink_200_200/0/1674073759784?e=1683158400&v=beta&t=QgI-3coAtrzRYgfYdxAvQvkLFarUmuH8kqqjlEHUqmI"
                            className="rounded-full float-right"
                            style={{ height: "25px", width: "25px" }}
                            />
                        <button style={{color: "#172b4d"}} onClick={toggleDarkMode}>{darkMode? <BsLightbulbFill/> : <BsLightbulbOffFill/>}</button>
                </div>
            </nav>
        </div>
        )
    }
    return (
        <div className="pr-2.5">
            <nav
                className="flex-wrap relative flex w-full justify-between bg-amber-500 py-2.5 shadow-md shadow-black/5 rounded-br-3xl">
                <div className="flex w-full flex-wrap  justify-between px-6">
                    {/* <a
                        className="hidden-arrow float right flex whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href=""
                        role="button"
                        aria-expanded="false">
                    </a> */}
                        <img
                            src="https://media.licdn.com/dms/image/D5603AQHu7Kj5X0ljIA/profile-displayphoto-shrink_200_200/0/1674073759784?e=1683158400&v=beta&t=QgI-3coAtrzRYgfYdxAvQvkLFarUmuH8kqqjlEHUqmI"
                            className="rounded-full float-right"
                            style={{ height: "25px", width: "25px" }}
                            />
                        <button></button>
                </div>
            </nav>
        </div>
    )
}
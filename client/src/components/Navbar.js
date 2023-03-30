import { useNavigate } from "react-router-dom"
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs"

export default function Navbar({ updateUser, user, toggleDarkMode, darkMode }) {

    const navigate = useNavigate()

    async function handleClick() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then(updateUser(null))
        .then(navigate("/"))
    }

    if (!user) {
        return (
            <div className="pr-2.5">
                <nav
                    className="flex-wrap flex w-full bg-amber-500 py-2.5 shadow-md shadow-black/5 rounded-br-3xl">
                        <div className="flex w-full flex-wrap justify-end px-6">
                        <button className="btn btn-xs" onClick={toggleDarkMode}>{darkMode ? <BsLightbulbFill /> : <BsLightbulbOffFill />}</button>
                    </div>
                </nav>
            </div>
        )
    }
    return (
        <div className="pr-3">
            <nav
                className="flex-wrap flex w-full bg-amber-500 py-2.5 shadow-md shadow-black/5 rounded-br-3xl">
                <div className="flex w-full px-6">
                <button onClick={()=>navigate("/")} className="drop-shadow-2xl text-neutral">ks</button>
                    <div className="ml-auto dropdown dropdown-end">
                        <label tabIndex={0} className="m-1">
                            <img
                            src="https://media.licdn.com/dms/image/D5603AQHu7Kj5X0ljIA/profile-displayphoto-shrink_200_200/0/1674073759784?e=1683158400&v=beta&t=QgI-3coAtrzRYgfYdxAvQvkLFarUmuH8kqqjlEHUqmI"
                            className="rounded-full float-right" style={{ height: "25px", width: "25px" }} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                            <li className="bg"><button  onClick={toggleDarkMode}>{darkMode ? <BsLightbulbFill /> : <BsLightbulbOffFill />}</button></li>
                            <li className="bg"><button onClick={()=>navigate("/")}>Children</button></li>
                            {/* <li className="bg"><button onClick={()=>navigate("/user/profile")}>Profile</button></li> */}
                            <li className="bg"><button onClick={handleClick}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
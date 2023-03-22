import {useNavigate} from "react-router-dom"
export default function ChildCard({child}){
        const navigate=useNavigate()

    return(
        <div className="transition duration-500 hover:scale-110 card w-64 bg-base-content m-4 border-4 border-accent-focus shadow-xl">
            <div className="avatar">
                <div className="px-10 pt-10">
                    <img src={child.pfp} className="w-12 rounded-full" />
                </div>
            </div>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-neutral-focus">{child.name}</h2>
                        <button onClick={()=>navigate(`/children/${child.id}`)} className="btn btn-primary">View</button>
                    <div className="card-actions">
                    </div>
                </div>
            </div>
    )
}
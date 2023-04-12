import { useEffect, useState } from "react"
import ChildCard from "./ChildCard";
import ChildForm from "./ChildForm";


export default function Children({ user }) {
    const [formVis, toggleFormVis] = useState(false);
    const [children, setChildren] = useState([]);
    const [picture, setPicture] = useState(null)
    const [name, setName] = useState("")

    useEffect(() => {
        fetch("/children")
            .then((r) => r.json())
            .then((data) => setChildren(data));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        if (picture == null) {
            return "please select a picture"
        }

        const formData = new FormData()
        formData.append("user_id", user.id)
        formData.append("pfp", picture)
        formData.append("name", name)

        fetch("/children", {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(child => {
                setChildren([...children, child])
                toggleFormVis(!formVis)
            });
    };

    const childCards = children ? children.map((child) => { return (<ChildCard key={child.id} child={child} />) }) : null

    if(children.length===0 && !formVis){
        return (<div className="flex-wrap justify-center pt-20">
            <h1 className="">LOOKS LIKE YOU DON'T HAVE ANY CHILDREN WITH YOUR ACCOUNT</h1>
            <button className="link" onClick={()=>toggleFormVis(!formVis)}>ADD SOME</button>
            </div>
        )
    }
    return (
        <div>
            <h1 className="font-bold text-2xl">Welcome {user.username}</h1>
            {formVis? null :
            <div className="pt-14 flex justify-center">
                {childCards}
            </div>}
            <div className="pt-4">
                <button className="btn btn-primary" onClick={() => toggleFormVis(!formVis)}>{formVis? "Go Back":"Add Child"}</button>
            </div>
            {formVis ? <ChildForm toggleFormVis={toggleFormVis} submitForm={submitForm} setName={setName} setPicture={setPicture}/> : null}
        </div>
    )
}
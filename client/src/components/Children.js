import { useEffect, useState } from "react"
import ChildCard from "./ChildCard";


export default function Children({ user }) {
    const [formVis, toggleFormVis] = useState(false);
    const [children, setChildren] = useState(null);
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

    if(children){
    return (
        <div>
            <div className="pt-4 pl-4">
                <button className="btn btn-primary" onClick={() => toggleFormVis(!formVis)}>Add Child</button>
            </div>
            {formVis ?
                <div className="input flex">
                    <form onSubmit={submitForm}>
                        <div>
                            <input required onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Child's Name" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pick a file</span>
                            </label>
                            <input required onChange={(e) => setPicture(e.target.files[0])} name="pfp" type="file" accept="image/*" placeholder="Profile Photo" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                : null}
            <div className="pt-14 flex justify-center" >
                {childCards}
            </div>
        </div>
    )
} else return (<h1 className="flex justify-center pt-20">LOOKS LIKE YOU DON'T HAVE ANY CHILDREN WITH YOUR ACCOUNT, TRY <a>ADDING SOME</a></h1>)
}
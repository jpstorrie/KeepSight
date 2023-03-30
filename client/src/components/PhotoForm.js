import { useState } from "react"
import {FaLongArrowAltLeft} from "react-icons/fa"

export default function PhotoForm({setPhotoVis, cID, addData}){
const [photo, setPhoto] = useState(null)
const [milestone, setMilestone] = useState(null)
const [notes, setNotes] = useState(null)
const [name, setName] = useState(null)

function handlePhotoSubmit(e){
    e.preventDefault()

    const formData = new FormData()
    formData.append("notes", notes)
    formData.append("name", name)
    formData.append("photo", photo)
    formData.append("milestone", milestone)
    formData.append("child_id", cID)

    fetch("/photos",{
        method: "POST",
        body: formData
    }).then(r=>r.json()
    .then(data=>addData(data)))
    .then(setPhotoVis(false))
}

return (
    <div className="flex">
            <button className="btn btn-primary mt-20"onClick={() => setPhotoVis(false)}><FaLongArrowAltLeft/>Go Back</button>
            <div className="relative left-44">
            <h1 className="font-bold">Add a Photo</h1>
            <form className="border-4 border-base-content rounded-xl" onSubmit={handlePhotoSubmit}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">WHAT DO YOU WANT TO CALL THIS ENTRY?</span>
                    </label>
                    <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setName(e.target.value)} />
                    <label className="label my-2">
                        <span className="label-text">JOT YOUR NOTES FOR THIS ENTRY HERE</span>
                    </label>
                    <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setNotes(e.target.value)} />
                    <label className="label my-2">
                        <span className="label-text">WHAT MILESTONE IS THIS FOR?</span>
                    </label>
                    <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setMilestone(e.target.value)} />
                    <label className="label my-2">
                        <span className="label-text">UPLOAD YOUR VIDEO HERE</span>
                    </label>
                    <input required type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="photo/*" placeholder="Photo" className="file-input file-input-bordered w-full max-w-xs"
                    />
                </div>
                    <button className="btn btn-outline m-2" type="submit">Submit</button>
            </form>
            </div>
        </div>
)}
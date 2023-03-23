import { useState } from "react"

export default function PhotoForm({setPhotoVis, cID}){
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
    .then(console.log))
    .then(setPhotoVis(false))
}

return (
<div>
    <button type="button" onClick={() => setPhotoVis(false)}>Go Back</button>
    <h1>PhotoForm</h1>
    <form onSubmit={handlePhotoSubmit}>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">What do you want to call this entry?</span>
            </label>
            <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setName(e.target.value)}/>
            <label className="label">
                <span className="label-text">Jot your notes for this entry here?</span>
            </label>
            <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setNotes(e.target.value)}/>
            <label className="label">
                <span className="label-text">What Milestone is this for?</span>
            </label>
            <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setMilestone(e.target.value)}/>
            <input required type="file" accept="image/*" placeholder="Profile Photo" className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e)=> setPhoto(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
)}
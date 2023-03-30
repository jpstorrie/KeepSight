import { useState } from "react"
import {FaLongArrowAltLeft} from "react-icons/fa"

export default function VideoForm({ setVideoVis, cID, addData }) {
    const [video, setVideo] = useState(null)
    const [milestone, setMilestone] = useState(null)
    const [notes, setNotes] = useState(null)
    const [name, setName] = useState(null)

    function handleVideoSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("notes", notes)
        formData.append("name", name)
        formData.append("video", video)
        formData.append("milestone", milestone)
        formData.append("child_id", cID)

        fetch("/videos", {
            method: "POST",
            body: formData
        }).then(r => r.json().then(data=>addData(data)))
        .then(setVideoVis(false))
    }
    return (
        <div className="flex">
            <button className="btn btn-primary mt-20"onClick={() => setVideoVis(false)}><FaLongArrowAltLeft/>Go Back</button>
            <div className="relative left-44">
            <h1 className="font-bold">Add a Video</h1>
            <form className="border-4 border-base-content rounded-xl" onSubmit={handleVideoSubmit}>
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
                    <input required type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" placeholder="Video" className="file-input file-input-bordered w-full max-w-xs"
                    />
                </div>
                    <button className="btn btn-outline m-2" type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}
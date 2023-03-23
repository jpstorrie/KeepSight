import { useState } from "react"

export default function VideoForm({ setVideoVis, cID }) {
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
        }).then(r => r.json().then(console.log))

        setVideoVis(false)
    }
    return (
        <div>
            <button onClick={() => setVideoVis(false)}>Go Back</button>
            <h1>Video Form</h1>
            <form onSubmit={handleVideoSubmit}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What do you want to call this entry?</span>
                    </label>
                    <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setName(e.target.value)} />
                    <label className="label">
                        <span className="label-text">Jot your notes for this entry here?</span>
                    </label>
                    <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setNotes(e.target.value)} />
                    <label className="label">
                        <span className="label-text">What Milestone is this for?</span>
                    </label>
                    <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setMilestone(e.target.value)} />
                    <input required type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" placeholder="Video" className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
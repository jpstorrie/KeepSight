import { useForm } from "react-hook-form"
import { useState } from "react"

export default function VideoForm({setVideoVis, cID}){
    const {register, handleSubmit} = useForm()
    const [video, setVideo] = useState(null)

    function handleVideoSubmit(data){
        data = {...data, ["video"]: video, ["child_id"]: cID}
        console.log(data)
        fetch("/videos", {
            method: "POST",
            body: data
        }).then(r=>r.json().then(console.log))

        setVideoVis(false)
    }
return(
    <div>
    <button onClick={() => setVideoVis(false)}>Go Back</button>
    <h1>Video Form</h1>
    <form onSubmit={handleSubmit(handleVideoSubmit)}>
    <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">What do you want to call this entry?</span>
        </label>
        <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
        {...register("name")}/>
        <label className="label">
            <span className="label-text">Jot your notes for this entry here?</span>
        </label>
        <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
        {...register("notes")}/>
        <label className="label">
            <span className="label-text">What Milestone is this for?</span>
        </label>
        <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
        {...register("milestone")}/>
        <input required type="file" onChange={(e)=> setVideo(e.target.files[0])} accept="video/*" placeholder="Video" className="file-input file-input-bordered w-full max-w-xs"
        />
        <button type="submit">Submit</button>
    </div>
    </form>
</div>
)
}
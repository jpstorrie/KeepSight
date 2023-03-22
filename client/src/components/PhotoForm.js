import {useForm} from "react-hook-form"
import { useState } from "react"

export default function PhotoForm({setPhotoVis, cID}){
const {register, handleSubmit} = useForm()
const [photo, setPhoto] = useState(null)

function handlePhotoSubmit(data){
    data = {...data, ["photo"]: photo, ["child_id"]: cID}
    console.log(data)

    setPhotoVis(false)
}

return (
<div>
    <button onClick={() => setPhotoVis(false)}>Go Back</button>
    <h1>PhotoForm</h1>
    <form onSubmit={handleSubmit(handlePhotoSubmit)}>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">What do you want to call this entry?</span>
            </label>
            <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                {...register("name")} />
            <label className="label">
                <span className="label-text">Jot your notes for this entry here?</span>
            </label>
            <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
                {...register("notes")} />
            <label className="label">
                <span className="label-text">What Milestone is this for?</span>
            </label>
            <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                {...register("milestone")} />
            <input required type="file" accept="image/*" placeholder="Profile Photo" className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e)=> setPhoto(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
)}
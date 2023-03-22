import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
export default function ChildPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [child, setChild] = useState(null)
    //visibility of forms
    const [photoVis, setPhotoVis] = useState(false)
    const [journalVis, setJournalVis] = useState(false)
    const [videoVis, setVideoVis] = useState(false)

    const {register, handleSubmit} = useForm()

    // TODO: get all photos, videos, and journals and put them into one
    // entry array to be sorted and displayed
    // const [entries, setEntries] = useState(null)

    useEffect(() => {
        fetch(`/children/${id}`)
            .then(r => r.json())
            .then(setChild)
    }, [])

    function handleVideoSubmit(data){
        e.preventDefault()
        console.log(data)
    }
    function handlePhotoSubmit(data){
        e.preventDefault()
        console.log(data)
    }
    function handleJournalSubmit(data){
        e.preventDefault()
        console.log(data)
    }


    if (child) {
        return (
            <div className="flex">
                <div className="card bg-primary w-36 h-52 m-4">
                    <div className="avatar">
                        <div className="px-10 py-10">
                            <img src={child.pfp} className="w-24 rounded-full" />
                        </div>
                    </div>
                    <div className="card-body items-center h-24 pt-0 text-center">
                        <h2 className="card-title ">{child.name}</h2>
                    </div>
                </div>
                {photoVis ?
                    <div>
                        <button onClick={() => setPhotoVis(false)}>Go Back</button>
                        <h1>PhotoForm</h1>
                        <form onSubmit={handleSubmit(handlePhotoSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What do you want to call this entry?</span>
                            </label>
                            <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" 
                            {...register("name")}/>
                            <label className="label">
                                <span className="label-text">What do you want to call this entry?</span>
                            </label>
                            <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" 
                            {...register("notes")}/>
                            <label className="label">
                                <span className="label-text">What Milestone is this for?</span>
                            </label>
                            <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                            {...register("milestone")}/>
                        </div>
                        </form>
                    </div> : null}

                {videoVis ?
                    <div>
                        <button onClick={() => setVideoVis(false)}>Go Back</button>
                        <h1>Video Form</h1>
                        <form onSubmit={handleSubmit(handleVideoSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        </form>
                    </div> : null}

                {journalVis ?
                    <div>
                        <button onClick={() => setJournalVis(false)}>Go Back</button>
                        <h1>Journal Form</h1>
                        <form onSubmit={handleSubmit(handleJournalSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        </form>
                    </div> : null}

                {(photoVis || videoVis || journalVis) ? null :
                    <div className="entry-box">
                        <div className="button-group">
                            <button onClick={() => setPhotoVis(true)}>New Photo</button>
                            <button onClick={() => setVideoVis(true)}>New Video</button>
                            <button onClick={() => setJournalVis(true)}>New Journal</button>
                        </div>
                        <div className="entries">
                            { }
                        </div>
                    </div>}
            </div>
        )
    }
    else { return (<h1 className="flex justify-center pt-20">LOADING...</h1>) }
}
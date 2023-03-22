import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
export default function ChildPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [child, setChild] = useState(null)
    //visibility of forms
    const [photoVis, setPhotoVis] = useState(false)
    const [journalVis, setJournalVis] = useState(false)
    const [videoVis, setVideoVis] = useState(false)
    //form input values
    // const [journalForm, setJournalForm] = useState(null)
    // const [photoForm, setPhotoForm] = useState(null)
    // const [videoForm, setVideoForm] = useState(null)

    // TODO: get all photos, videos, and journals and put them into one
    // entry array to be sorted and displayed
    // const [entries, setEntries] = useState(null)

    useEffect(() => {
        fetch(`/children/${id}`)
            .then(r => r.json())
            .then(setChild)
    }, [])


    // const submitForm = (e) => {
    //     e.preventDefault();
    //     if (picture == null) {
    //         return "please select a picture"
    //     }

        // const formData = new FormData()
        // formData.append("user_id", user.id)
        // formData.append("pfp", picture)
        // formData.append("name", name)

        // fetch("/children", {
        //     method: "POST",
        //     body: formData
        // })
        //     .then(r => r.json())
        //     .then(child => {
                // setChildren([...children, child])
                // toggleFormVis(!formVis)
    //         });
    // };


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
                        <form>
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

                {videoVis ?
                    <div>
                        <button onClick={() => setVideoVis(false)}>Go Back</button>
                        <h1>Video Form</h1>
                        <form>
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
                        <form>
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
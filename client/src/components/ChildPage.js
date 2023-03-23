import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import VideoForm from "./VideoForm"
import PhotoForm from "./PhotoForm"
import JournalForm from "./JournalForm"

export default function ChildPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [child, setChild] = useState(null)
    //visibility of forms
    const [photoVis, setPhotoVis] = useState(false)
    const [journalVis, setJournalVis] = useState(false)
    const [videoVis, setVideoVis] = useState(false)


    // TODO: get all photos, videos, and journals and put them into one
    // entry array to be sorted and displayed
    // const [entries, setEntries] = useState(null)
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetch(`/children/${id}`)
            .then(r => r.json())
            .then(setChild)
    }, [])

    useEffect(()=>{
        fetch("/photos")
        .then(r => r.json().then(setPhotos))
    },[])


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

                {photoVis ? <PhotoForm cID={child.id} setPhotoVis={setPhotoVis}/> : null}
                {videoVis ? <VideoForm cID={child.id} setVideoVis={setVideoVis}/>: null}
                {journalVis ? <JournalForm cID={child.id} setJournalVis={setJournalVis}/>: null}

                {(photoVis || videoVis || journalVis) ? null :
                    <div className="entry-box">
                        <div className="button-group">
                            <button onClick={() => setPhotoVis(true)}>New Photo</button>
                            <button onClick={() => setVideoVis(true)}>New Video</button>
                            <button onClick={() => setJournalVis(true)}>New Journal</button>
                        </div>
                        <div className="entries">
                            {/* <img src={photos[0].file}  /> */}
                        </div>
                    </div>}
            </div>
        )
    }
    else { return (<h1 className="flex justify-center pt-20">LOADING...</h1>) }
}
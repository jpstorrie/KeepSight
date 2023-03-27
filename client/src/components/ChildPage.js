import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import VideoForm from "./VideoForm"
import PhotoForm from "./PhotoForm"
import JournalForm from "./JournalForm"
import JournalCard from "./JournalCard"
import VideoCard from "./VideoCard"
import PhotoCard from "./PhotoCard"

export default function ChildPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [child, setChild] = useState(null)
    //visibility of forms
    const [photoVis, setPhotoVis] = useState(false)
    const [journalVis, setJournalVis] = useState(false)
    const [videoVis, setVideoVis] = useState(false)

    const [entries, setEntries] = useState(null)

    useEffect(() => {
        fetch(`/children/${id}`)
            .then(r => r.json())
            .then(data=>{
                setChild(data)
                setEntries(data.videos.concat(data.journals.concat(data.photos)))
            })
    }, [])
    console.log(entries)

    // if(entries){
        const mappedEntries = entries ? entries.map(entry => {
        if(entry.video){
            return <VideoCard entry={entry}/>
        }
        if(entry.photo){
            return <PhotoCard entry={entry}/>
        }
        else{
            return <JournalCard entry={entry}/>
        }
    }) : null
    // }

    if (child && entries) {
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

                {photoVis ? <PhotoForm cID={child.id} setPhotoVis={setPhotoVis} /> : null}
                {videoVis ? <VideoForm cID={child.id} setVideoVis={setVideoVis} /> : null}
                {journalVis ? <JournalForm cID={child.id} setJournalVis={setJournalVis} /> : null}

                {(photoVis || videoVis || journalVis) ? null :
                    <div className="entry-box">
                        <div className="button-group">
                            <button onClick={() => setPhotoVis(true)}>New Photo</button>
                            <button onClick={() => setVideoVis(true)}>New Video</button>
                            <button onClick={() => setJournalVis(true)}>New Journal</button>
                        </div>
                        <div className="absolute rounded-xl overflow-auto right-0 m-4 bottom-0 border-4 border-base-content border-spacing-4 w-10/12 h-5/6">
                            <div className="flex h-7 bg-secondary">
                                <h4>Name</h4>
                                <h4>Type</h4>
                                <h4>Date</h4>
                            </div>
                            <div className="">
                            {mappedEntries}
                            </div>
                            {/* {sortedEntries} */}
                        </div>
                    </div>}
            </div>
        )
    }
    else { return (<h1 className="flex justify-center pt-20">LOADING...</h1>) }
}
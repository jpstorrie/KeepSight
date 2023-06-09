import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import VideoForm from "./VideoForm"
import PhotoForm from "./PhotoForm"
import JournalForm from "./JournalForm"
import JournalCard from "./JournalCard"
import VideoCard from "./VideoCard"
import PhotoCard from "./PhotoCard"
// import { BiSearchAlt } from "react-icons/bi"

export default function ChildPage() {
    const { id } = useParams()

    const [searchInput, setSearchInput] = useState("")
    const [option, setOption] = useState("all")
    const [child, setChild] = useState(null)
    //visibility of forms
    const [photoVis, setPhotoVis] = useState(false)
    const [journalVis, setJournalVis] = useState(false)
    const [videoVis, setVideoVis] = useState(false)

    const [entries, setEntries] = useState(null)

    useEffect(() => {
        fetch(`/children/${id}`)
            .then(r => r.json())
            .then(data => {
                setChild(data)
                setEntries(data.videos.concat(data.journals.concat(data.photos)))
            })
    }, [])

    function addData(item){
        setEntries([...entries, item])
    }

    function dateFormatter(item) {
        const date = new Date(item.created_at)
        let dateFormat = []
        dateFormat.push(date.getMonth() + 1, date.getUTCDate(), date.getFullYear())
        dateFormat = dateFormat.join('-')
        return dateFormat
    }

    const optionFilter = entries ? entries.filter(entry => {
        if(option==="all"){return entry}
        else if(option === "journal" && entry.journal){return entry}
        else if(option === "photo" && entry.photo){return entry}
        else if(option === "video" && entry.video){return entry}
    })
    :null;

    const searchFilter = entries ? optionFilter.filter((entry) => {
        const entryDate = dateFormatter(entry)
        if (entry.name.toLowerCase().includes(searchInput.toLowerCase()) || entryDate.includes(searchInput)) {
            return entry
        }
        else return null
    }) : null;


    const sortedEntries = entries ? searchFilter.sort(function (a, b) {
        return a.created_at.localeCompare(b.created_at);
    }) : null;

    const mappedEntries = sortedEntries ? sortedEntries.map(entry => {
        if (entry.video) {
            return <VideoCard key={`${entry.id}-video`} dateFormatter={dateFormatter} entry={entry} />
        }
        if (entry.photo) {
            return <PhotoCard key={`${entry.id}-photo`} dateFormatter={dateFormatter} entry={entry} />
        } 
        else {
            return <JournalCard key={`${entry.id}-journal`} dateFormatter={dateFormatter} entry={entry} />
        }
    }) : null;


    if (child && entries) {
        return (
            <div className="flex w-max h-max">
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

                {photoVis ? <PhotoForm cID={child.id} addData={addData} setPhotoVis={setPhotoVis} /> : null}
                {videoVis ? <VideoForm cID={child.id} addData={addData}  setVideoVis={setVideoVis} /> : null}
                {journalVis ? <JournalForm cID={child.id} addData={addData} setJournalVis={setJournalVis} /> : null}

                {(photoVis || videoVis || journalVis) ? null :
                    <div>
                        <div className="button-group">
                            <button className="btn btn-sm m-2 btn-outline md:relative md:left-6 md:top-4" onClick={() => setPhotoVis(true)}>New Photo</button>
                            <button className="btn btn-sm m-2 btn-outline md:relative md:left-6 md:top-4" onClick={() => setVideoVis(true)}>New Video</button>
                            <button className="btn btn-sm m-2 btn-outline md:relative md:left-6 md:top-4" onClick={() => setJournalVis(true)}>New Journal</button>
                            <input onChange={(e) => setSearchInput(e.target.value)}
                                className="bg-primary absolute input right-8 my-3" placeholder={`Search`} />
                        </div>
                        <div className="md:fixed my-8 mr-4 ml-8 rounded-xl overflow-auto border-4 border-base-content"
                        style={{height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
                            <div className="flex h-8 bg-secondary justify-between pl-2 pr-4 pt-1">
                                <h4>Name</h4>
                                <select onChange={(e)=>setOption(e.target.value)} className="h-6" value={"DEFAULT"}>
                                    <option disabled hidden value="DEFAULT">Type</option>
                                    <option value="all">All</option>
                                    <option value="journal">Journals</option>
                                    <option value="photo">Photos</option>
                                    <option value="video">Videos</option>
                                </select>
                                <h4>Date</h4>
                            </div>
                            {mappedEntries}
                        </div>
                    </div>}
            </div>
        )
    }
    else { return (<h1 className="flex justify-center pt-20">LOADING...</h1>) }
}
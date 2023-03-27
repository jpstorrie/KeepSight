import {useState} from "react"
export default function PhotoCard({ entry }) {
    console.log(entry);
    const [vis, setVis] = useState(false)
    return (
        <div className="bg-base-300 h-10">
            <label onClick={()=>setVis(!vis)} className="btn btn-sm">{entry.name}</label>
            <input type="checkbox" className="modal-toggle" />

        {vis?
            <div id="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{entry.name}</h3>
                    <h5 className="italic font-thin">{entry.milestone}</h5>
                    <p className="py-4">{entry.notes}</p>
                </div>
            </div>
            : null}
        </div>
    )
}
import ReactModal from "react-modal"
import { useState } from "react"
export default function JournalCard({ dateFormatter, entry }) {
    const [vis, setVis] = useState(false)

    return (
        <div className="">
            <div onClick={() => setVis(true)} className="bg-base-300 h-10 flex justify-center border-base-100 border border-dashed">
                <h3 className="absolute left-1">{entry.name}</h3>
                <h3 className="justify-center text-center">Journal</h3>
                <h3 className="absolute right-1">{dateFormatter(entry)}</h3>
            </div>
            <ReactModal isOpen={vis}>
                <h1 className=" p-3 m-2 font-bold"> Title: <h1 className="skew-y-3 transform bg-base-200 p-3 m-3 inline-flex font-bold">{entry.name}</h1></h1>
                <h1 className="font-light italic translate-x-3">Milestone: {entry.milestone}</h1>
                <div className="border-box my-4 mr-8 h-24 shadow-2xl rounded border-4 border-neutral/50 bg-base-100/80">
                    <p className="font-semibold">{entry.journal}</p>
                </div>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setVis(false)}>✕</button>
            </ReactModal>
        </div>
    )
}
export default function VideoCard({ entry }) {
    return (
        <div className="bg-base-300 h-10">
            <label className="btn btn-sm">{entry.name}</label>

            <input type="checkbox" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{entry.name}</h3>
                    <p className="py-4">{entry.notes}</p>
                    <video width="320" height="240" controls>
                    <source src={entry.video} title={entry.name}/>
                    </video>
                    <div className="modal-action">
                    < a href={entry.video}>Download</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
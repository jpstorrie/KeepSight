export default function JournalCard({ entry }) {
    return (
        <div className="bg-base-300 h-10 border-0.5">
            <label htmlFor="my-modal-4" className="btn btn-sm">{entry.name}</label>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">{entry.name}</h3>
                    <h5 className="italic font-thin">{entry.milestone}</h5>
                    <p className="py-4">{entry.journal}</p>
                </label>
            </label>
        </div>
    )
}
import { useForm } from "react-hook-form"
import {FaLongArrowAltLeft} from "react-icons/fa"
export default function JournalForm({ setJournalVis, cID, addData }) {
    const { register, handleSubmit } = useForm()

    function handleJournalSubmit(data) {
        data = { ...data, ["child_id"]: cID }

        fetch("/journals", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        }).then(r => r.json().then(data=>addData(data)))
            .then(setJournalVis(false))
    }



    return (
        <div>
            <button className="btn btn-primary"onClick={() => setJournalVis(false)}><FaLongArrowAltLeft/>Go Back</button>
            <h1>Journal Form</h1>
            <form onSubmit={handleSubmit(handleJournalSubmit)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What would you like to name this journal?</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        {...register("name")} />
                    <label className="label">
                        <span className="label-text">What Milestone is this for?</span>
                    </label>
                    <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                    {...register("milestone")}/>
                    <label className="label">
                        <span className="label-text">Write your journal here...</span>
                    </label>
                    <textarea type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        {...register("journal")} />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
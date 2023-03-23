import {useForm} from "react-hook-form"

export default function JournalForm({setJournalVis, cID}){
    const {register, handleSubmit} = useForm()

    function handleJournalSubmit(data){
        data = {...data, ["child_id"]: cID}

        fetch("/journals", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        }).then(r=>r.json().then(console.log))
        .then(setJournalVis(false))
    }



return(
<div>
    <button onClick={() => setJournalVis(false)}>Go Back</button>
    <h1>Journal Form</h1>
    <form onSubmit={handleSubmit(handleJournalSubmit)}>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">What would you like to name this journal?</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
            {...register("name")}/>
            <label className="label">
                <span className="label-text">Write your journal here...</span>
            </label>
            <textarea type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
            {...register("journal")}/>
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
)}
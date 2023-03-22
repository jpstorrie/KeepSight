import {useForm} from "react-hook-form"

export default function JournalForm({setJournalVis}){
    const {register, handleSubmit} = useForm()

    function handleJournalSubmit(data){
        console.log(data)

        setJournalVis(false)
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
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label">
                <span className="label-text">What is your name?</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
    </form>
</div>
)}
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

        <div className="flex">
            <button className="btn btn-primary mt-20"onClick={() => setJournalVis(false)}><FaLongArrowAltLeft/>Go Back</button>
            <div className="relative left-44">
            <h1 className="font-bold">JOURNAL FORM</h1>
            <form className="border-4 border-base-content rounded-xl" onSubmit={handleSubmit(handleJournalSubmit)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label mt-2">
                        <span className="label-text">WHAT WOULD YOU LIKE TO NAME THIS JOURNAL?</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        {...register("name")} />
                    <label className="label m-3">
                        <span className="label-text">WHAT MILESTONE IS THIS FOR?</span>
                    </label>
                    <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
                    {...register("milestone")}/>
                    <label className="label m-3">
                        <span className="label-text">WRITE YOUR JOURNAL HERE...</span>
                    </label>
                    <textarea type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        {...register("journal")} />
                    <button className="btn btn-outline m-2" type="submit">Submit</button>
                </div>
            </form>
            </div>
        </div>
        )
    }
//     <div className="flex">
//     <button className="btn btn-primary"onClick={() => setPhotoVis(false)}><FaLongArrowAltLeft/>Go Back</button>
//     <div className="relative left-44">
//     <h1 className="font-bold">Add a Photo</h1>
//     <form className="border-4 border-base-content rounded-xl" onSubmit={handlePhotoSubmit}>
//         <div className="form-control w-full max-w-xs">
//             <label className="label">
//                 <span className="label-text">WHAT DO YOU WANT TO CALL THIS ENTRY?</span>
//             </label>
//             <input required type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setName(e.target.value)} />
//             <label className="label my-2">
//                 <span className="label-text">JOT YOUR NOTES FOR THIS ENTRY HERE</span>
//             </label>
//             <textarea required placeholder="Notes" className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setNotes(e.target.value)} />
//             <label className="label my-2">
//                 <span className="label-text">WHAT MILESTONE IS THIS FOR?</span>
//             </label>
//             <input type="text" placeholder="Milestone" className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setMilestone(e.target.value)} />
//             <label className="label my-2">
//                 <span className="label-text">UPLOAD YOUR VIDEO HERE</span>
//             </label>
//             <input required type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="photo/*" placeholder="Photo" className="file-input file-input-bordered w-full max-w-xs"
//             />
//         </div>
//             <button className="btn btn-outline m-2" type="submit">Submit</button>
//     </form>
//     </div>
// </div>
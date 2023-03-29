
export default function ChildForm({ setName, setPicture, submitForm, toggleFormVis }) {
    return (
        <div className="input flex justify-center pt-5">
            <form onSubmit={submitForm}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input className="input input-bordered w-full max-w-xs"
                        required onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Child's Name" />
                </div>
                <div className="">
                    <label className="label">
                        <span className="label-text">Profile Picture</span>
                    </label>
                    <input required onChange={(e) => setPicture(e.target.files[0])} name="pfp" type="file" accept="image/*" placeholder="Profile Photo"
                        className="file-input file-input-bordered w-full max-w-xs" />
                </div>
                <button className="m-4 btn btn-active btn-ghost" type="submit">Add Child</button>
            </form>
        </div>
    )
}
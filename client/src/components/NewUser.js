import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ValidationCard from "./ValidationCard"

export default function NewUser({ updateUser }) {
  const navigate = useNavigate()

  const [isVis, setIsVis] = useState(false);
  const [password, setPassword] = useState("");
  const [verification, setVer] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();
  const [recieveEmails, setRecieveEmails] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: username, password: password })
  const [validCardVis, setValidCardVis] = useState(false);

console.log(pfp)

  useEffect(() => {
    setLoginForm({ username: username, password: password })
  }, [username, password])


  function handleNewUser(e) {
    e.preventDefault();
    const newUserForm = new FormData();
    newUserForm.append("username", username)
    newUserForm.append("email", email)
    newUserForm.append("password", password)
    newUserForm.append("recieve_emails", recieveEmails)
    newUserForm.append("pfp", pfp)

    fetch("/users", {
      method: "POST",
      body: newUserForm
    })
      .then(r => {
        if (r.ok) {
          r.json()
            .then(handleLogin)
        }
      })
  }

  function handleLogin() {
    fetch("/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginForm)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            updateUser(user)
            navigate("/")
          })
        }
        else { r.json().then(message => console.log(message.error)) }
      })
  }

  return (
    <div className="grid justify-items-center h-full">
      <div className="m-4 border-4 rounded-lg my-4 md:w-11/12 md:p-4 border-neutral-content bg-base-200">
        <form
          onSubmit={(e) => { handleNewUser(e) }}
          autoComplete="on">

          <div className="flex relative">
            <div className="form-control w-full max-w-xs">
              <label className="label pb-0 ml-4">
                <h1 className="label-text">Username</h1>
              </label>
              <input
                className="input input-lg input-bordered bg-base-300 mx-4 mb-4"
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                autoComplete="username"
                title="Please add a UserName" />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label pb-0 ml-4">
                <h1 className="label-text">Email</h1>
              </label>
              <input
                className="input input-lg input-bordered bg-base-300 mx-4 mb-4"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email@email.com"
                autoComplete="username" />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label pb-0 ml-4">
                <h1 className="label-text">Pick a Profile Picture</h1>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-xs bg-base-300 float-left mx-4 mb-4"
                onChange={(e) => setPfp(e.target.files[0])}
                accept="image/*"
                required
              />
            </div>
          </div>


          <div className="flex relative">
            <div className="form-control w-full max-w-xs">
              <label className="label pb-0 ml-4">
                <h1 className="label-text">Password</h1>
              </label>
              <input
                onFocus={() => setValidCardVis(true)}
                onBlur={() => setValidCardVis(false)}
                className="input input-lg input-bordered bg-base-300 mx-4 mb-4"
                type={isVis ? "text" : "password"}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label pb-0 ml-4">
                <h1 className="label-text">Verify Password</h1>
              </label>
              <input
                onFocus={() => setValidCardVis(true)}
                onBlur={() => setValidCardVis(false)}
                className="input input-lg input-bordered bg-base-300 mx-4 mb-4"
                type={isVis ? "text" : "password"}
                required
                placeholder="Verify Password"
                onChange={(e) => setVer(e.target.value)}
                autoComplete="current-password"
                pattern={password}
                title="Passwords must match"
              />
            </div>

            <button type="button" className="text-2xl absolute left-64 my-12" onClick={() => setIsVis(!isVis)}>
              {isVis ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>


            <div className="mx-4">
              <label className="label">
                <h1 className="label-text">Recieve emails when an entry is uploaded?</h1>
              </label>
              <label className="swap w-1/2 bg-base-300 rounded-lg text-xl">
                <input
                  onClick={() => { setRecieveEmails(!recieveEmails) }}
                  type="checkbox"
                />
                <div className="swap-on font-semibold">Yes</div>
                <div className="swap-off font-semibold">No</div>
              </label>
            </div>
          </div>

          {validCardVis ? <ValidationCard password={password} verification={verification} /> : null}

        <div className="flex justify-center">
          <button className="btn btn-outline" type="submit">Create Account</button>
        </div>

        </form>
      </div>
      <h3>Already have an account? <button className="btn" onClick={() => navigate("/")}>Login</button></h3>
    </div>
  );
}

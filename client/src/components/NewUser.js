import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ValidationCard from "./ValidationCard"

export default function NewUser({ updateUser }) {
  const navigate = useNavigate()

  const [isVis, setIsVis] = useState(false);
  const [password, setPassword] = useState(null);
  const [verification, setVer] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();
  const [recieveEmails, setRecieveEmails] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: username, password: password })
  const [validCardVis, setValidCardVis] = useState(false);



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
          <input
            className="input input-lg input-bordered bg-base-300 m-4"
            required
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            autoComplete="username" />
          <input
            className="input input-lg input-bordered bg-base-300 m-4"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email@email.com"
            autoComplete="username" />
          <div
            className="mb-4 flex relative"
            onFocus={() => setValidCardVis(true)}
            onBlur={() => setValidCardVis(false)}
          >
            <input
              className="input input-lg input-bordered bg-base-300 m-4"
              type={isVis ? "text" : "password"}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <input
              className="input input-lg input-bordered bg-base-300 m-4"
              type={isVis ? "text" : "password"}
              required
              placeholder="Verify Password"
              onChange={(e)=>setVer(e.target.value)}
              autoComplete="current-password"
            />
            <button type="button" className="text-2xl absolute left-60 my-9" onClick={() => setIsVis(!isVis)}>
              {isVis ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-xs bg-base-300 float-left m-4"
            onChange={(e) => setPfp(e.target.files[0])}
            accept="image/*"
          />
          <div className="bg-base-300">
            <h3>Would you like to recieve emails when you upload an entry?</h3>
            <label className="swap">
              <input
                onClick={() => { setRecieveEmails(!recieveEmails) }}
                type="checkbox"
              />
              <div className="swap-on">YES</div>
              <div className="swap-off">NO</div>
            </label>
          </div>
          <button className="btn btn-outline" type="submit">Create Account</button>
        </form>
        {validCardVis ? <ValidationCard password={password} verification={verification} /> : null}
      </div>
      <h3>Already have an account? <button className="btn" onClick={() => navigate("/")}>Login</button></h3>
    </div>
  );
}

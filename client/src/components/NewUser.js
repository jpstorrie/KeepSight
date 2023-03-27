import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NewUser({ updateUser }) {
  const navigate = useNavigate()

  const [recieveEmails, setRecieveEmails] = useState(false);
  const initVals = { username: "", email: "", password: "", recieveEmails: recieveEmails }
  const [loginForm, setLoginForm] = useState({username: "", password: "",})
  const [newUserForm, setNewUserForm] = useState(initVals)
  const [isVis, setIsVis] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target
    setNewUserForm({ ...newUserForm, [name]: value })
    if (name === "username" || name === "password") {
    setLoginForm({ ...loginForm, [name]: value })
    }
  }

  function handleLogin(){
    fetch("/login", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(loginForm)
    })
    .then(r=>{
      if(r.ok){
        r.json().then(user=>{
        updateUser(user)
        navigate("/")
    })
  }
  else{r.json().then(message=>console.log(message.error))}
  })
  }

  function handleNewUser(e) {
    e.preventDefault()
    // setNewUserForm({ ...newUserForm, recieve_emails: recieveEmails })
    console.log(newUserForm)

    fetch("/users", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(newUserForm)
    })
    .then(r=>r.json())
    .then(data=>console.log(data))
    .then(handleLogin)
  }

  return (
    <div>
      <div className="m-4 flex justify-center rounded border-2 border-neutral-content">
        <form onSubmit={(e) => {
          // handleLogin
          handleNewUser(e)
        }} autoComplete="on" className="flex-wrap">
          <input
            className="input input-bordered bg-base-300"
            name="username"
            required
            onChange={handleChange}
            type="text"
            placeholder="Username"
            autoComplete="username" />
          <input
            className="input input-bordered bg-base-300"
            name="email"
            required
            onChange={handleChange}
            type="email"
            placeholder="Email@email.com"
            autoComplete="username" />
          <div className="mb-4 flex relative">
            <input
              className="input input-bordered bg-base-300"
              type={isVis ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button type="button" className="absolute left-48 my-4" onClick={() => setIsVis(!isVis)}>
              {isVis ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
            <h3>Would you like to recieve emails when you upload an entry?</h3>
            <label className="swap">
            <input onClick={()=> {
              setRecieveEmails(!recieveEmails)
              }} type="checkbox" />
              <div className="swap-on">YES</div>
              <div className="swap-off">NO</div>
            </label>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
      <h3>Already have an account? <button className="btn" onClick={() => navigate("/users/new")}>Login</button></h3>
    </div>
  );
}

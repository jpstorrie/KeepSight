import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NewUser({ updateUser }) {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({username: "", password: "",})
  const [isVis, setIsVis] = useState(false);
  // form states
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState();
  const [recieveEmails, setRecieveEmails] = useState(false);

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
    .then(r=>{
      if(r.ok){
        r.json()
        .then(data=>console.log(data))
        .then(setLoginForm({...loginForm, username: username, password: password}))
        .then(handleLogin)
      }
    })
  }

  return (
    <div className="grid justify-items-center h-full">
      <div className="m-4 flex justify-center border-4 rounded-lg my-4 md:w-5/12 md:p-4 border-neutral-content bg-base-200">
        <form
          onSubmit={(e) =>{handleNewUser(e)}}
          autoComplete="on">
          <input
            className="input input-bordered bg-base-300"
            required
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            autoComplete="username" />
          <input
            className="input input-bordered bg-base-300"
            name="email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email@email.com"
            autoComplete="username" />
          <div className="mb-4 flex relative">
            <input
              className="input input-bordered bg-base-300"
              type={isVis ? "text" : "password"}
              required
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="button" className="absolute left-48 my-4" onClick={() => setIsVis(!isVis)}>
              {isVis ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs bg-base-300"
              onChange={(e)=>setPfp(e.target.files[0])}
              accept="image/*"
            />
            <h3>Would you like to recieve emails when you upload an entry?</h3>
            <label className="swap">
              <input
                onClick={()=> {setRecieveEmails(!recieveEmails)}}
                type="checkbox"
              />
              <div className="swap-on">YES</div>
              <div className="swap-off">NO</div>
            </label>
          <button type="submit">Create Account</button>
        </form>
      </div>
      <h3>Already have an account? <button className="btn" onClick={() => navigate("/")}>Login</button></h3>
    </div>
  );
}

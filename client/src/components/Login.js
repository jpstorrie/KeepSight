import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

export default function Login({updateUser, user}) {

  const navigate = useNavigate()
  const initVals = { username: "", password:"" }

  const [loginForm, setLoginForm] = useState(initVals)
  const [isVis, setIsVis] = useState(false);

  function handleChange(e){
    const {name, value} = e.target
    setLoginForm({...loginForm, [name]: value})
  }

  function handleLogin(e){
    e.preventDefault()
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

  if(user){
    return (
    <div className="flex justify-center">
    <h1>Looks like you're already logged in!</h1>
    <h4>Go to the <a href="/" className="link">Homepage</a></h4>
    </div>
    )
  }

  return (
    <div>
    <div className="m-4 flex justify-center rounded border-2 border-neutral-content">
      <form onSubmit={handleLogin} autoComplete="on" className="flex-wrap">
        <input
        className="input input-bordered bg-base-300"
        name="username"
        onChange={handleChange}
        type="text"
        placeholder="Username"
        autoComplete="username"/>
        <div className="mb-4 flex relative">
          <input
            className="input input-bordered bg-base-300"
            type={isVis? "text":"password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button type="button" className="absolute right-1 my-4" onClick={()=>setIsVis(!isVis)}>
            {isVis? <AiFillEye /> : <AiFillEyeInvisible/>}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
      <h3>Don't have an account? <button className="btn" onClick={()=>navigate("/users/new")}>Create one!</button></h3>
    </div>
  );
}
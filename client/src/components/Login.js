import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

export default function Login({updateUser, user, darkMode}) {

  const navigate = useNavigate()
  const initVals = { username: null, password: null }

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
    <div className="grid justify-items-center ">
      <div className="flex-wrap text-center">
        <h1 className="pt-3 font-">WELCOME TO KEEPSIGHT!</h1>
        <h1 className="pt-1 font-">PLEASE LOGIN</h1>
      </div>
    <div className="m-4 flex justify-center border-4 rounded-lg my-4 md:h-full md:w-6/12 md:p-4 border-neutral-content bg-base-200">
      <form onSubmit={handleLogin} autoComplete="on" className="flex-wrap">
        <input
        className="input input-bordered bg-base-300"
        name="username"
        onChange={handleChange}
        type="text"
        placeholder="Username"
        autoComplete="username"/>
        <div className="mb-4 flex relative mt-3">
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
        <button className="relative left-16 btn btn-secondary" type="submit">Login</button>
      </form>
    </div>
    <div className="m-10 flex">
      <h3 className="relative top-1 pr-2">Don't have an account?</h3>
      <button className={darkMode ? "btn btn-sm btn-outline btn-primary" : "btn btn-sm btn-outline"} onClick={()=>navigate("/users/new")}>Create one!</button>
    </div>
    </div>
  );
}
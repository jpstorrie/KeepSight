import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

export default function Login({updateUser}) {

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

  return (
    <div>
      <form onSubmit={handleLogin} autoComplete="on">
        <input
        name="username"
        onChange={handleChange}
        type="text"
        placeholder="Username"
        autoComplete="username"/>
        <input
          type={isVis? "text":"password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="button" className="flex justify-around items-center" onClick={()=>setIsVis(!isVis)}>
          {isVis? <AiFillEye /> : <AiFillEyeInvisible/>}
        </button>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

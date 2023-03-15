import { Icon } from "react-icons-kit";
import {eyeOff, eye} from "react-icons-kit/feather";
import {useState} from "react"

export default function Login() {

  const initVals = { username: "", email:"", password:"" }

  const [loginForm, setLoginForm] = useState(initVals)
  const [isVis, setIsVis] = useState(false);

  function handleChange(e){
    const {name, value} = e.target
    setLoginForm({...loginForm, [name]: value})
  }

  function handleLogin(e){
    e.preventDefault()
    console.log(loginForm)

    // fetch("/login", {
    //   method: "POST",
    //   headers: "content-type: application/json",
    //   body: JSON.stringify(loginForm)
    // })
    // .then(r=>r.json())
    // .then(data=>console.log(data))
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
        name="email"
        onChange={handleChange}
        type="text"
        placeholder="example@example.com"
        autoComplete="username"/>
        <input
          type={isVis? "text":"password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="flex justify-around items-center" onClick={()=>setIsVis(!isVis)}>
          <Icon className="" icon={isVis? eye : eyeOff} size={25} />
        </button>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

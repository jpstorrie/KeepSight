import { Icon } from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather";
import {eye} from "react-icons-kit/feather";
import {useState} from "react"

export default function Login() {

  const initVals = { username: "", email:"", password:"" }

  const [loginForm, setLoginForm] = useState(initVals)
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

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
          type={type}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <span className="flex justify-around items-center" onClick={handleToggle}>
          <Icon className="" icon={icon} size={25} />
        </span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

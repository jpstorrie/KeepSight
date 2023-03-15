import { Icon } from "react-icons-kit";
import {eyeOff, eye} from "react-icons-kit/feather";
import {useState} from "react"

export default function NewUser() {

  const initVals = { username: "", email:"", password:"" }

  const [newUserForm, setNewUserForm] = useState(initVals)
  const [isVis, setIsVis] = useState(false);

  function handleChange(e){
    const {name, value} = e.target
    setNewUserForm({...newUserForm, [name]: value})
  }

  function handleNewUser(e){
    e.preventDefault()
    console.log(newUserForm)

    // fetch("/newUser", {
    //   method: "POST",
    //   headers: "content-type: application/json",
    //   body: JSON.stringify(newUserForm)
    // })
    // .then(r=>r.json())
    // .then(data=>console.log(data))
  }

  return (
    <div>
      <form onSubmit={handleNewUser} autoComplete="on">
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

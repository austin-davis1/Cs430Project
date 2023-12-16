import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { verifyUser } from "../api";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false)
  const [error, setError] = useState(false)

    const navigate = useNavigate()

  useEffect(() => {
    if (formError) {
        alert("All fields must be filled out")
        setFormError(false)
    } else if (error) {
        alert("Something went wrong with submission :(")
        setError(false)
    }
}, [formError, error])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (username == "" || password == "") {
        setFormError(true)
    } else {
        let userObject = {}
        userObject.email = username
        userObject.password = password
        
        let response = await verifyUser(userObject)
        if (response.success === true) {
            let user = response.userObj
            sessionStorage.setItem("User", JSON.stringify(userObject))
            sessionStorage.setItem("Authenticated", true)
            navigate("/home")
        } else {
            alert("The information was not correct")
        }
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label>
          Email:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button">
            <Link to={"/newuser"}>
                Create New User
            </Link>
        </button>
      </form>
    </div>
  );
}
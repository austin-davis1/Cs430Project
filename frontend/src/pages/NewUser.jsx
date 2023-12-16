import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";

export function NewUser() {
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

  const handleNewUser = async () => {
    if (username == "" || password == "") {
        setFormError(true)
    } else {
        let userObject = {}
        userObject.email = username
        userObject.password = password
        userObject.username = userObject.email.slice(0, 5)
        userObject.joinDate = new Date()
        userObject.files = []
        await createUser(userObject)
        alert("User has been created")
        navigate("/")
    }
  };

  return (
    <div>
      <h2>Create New Account</h2>
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
        <button type="button" onClick={handleNewUser}>
          Create User
        </button>
        <button type="button">
            <Link to={"/"}>
                Back To Login
            </Link>
        </button>
      </form>
    </div>
  );
}
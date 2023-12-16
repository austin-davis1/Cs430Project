import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export function Navbar() {

    let id = useParams()
    let user = JSON.parse(sessionStorage.getItem("User"))
    let email = user.email

    return (
        <div className="navbar">
            <Link className="nav-item" to="/home">
                Home
            </Link>
            <Link className="nav-item" to="/users">
                Users
            </Link>
            <Link className="nav-item" to={`/user/${email}`}>
                User Profile
            </Link>
        </div>
    )
}
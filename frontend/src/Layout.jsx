import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Layout() {
    let user = sessionStorage.getItem("User")
    let navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    return(
        <> 
            <Navbar/>
            <Outlet/>
        </>
    )
}
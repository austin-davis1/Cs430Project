import { getAllUsers } from "../api"
import { useEffect, useState } from "react"

export function AllUsers() {

    const [users, setUsers] = useState()

    useEffect(() => {
        async function grabAllUsers() {
            let users = await getAllUsers()
            setUsers(users)
        }
        grabAllUsers()
    }, [])

    return (
        <>
            {JSON.stringify(users)}
        </>
    )
}
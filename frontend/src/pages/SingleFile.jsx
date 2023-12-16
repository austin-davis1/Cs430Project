import { getOneFile } from "../api"
import { useEffect, useState } from "react"

export function SingleFile() {

    const [files, setFiles] = useState()

    useEffect(() => {
        async function grabAllFiles() {
            console.log("???")
            let files = await getOneFile("6570d7981044e1680d44aea3")
            setFiles(files)
        }
        grabAllFiles()
    }, [])

    return (
        <>
            {JSON.stringify(files)}
        </>
    )
}
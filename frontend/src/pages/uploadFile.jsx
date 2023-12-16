import { useState } from "react"
import { uploadFile } from "../api"

export function UploadFile() {

    const [file, setFile] = useState()
    const SIZE_LIMIT = 15000000

    async function handleSubmit() {
        if (file.size > SIZE_LIMIT) {
            alert("File size is too large")
            return
        }
        let fileObject = {}
        
        fileObject.title = file.name
        fileObject.size = file.size
        fileObject.type = file.type
        fileObject.content = new File([file], file.name)
        fileObject.dateUploaded = new Date()
        fileObject.uploadedBy = null

        await uploadFile(fileObject)
    }

    function handleChange(e) {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Upload file here:</h1>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload File</button>
            </form>
        </>
    )
}
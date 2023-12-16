import { getAllFiles, uploadAWSFile, uploadFile } from "../api"
import { useEffect, useState } from "react"
import { UploadFile } from "./uploadFile"

export function AllFiles() {

    const [files, setFiles] = useState()

    useEffect(() => {
        async function grabAllFiles() {
            let files = await getAllFiles()
            setFiles(files)
        }
        grabAllFiles()
    }, [])

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      // Get the selected file from the input
      const file = e.target.files[0];
      console.log(file)
      setSelectedFile(file);
    };
  
    async function handleUpload() {
      // You can implement your file upload logic here
      if (selectedFile) {
        const videoTypes = ['video/mp4', 'video/avi', 'video/mkv']
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        // Use FormData to send the file to the server
        const formData = new FormData();
        formData.append('file', selectedFile);
        let user = JSON.parse(sessionStorage.getItem("User"))
        let fileObject = {}
        fileObject.title = selectedFile.name
        fileObject.dateUploaded = new Date()
        fileObject.size = selectedFile.size
        fileObject.type = selectedFile.type
        fileObject.content = formData
        fileObject.uploadedBy = user.username

        if (videoTypes.includes(selectedFile.type) || imageTypes.includes(selectedFile.type)) {
            await uploadAWSFile(fileObject)
        } else {
            await uploadFile(fileObject)
        }

        //await uploadFile(fileObject)
        console.log(fileObject)
      } else {
        console.warn('No file selected');
      }
    };

    return (
        <>
            <table>
                <tr>
                    <th>File Name</th>
                    <th>Uploader</th>
                    <th>Size</th>
                    <th>Date Uploaded</th>
                    <th>Download Link</th>
                </tr>
                {files?.map((file) => {
                    let uploadDate = file?.dateUploaded
                    return (
                        <tr>
                            <td>{file.title}</td>
                            <td>{file.uploadedBy}</td>
                            <td>{(file.size / 1000000).toFixed(2)} MB</td>
                            <td>{uploadDate.slice(0, 10)}</td>
                            <td>Download</td>
                        </tr>
                    )
                })}
            </table>
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <br />
            <button type="button" onClick={handleUpload}>
                Upload
            </button>
        </>
    )
}
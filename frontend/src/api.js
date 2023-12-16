import axios from "axios"

const BASE_URL = "http://localhost"
const PORT = 3000

export async function uploadFile(fileObject) {
    const response = await axios.post(`${BASE_URL}:${PORT}/files`, {
        headers: {
            "Content-Type" : "application/json"
        },
        data:fileObject
    })
    return response
}

export async function uploadAWSFile(fileObject) {
    const response = await axios.post(`${BASE_URL}:${PORT}/awsfiles`, {
        headers: {
            "Content-Type" : "application/json"
        },
        data:fileObject
    })
    return response
}

export async function getAllFiles() {
    const response = await axios.get(`${BASE_URL}:${PORT}/files`)
    if (response.status === 200) {
        return response.data
    }
    else {
        console.log("Something went wrong :(")
        return response
    }
}

export async function getOneFile(id) {
    const response = await axios.get(`${BASE_URL}:${PORT}/files/${id}`)
    if (response.status === 200) {
        return response.data
    }
    else {
        console.log(response)
        return
    }
}

export async function createUser(userObject) {
    const response = await axios.post(`${BASE_URL}:${PORT}/users`, {
        headers: {
            "Content-Type" : "application/json"
        },
        data: JSON.stringify(userObject)
    })
}

export async function getAllUsers() {
    const response = await axios.get(`${BASE_URL}:${PORT}/users`)
    if (response.status === 200) {
        return response.data
    }
    else {
        console.log(response)
        return
    }
}

export async function getOneUser(id) {
    const response = await axios.get(`${BASE_URL}:${PORT}/users/${id}`)
    if (response.status === 200) {
        return response.data
    }
    else {
        console.log(response)
        return
    }
}

export async function verifyUser(user) {
    const response = await axios.post(`${BASE_URL}:${PORT}/users/login`, {
        headers: {
            "Content-Type" : "application/json"
        },
        data: JSON.stringify(user)
    })

    return response.data
}

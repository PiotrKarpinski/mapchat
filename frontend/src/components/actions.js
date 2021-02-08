import axios from "axios";

export const fetchData = (id, resourceName, callback) => {
    axios.get(`http://localhost:3001/${resourceName}/${id}`,
        {withCredentials: true})
        .then(response => {
            if (response.data) {
                callback(response.data)
            } else {
                callback({})
            }
        })
        .catch(error => console.log('api errors:', error))
}

export const fetchAllData = (resourceName, callback) => {
    axios.get(`http://localhost:3001/${resourceName}`,
        {withCredentials: true})
        .then(response => {
            if (response.data) {
                callback(response.data[resourceName])
            } else {
                callback({})
            }
        })
        .catch(error => console.log('api errors:', error))
}


export const postData = (data, resourceName, callback) => {
    axios.post(`http://localhost:3001/${resourceName}`, {data},
        {withCredentials: true})
        .then(response => {
            if (response.data) {
                callback(response.data)
            } else {
                callback({})
            }
        })
        .catch(error => console.log('api errors:', error))
}

export const updateData = (data, resourceName, callback) => {
    axios.put(`http://localhost:3001/${resourceName}/${data.id}`, {data},
        {withCredentials: true})
        .then(response => {
            if (response.data) {
                callback(response.data)
            } else {
                callback({})
            }
        })
        .catch(error => console.log('api errors:', error))
}

export const deleteData = (resource, resourceName, callback) => {
    for (let item of resource) {
        axios.delete(`http://localhost:3001/${resourceName}/${item}`,
            {withCredentials: true})
            .then(response => {
                if (response.data) {
                    callback(response.data)
                } else {
                    callback({})
                }
            })
            .catch(error => console.log('api errors:', error))
    }

}

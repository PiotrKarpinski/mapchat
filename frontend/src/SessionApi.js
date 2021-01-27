import axios from "axios";


export function login(user, success, fail) {
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
            if (response.data.logged_in) {
                success(response.data)
            } else {
                fail(response.data)
            }
        })
        .catch(error => console.log('api errors:', error))
};

export function signup(user, success, fail) {

    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
        .then(response => {
            if (response.data.status === 'created') {
                success(response.data)
            } else {
                fail(response.data)
            }
        })
        .catch(error => console.log('api errors:', error))
};



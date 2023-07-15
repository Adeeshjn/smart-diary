import React from 'react'
import { useHistory } from 'react-router-dom';
import Notes from './Notes';


const Home = () => {
    let history = useHistory();
    const getUserInfo = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
    }
    if (localStorage.getItem('token')) {
        getUserInfo();
    }
    else {
        history.push("/login");
    }

    return (
        <div className="">
            <Notes/>
        </div>
    )
}

export default Home
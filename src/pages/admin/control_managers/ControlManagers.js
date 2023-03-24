import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import '../../../css_all/all.css'
export default function ControlUsers() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        loadUsers();
    }, [])

    const loadUsers = async ()=>{
        const result = await axios.get("http://localhost:8080/managerlist");
        setUsers(result.data);
    }

    const deleteUser = async (id) =>{
        await axios.delete(`http://localhost:8080/user/${id}`)

        loadUsers();
    }
    return (
        <div className= "container_main">
            <div className="container_dashboard">
                <div className= "py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => (
                                <tr key = {index}>
                                    <th scope="row" > {index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.roles[0]}</td>
                                    {<td>
                                        <Link className= "btn btn-primary mx-2" to = {`/viewuser/${user.id}`}>View</Link>
                                        <Link className= "btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                                        <button className= "btn btn-danger mx-2" onClick={()=> deleteUser(user.id)}>Delete</button>
                                    </td>}
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
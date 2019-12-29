import React from 'react'
import UsersList from '../components/UsersList'

/*
    Page that displays list of users
*/

 const Users = () => {

    const USER = [
        {
        id:'u1',
        image:'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/MarioNSMBUDeluxe.png/220px-MarioNSMBUDeluxe.png',
        name:'Super Mario',
        placeCount: 3
        }
    ]

    return (

        // Pass list of users to user list
       <UsersList
           items={USER}
       />

    )
}

export default Users
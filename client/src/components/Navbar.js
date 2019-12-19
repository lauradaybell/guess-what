import React from 'react'

import {Link} from 'react-router-dom'


function Navbar(props) {
    return(
        <div className="nav">
            <Link to="/public">Public Posts</Link>
            <Link to="/myPage">My Posts</Link>
            <Link to="/newPost">New Post</Link>
            <button className="logoutBtn" onClick={props.logout}>Logout</button>
        </div>
    )
}


export default Navbar
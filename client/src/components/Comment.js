import React from 'react'


const Comment = (props) => {
    const {commentText, username} = props
    return (
        <div>
            <h5 className="commentText"><span className = "username"> {username} </span>: {commentText}</h5>
        </div>
    )
}





export default Comment
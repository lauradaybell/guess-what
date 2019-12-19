import React, {useContext, useState} from 'react'
import {UserContext} from '../context/UserProvider'




function CommentForm(props) {
    const initState = { commentText: "" }
    const [inputs, setInputs] = useState(initState)
    const { addComment } = useContext(UserContext)
    
    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]:value }))
    }

    const handleSubmitComment = e => {
        e.preventDefault()
        addComment(inputs, props._id)
        setInputs(initState)
    }

    

    return(
        <form className = "commentForm" onSubmit={handleSubmitComment}>
            <input 
                type="text"
                name="commentText"
                value={inputs.commentText}
                placeholder="Comment"
                onChange={handleChange}
                className="commentInput"
                />
            <button className = "commentBtn">Comment</button>
        </form>
    )
}


export default CommentForm

import React, {Component} from 'react'
import {withUser} from '../context/UserProvider'
import CanvasDraw from 'react-canvas-draw'
import CommentForm from './CommentForm'
import Comment from './Comment'
import {withGetScreen} from 'react-getscreen'

const axios = require('axios')



class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            width: 500,
            height: 500
        }
    }

    componentDidMount() {
        if (this.props.isMobile()) {
            this.setState({
                height: 275,
                width: 275
            })};
        if (this.props.isTablet()) {
            this.setState({
                height: 300,
                width: 300
            })
        }
    }

    getComments = (postId) => {
        //axios statement with /comments
        axios.get(`/comment/${postId}`)
            .then(res => {
                this.setState({
                    comments: res.data
                })
            })
            .catch(err => console.log(err))
    }

    handleCommentDiv = (postId) => {
        //classList for comment section
        const commentsDiv = document.getElementById(this.props.postId)
        commentsDiv.classList.toggle('hidden')
        //call function to get comments for this post
        if(commentsDiv.classList.contains('untouched')) {
            commentsDiv.classList.remove('untouched')
            this.getComments(postId)
        }
    }

    render() {
        const {title, image, username, created, handleDelete, _id, postId} = this.props
        const mappedComments = this.state.comments.map(comm => <Comment {...comm} key={comm._id}/>)
    return(
        
        <div className= "postContainer"style={{border:"1px solid #643E60"}}>
            <h1>{title}</h1>
            <div className="largePost">
                <CanvasDraw
                    disabled
                    hideGrid
                    saveData={image}
                    className="canvas"
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height} />
                <h4>{username}</h4>
                <h5>{created}</h5>
                <CommentForm _id={_id} />

                { JSON.parse(localStorage.getItem('user'))._id === this.props.user &&
                    <button onClick={() => handleDelete(_id)} className="deletePostBtn">Delete Post</button>}

                <button onClick={() => this.handleCommentDiv(postId)} className = "showComments">Show Comments</button>
                <div id={postId} className='hidden untouched'>
                    { mappedComments }
                </div>
            </div>
        </div>
    )
    }
}

export default withGetScreen(withUser(Post))
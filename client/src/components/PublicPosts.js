import React, {useEffect, useContext} from 'react'
import {UserContext} from '../context/UserProvider'
import Post from './Post'


function PublicPosts(props) {

    const { getAllPosts , posts} = useContext(UserContext)

    useEffect(() => {
        getAllPosts()
    }, [])
    
        const mappedPosts = posts.map((post) => <Post {...post} key={post._id} path={props.location.pathname} postId={post._id} />)
       return( 
        <div>
            {mappedPosts}
        </div>
    )
}

export default PublicPosts
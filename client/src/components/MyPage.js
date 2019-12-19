import React, {useEffect, useContext} from 'react'
import {UserContext} from '../context/UserProvider'
import Post from './Post'



function MyPage(props) {
    const { getUserPosts, userPosts } = useContext(UserContext)
    const mappedPosts = userPosts.map((post, i) => <Post {...post} key={post._id} path={props.location.pathname} postId={post._id} />)

    useEffect(() => {
        getUserPosts()
    }, [])  
   
    return( 
        <div>
            {mappedPosts}
        </div>
) 
}

export default MyPage
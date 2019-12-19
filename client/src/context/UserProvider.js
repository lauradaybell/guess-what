import React, {useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function UserProvider(props){
    const initState= {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        posts: [],
        userPosts: [],
        authErrMsg: "",
        title: "",
        commentText: ""
    }

    const [userState, setUserState] = useState(initState)

    const signup = credentials => {
        axios.post("/auth/signup", credentials)
            .then(res=> {
                const {user, token} =res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user: user,
                    token: token

                }))})
            .catch(err=> handleAuthError(err.response.data.errMsg))
    }

    const login = credentials => {
        axios.post("/auth/login", credentials)
            .then(res=>{ 
                const {user, token} = res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user: user,
                    token: token

                }))})
            .catch(err=> handleAuthError(err.response.data.errMsg))
    }

    const handleAuthError = errMsg => {
        setUserState(prevUserState => ({
            ...prevUserState,
            authErrMsg: errMsg
        }))
    }

    const handleAddPost = (theTitle, savedDrawing) => {
        //const with inputs
        const newPost = {
            image: savedDrawing,
            title: theTitle
        }
        
        // axios post statement
        userAxios.post("/api/post", newPost)
            .then(res => {
                console.log(res)
                //change pieces of state that might be needed
            })
            .catch(err => {
                console.log(err)
            })
    }

    const clearAuthError = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            authErrMsg: ""
        }))
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            posts: [],
            userPosts: [],
            authErrMsg: ""
        })
    }
    const handleDelete = id => {
        userAxios.delete(`/api/post/${id}`)
            .then(response => {
                console.log(response.data.msg)
                getAllPosts()
                getUserPosts()
            })
            .catch(err => console.log(err))
    }

    const getAllPosts = () => {
        userAxios.get("/api/post")
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: res.data.reverse()
                }))
            })

            .catch(err => console.log(err))
    }

    const getUserPosts = () => {
        userAxios.get("/api/post/user")
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    userPosts: res.data.reverse()
                }))
            })
    }
    const addComment = (newComment, postId) => {
        userAxios.post(`/api/comment/${postId}`, newComment)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
            
    }
   
    


    return(
        <UserContext.Provider
            value={{
                user: userState.user,
                token: userState.token,
                posts: userState.posts,
                userPosts: userState.userPosts,
                authErrMsg: userState.authErrMsg,
                title: userState.title,
                commentText: userState.commentText,
                signup: signup,
                login: login,
                logout: logout,
                getAllPosts: getAllPosts,
                getUserPosts: getUserPosts,
                clearAuthError: clearAuthError,
                handleDelete: handleDelete,
                addComment: addComment,
                handleAddPost: handleAddPost
            }}>
            {props.children}
        </UserContext.Provider>
    )
}



export default UserProvider

export const withUser = C => props => (
    <UserContext.Consumer>
        {value => <C {...value} {...props} />}
    </UserContext.Consumer>
)
import React, {useContext} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './components/Auth'
import PublicPosts from './components/PublicPosts'
import {UserContext} from './context/UserProvider'
import Navbar from './components/Navbar'
import MyPage from './components/MyPage'
import ProtectedRoute from './shared/ProtectedRoute'
import NewPostForm from './components/NewPostForm'
import './App.css'


const App = () => {
    const {token, logout} = useContext(UserContext)
    return(
        <div>
            { token && <Navbar logout={logout} />}
            <Switch>
                <Route 
                    exact path = "/" 
                    render = {rProps => token ? 
                                        <Redirect to = "/public"/> 
                                        : 
                                        <Auth{...rProps}/>} />

                <ProtectedRoute
                    path="/public"
                    component={PublicPosts}   
                    redirectTo="/" />

                <ProtectedRoute
                    path="/myPage"
                    component={MyPage}   
                    redirectTo="/" />
                <ProtectedRoute
                    path="/newPost"
                    component={NewPostForm}
                    redirectTo="/" />
            </Switch>
        </div>
    )
}

export default App
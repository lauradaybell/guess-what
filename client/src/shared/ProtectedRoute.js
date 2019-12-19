import React, {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from '../context/UserProvider'


function ProtectedRoute(props) {
    const { token } = useContext(UserContext)
    const { path, redirectTo, component: C, ...rest } = props
    return(
        token ?
            <Route to={path} render={rProps => <C {...rProps} {...rest}/>}/>
            :
            <Redirect to={redirectTo}/>
    )
}


export default ProtectedRoute

import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm'
import {UserContext} from '../context/UserProvider'

function Auth() {
    const initState = {username:'', password: ''}
    const {signup, login, authErrMsg, clearAuthError}= useContext(UserContext)


    const [inputs, setInputs] = useState(initState)
    const [toggle, setToggle] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]:value }))
    }

    const handleSignUpSubmit = e => {
        e.preventDefault()
        signup(inputs)
        setInputs(initState)
    }

    const handleLogInSubmit = e => {
        e.preventDefault()
        login(inputs)
        setInputs(initState)
    }

    const toggleForms = () => {
        setToggle(prevToggle => !prevToggle)
        clearAuthError()
    }
    return(
        <div>
            {!toggle
            ?
                <>
                    <AuthForm 
                        inputs ={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleSignUpSubmit}
                        btnTxt="Sign Up"
                    />
                    <p style={{color:"red"}}>{authErrMsg}</p>
                    <button className = "memberBtn" onClick={toggleForms}>Already A Member?</button>
                </>
            :
                <>
                    <AuthForm 
                        inputs ={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleLogInSubmit}
                        btnTxt="Login"
                    />
                    <p style={{color:"red"}}>{authErrMsg}</p>
                    <button className="memberBtn" onClick={toggleForms}>Not A Member?</button>
                </>
            }
        </div>
    )
}


export default Auth
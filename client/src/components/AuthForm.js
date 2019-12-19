import React from 'react'

function AuthForm(props){
    const {handleChange, handleSubmit, inputs} = props
    return(
        <form className = "authForm" onSubmit= {handleSubmit}>
            <input 
                type="text" 
                name="username" 
                value= {inputs.username} 
                onChange={handleChange} 
                placeholder="Username"
                className="authInput" />
            <input 
                type="text" 
                name="password" 
                value= {inputs.password} 
                onChange={handleChange} 
                placeholder="Password" 
                className="authInput"/>
            <button className="authBtn" >{props.btnTxt}</button>
        </form>
    )
}



export default AuthForm
import React, {useCallback, useState} from 'react';
import { Redirect } from 'react-router-dom'


// making login a function component
const LoginForm = (props) => {
    // set state with hooks
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
     
const handleUsernameChange = useCallback((e) => {
    const {value} = e.target
    setUsername(value)
}, [])
// use setUsername here to set the state of username by way of the useCallback hook. 

const handlePasswordChange = useCallback((e) => {
    const {value} = e.target
    setPassword(value)
}, [])
// same as the handeUsernameChange line

const handleResponse = useCallback((response) =>{
    if (response.user) {
        localStorage.token = response.token
        localStorage.username = response.user.username
        props.handleCurrentUser(localStorage.username)
        setRedirect(true)
    }
    else {
        alert(response.error)
    }
}, [props])
// here is like our old handleResponse function.
// notice we don't need "this" anymore? Because it's a funciton component

const handleLoginSubmit = useCallback((logUser) => {
    logUser.preventDefault()

    const body = JSON.stringify({
        username,
        password
    })
    // object property shorthand. We already identfied these variables
    // in useState so we don't need to {username: username, password: password}
    // save it into a body variable for cleaner fetches. 
    fetch(`https://ancient-mesa-98163.herokuapp.com/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body
    })
    .then(r => r.json())
    .then(handleResponse)
}, [username, password, handleResponse])
// sending our response to our handleResponse function
// by putting username, password, and handleResponse into
// an array, we are making this fetch dependent on only these
// things happening. Thannks, useCallback()!
return(
    <div className="container">
    <form onSubmit={handleLoginSubmit} >
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <input type="submit" value="Submit" />
    </form>
    {
        redirect ? 
        <Redirect push to="/profile" />
        :
        <p></p>
    }
    </div>
    // ternary expression in our code to check if our 
    // redirect value is true or not. Yes, push to profile,
    // no? nothing happens. Empty <p></p> rendered. 
    )
}

export default LoginForm



// OLD CODE TO COMPARE HOOKS VS NON HOOKS/FUNCTION COMPONENTS

// export default class LoginForm extends Component {

// state = {
//     username: "",
//     password: "",
//     redirect: false,
//     token: ""
// }
// //controlled form
// handleChange = (e) => {
//     console.log(this.state)
//     let { name, value } = e.target
//     this.setState({
//         [name]: value
//     })
// }


// //on submit auth user in backend

// handleLoginSubmit = (logUser) => {
//     logUser.preventDefault()
//     fetch(`https://ancient-mesa-98163.herokuapp.com/login`, {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(this.state)
//     })
//         .then(r => r.json())
//         .then(this.handleResponse)
// }

// //on response set page to profile page
// handleResponse = (response) => {
//     if (response.user) {
//         localStorage.token = response.token
//         localStorage.username = response.user.username
//         this.props.handleCurrentUser(localStorage.username)
//         this.setState({
//             username: this.state.username,
//             password: this.state.password,
//             token: response.token,
//             redirect: true
//         })
//     }
//     else {
//         alert(response.error)
//       }
// }

// render() {
//     // let { formName } = this.props
//     let { username, password } = this.state

//     return (
//         <div className="container">
//         <form onSubmit={this.handleLoginSubmit} >
//             <h1>Login</h1>
//             <label htmlFor="username">Username:</label>
//             <input type="text" name="username" value={username} onChange={this.handleChange} />
//             <label htmlFor="password">Password:</label>
//             <input type="password" name="password" value={password} onChange={this.handleChange} />
//             <input type="submit" value="Submit" />
//         </form>
//         {
//             this.state.redirect ? 
//             <Redirect push to="/profile" />
//             :
//             <p></p>
//         }
//         </div>
//     )
// }
// }
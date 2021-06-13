import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import ErrorBox from '../components/ErrorBox'

const RegisterScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const { userInfo,loading,error } = useSelector(state => state.userRegister)
        
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("password & confirm password does not match")
        } else {
            dispatch(register(name,email,password)) 
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history,redirect,userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <ErrorBox variant="danger">{error}</ErrorBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required onChange={(e) => setName(e.target.value)}  />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)}  />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)}  />
                </div>
                 <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" required id="ConfirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}  />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>Already have an account ? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link></div>
                </div>
            </form>
            
        </div>
    )
}

export default RegisterScreen

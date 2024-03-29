import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import ErrorBox from '../components/ErrorBox'

const SigninScreen = (props) => {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const { userInfo,loading,error } = useSelector(state => state.userSignIn)
        
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email,password))
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
                <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <ErrorBox variant="danger">{error }</ErrorBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)}  />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)}  />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>New Customer ? <Link to={`/register?redirect=${redirect}`}>Create your account</Link></div>
                </div>
            </form>
            
        </div>
    )
}

export default SigninScreen

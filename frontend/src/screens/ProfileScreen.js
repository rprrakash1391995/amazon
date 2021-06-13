import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import ErrorBox from '../components/ErrorBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email,setEmail]  = useState('')
    const [password,setPassword]  = useState('')
    const [confirmpassword,setConfirmpassword]  = useState('')
    
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo } = userSignIn
    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success:successUpdate,error:errorUpdate,loading:loadingUpdate} = userUpdateProfile
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user) {
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))  
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, userInfo._id,user])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            alert("Password and Confirm Password does not match")
        } else {
            dispatch(updateUserProfile({userId:user._id, name,email,password}))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ? (<LoadingBox></LoadingBox>) : error ? (<ErrorBox></ErrorBox>)
                    :
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <ErrorBox variant="danger">{errorUpdate}</ErrorBox>}
                        {successUpdate && <ErrorBox variant="success">Profile Updated Successfully</ErrorBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="password">password</label>
                            <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword (e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input type="password" id="confirmpassword" placeholder="Enter password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                        </div>
                        
                        <div>
                            <label />
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>    
                }
            </form>
        </div>
    )
}

export default ProfileScreen

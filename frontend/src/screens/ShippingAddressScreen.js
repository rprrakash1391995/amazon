import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = (props) => {

    const { userInfo } = useSelector(state => state.userSignIn)
    const { shippingAddress } = useSelector(state => state.cart)
    
    if (!userInfo) {
        props.history.push('/signin')
    }
    const [fullname, setFullname] = useState(shippingAddress.fullname)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ fullname, address, city, postalCode, country }))
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" placeholder="Enter full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Address">Address</label>
                    <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="City">City</label>
                    <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <input type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen

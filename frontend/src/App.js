import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const { userInfo } = useSelector(state => state.userSignIn)
  // console.log(userInfo)
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <Router>
     <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazon</Link>
        </div>
        <div>
            <Link to="/cart" >Cart {cartItems.length > 0 && (<span className="badge" >{cartItems.length}</span>)}</Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#" >{userInfo.name} <i className="fa fa-caret-down"></i>{''} </Link>
                  <ul className="dropdown-content">
                    <li><Link to="/profile">User Profile</Link></li>
                    
                    <li><Link to="/orderhistory">Order History</Link></li>
                    <li>
                    <Link to="#signout" onClick={signoutHandler}> Sign Out</Link>
                    </li>
                  </ul>
                 </div>
              ) : (<Link to="/signin" >Sign In</Link>)
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin"> Admin <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li><Link to="/dashboard" />Dashbaord</li>
                  <li><Link to="/productlist" />Products</li>
                  <li><Link to="/orderlist" />Orders</li>
                  <li><Link to="/userlist" />Users</li>

                </ul>
              </div>
            )}
        </div>
        </header>
        
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <Route path="/" component={HomeScreen} exact />
        
        </main>
        
      <footer className="row center">all rights reserved</footer>
    </div>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions'
import ErrorBox from '../components/ErrorBox'
import LoadingBox from '../components/LoadingBox'

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector(state => state.orderMineList)
    const {loading,error,orders} = orderMineList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrderMine())
    },[dispatch])
    return (
        <div>
            <h1>Order History</h1>
            {loading ? (<LoadingBox />) : error ? (<ErrorBox>{error}</ErrorBox>)
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt(0,10) : 'No'}</td>
                                    <td><button className="small" type="button" onClick={() =>{props.history.push(`/order/${order._id}`)}}>Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default OrderHistoryScreen

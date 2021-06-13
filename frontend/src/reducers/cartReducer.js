import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD,CART_EMPTY } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]},action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const items = action.payload
            const existing = state.cartItems.find(x => x.product === items.product)
            if (existing) {
                return {
                    ...state,
                    cartItems:state.cartItems.map((x) => x.product === existing.product ? items : x)
                }
            } else {
                return {...state, cartItems:[...state.cartItems,items]}
            }
        case CART_REMOVE_ITEM:
            return { ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload) }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload }
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case CART_EMPTY:
            return {...state, cartItems:[]}
        default:
            return state
    }
}
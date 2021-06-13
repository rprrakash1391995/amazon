import React, {useEffect} from 'react'
import Products from '../components/Products'
import LoadingBox from '../components/LoadingBox'
import ErrorBox from '../components/ErrorBox'
import { useDispatch, useSelector } from 'react-redux'
import {list_product} from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList
  
  useEffect(() => {
    dispatch(list_product())
  }, [])
  // console.log(products)
    return (
      <div>
        {loading ? <LoadingBox></LoadingBox>
          : error ? <ErrorBox variant="danger">{error}</ErrorBox>
            : (
              <div className="row center">
          {
            products.map((product) => (
              <Products key={product._id} product={product} />
            ))
          }
         </div>
           )  
        }
        
      </div>
    )
}

export default HomeScreen

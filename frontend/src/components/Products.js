import React from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'

const Products = ({product}) => {
    return (
          <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
              <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
              <Link to={`/product/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
              <Ratings rating={product.rating} numReviews={product.numReviews} />
              <div className="price">${product.price}</div>
            </div>
          </div>
    )
}

export default Products

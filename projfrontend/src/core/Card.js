import React, { useState } from 'react'
import ImageHelper from './helper/imageHelper';
import {Redirect} from "react-router-dom"
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';



 
const Card = ({product, addtoCart= true, removeFromCart= false, reload= undefined, setReload= f => f}) => {

  const [redirect, setRedirect] = useState(false)
  const [logiRedirect, setLoginRedirect] = useState(false)

  const cardTitle = product ? product.name : "Product name"
  const cardDescription = product ? product.description : "Product description"
  const cardPrice = product ? product.price : "Product price"

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true) )
      console.log("add to cart")
    }
    else {
      console.log("login first")
      {setLoginRedirect(true)}
    }
  }

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  const getALoginRedirect = (loginRedirect) => {
    if (loginRedirect) {
      return <Redirect to="/signin" />
    }
  }

  const showAddToCart = addToCart => {
    return(
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-dark mt-2 mb-2"
        >
          Add to Cart
        </button>
    )
    )
  }

  const showRemoveFromCart = removeFromCart => {
    return(
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id)
            setReload(!reload)

            console.log("removed from cart")
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    )
  }
  
  return (
    <div className="card">
      <div className="card-header lead text-dark">{cardTitle}</div>
      <div className="card-body">
      {getARedirect(redirect)}
      {getALoginRedirect(logiRedirect)}
        <ImageHelper product={product}/>
        <p className="lead font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <h3>$ {cardPrice}</h3>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card

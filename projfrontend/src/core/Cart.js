import React, { useState, useEffect } from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import Payment from './Payment'


const Cart = () => {

    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                <h1>Product List</h1>
                {products.map((product, index) => (
                    <Card 
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        reload={reload}
                        setReload={setReload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }

    return (
        <Base title="Cart page" description="Welcome to your cart">
            <div className="row text-center">
                <div className="col-5">{loadAllProducts(products)}</div>
                <div className="col-3 offset-md-3">{products.length > 0 ?
                (
                    <Payment products={products} setReload={setReload} />
                ) : 
                (
                    <h3 className="text-center">Your Cart Is Empty</h3>
                )}
                </div>
            </div>
        </Base>
    )
}

export default Cart

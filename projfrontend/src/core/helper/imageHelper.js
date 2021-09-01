import React from 'react'

const ImageHelper = ({product}) => {
    const imageurl = product.image ? product.image
    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS92eisuWOx3tEjeW14mT9ACVgXDwIRBGtnww&usqp=CAU`
    return (
        <div className="rounded">
            <img src= {imageurl} 
            style={{maxHeight:"100%", maxWidth:"100%"}}
            className="mb-3 rounded"
            alt="product_image"/>
        </div>
    )
}

export default ImageHelper

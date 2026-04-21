import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ProductView.css"

const ProductView = ({selectedProduct,addToCart}) => {
  const navigate = useNavigate();
  const onclose=()=>{navigate(-1)}
    const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push("★");
      } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
        stars.push("⯨"); // half star
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };
  return (
    <div className='productView'>
        <div className='productleft'>
          <button className='closebutton' onClick={onclose}>← Back to Products</button>
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title}  />
            <h1>{selectedProduct.title}</h1>
        </div>
        <div className='productright'>
          
           <p><span>Price:</span>{selectedProduct.price}</p>
             <p className="star"><span>rating:</span>
              {renderStars(selectedProduct.rating)} <span>({selectedProduct.rating})</span>
            </p>
            <p><span>description:</span>{selectedProduct.description}</p>
            <p><span>warrantyInformation:</span>{selectedProduct.warrantyInformation}</p>
            <p><span>shippingInformation:</span>{selectedProduct.shippingInformation}</p>
            <p><span>stock:</span>{selectedProduct.stock}</p>
            <p><span>Return Policy:</span>{selectedProduct.returnPolicy}</p>
           <button className='addtocart' onClick={() => addToCart(selectedProduct)}>Add to Cart</button>


        </div>
       
    </div>
  )
}

export default ProductView

import React from 'react'
import { useCart } from './context/CartContext'
import  Navigationbar  from './components/Navigationbar';

const UserCart = () => {

    const {cartItems, addToCart, removeFromCart} = useCart()

  return (
<>
<Navigationbar />
<div>
    <h2 className='y-cart'>Your Cart</h2>
 {cartItems.length ===0 ?
    (<p className='empty'>Your Cart is Empty</p>):
   <div>
     {cartItems.map((item)=>{
        return(
            <div className='cart-section'>
                <div className="cart-img">
                    <img src={item.Image} alt="" />
                </div>
                <div className="cart-details">
                    <h3>{item.Product}</h3>
                    <h2>
                        {item.Price}
                    </h2>
                    <h3>{item.Model}</h3>
                </div>
                <button className='removeBtn' onClick={() => removeFromCart(item)}>Remove</button>
            </div>
        )
    })}
   </div>

}
     
    </div>
</>
  )
}

export default UserCart
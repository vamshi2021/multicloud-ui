import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

 const Navigationbar = () => {

  const {cartItems}= useCart()

  return (
    <div className="navbar-section"> 
      <div className="navSection">
      <Link to='/' className="custom-link">
        <div className="title">
        <h2>E-Mart</h2>
        </div>
        </Link>

        <div className="search">
        <input type="text" placeholder="Search..." />
        </div>
        <div className="user">
          {/* <div className="user-detail">Edit</div>
          <div className="user-detail">Delete</div>
          <div className="user-detail">Create</div> */}
        </div>
        <Link to= '/cart'>
          <div className="cart">Cart
          <span>
            {cartItems?.length}
          </span>
          </div>
        </Link>
    </div>
    <div className="subMenu">
        <ul>
          <Link to="/Mobiles" className="custom-link"> 
            <li>Mobiles</li>
           </Link> 
          <Link to="/Watch" className="custom-link"> 
          <li>Watches</li>
          </Link> 
           <Link to="/Furniture" className="custom-link"> 
           <li>Furniture</li>
           </Link> 
           <Link to="/Ac" className="custom-link"> 
            <li>AC</li>
           </Link> 
        </ul>
    </div>
  </div>
  )
}

export default Navigationbar

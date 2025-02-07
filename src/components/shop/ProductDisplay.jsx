import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";

const ProductDisplay = ({item}) => {
    const {id,name,price,seller,ratingsCount,quantity,img} = item;

    const [preQuantity, setQuantity] = useState(quantity);
    const [coupon, setCoupon] = useState("");
    const [size, setSize] = useState("Select Size");
    const [color, setColor] = useState("Select Color");

    //handle size
    const handleSizeChange = (e)=>{
        setSize(e.target.value);
    }
    //handle color
    const handleColorChange = (e)=>{
        setColor(e.target.value);
    }

    //handle Decrease
    const handleDecrease = ()=>{
        if(preQuantity > 1){
            setQuantity( preQuantity -1)
        }
    }
    //handle Increase
    const handleIncrease = ()=>{
        setQuantity( preQuantity + 1) 
    }

    //handle Submit
    const handleSubmit = (e)=>{
        e.preventDefault();

        const product = {
            id:id,
            img:img,
            name:name,
            price:price,
            quantity:preQuantity,
            size:size,
            color:color,
            coupon:coupon
        }

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = existingCart.findIndex((item)=> item.id === id);

        if(existingProductIndex !== -1){
            existingCart[existingProductIndex].quantity +=preQuantity;
        }else{
            existingCart.push(product);
        }

        //localstorage update
        localStorage.setItem("cart",JSON.stringify(existingCart))

        //reset form fields
        setQuantity(1);
        setSize("Select Size");
        setColor("Select Color");
        setCoupon("");
    }

  return (
    <div>
        <div>
            <h4>{name}</h4>
            <p className='rating'>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <span>{ratingsCount} Review</span>
            </p>
            <h4>${price}</h4>
            <h6>{seller}</h6>
            <p>{desc}</p>
        </div>


        <div>
            <form onSubmit={handleSubmit}>
                <div className='select-product size'>
                    <select value={size} onChange={handleSizeChange}>
                        <option>Select Size</option>
                        <option>SM</option>
                        <option>MD</option>
                        <option>LG</option>
                        <option>XL</option>
                        <option>XXL</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>
                <div className='select-product color'>
                    <select value={color} onChange={handleColorChange}>
                        <option>Select Color</option>
                        <option>Red</option>
                        <option>Ash</option>
                        <option>Navy</option>
                        <option>Blue</option>
                        <option>Black</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>

                <div className="cart-plus-minus">
                    <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                    <input onChange={(e)=>setQuantity(parseInt(e.target.value, 10))} className='cart-plus-minus-box' type="text" value={preQuantity} name="qtybutton" id="qtybutton" />
                    <div className='inc qtybutton' onClick={handleIncrease}>+</div>
                </div>

                <div className='discount-code mb-2'>
                    <input type="text" placeholder='Enter discount code' onChange={(e)=>setCoupon(e.target.value)} />
                </div>
                <button type='submit' className='lab-btn'>
                    <span>Add to Cart</span>
                </button>
                <Link to='/cart-page' className='lab-btn bg-primary'>
                    <span>Checkout</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default ProductDisplay
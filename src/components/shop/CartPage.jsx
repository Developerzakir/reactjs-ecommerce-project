import React, { useEffect, useState } from 'react'
import PageHeader from './../PageHeader';
import { Link } from 'react-router-dom';
import dellImgUrl from '../../assets/images/shop/del.png'
import { removeItem } from 'localforage';

const CartPage = () => {
    const [cartItem, setCartItem] = useState([]);

    useEffect(()=>{
        //fetch cart items from localstorage
        const storedCartitems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(storedCartitems);
    },[])

    //calculate total price
    const calculateTotalPrice = (item)=>{
        return item.price * item.quantity;
    }

    //handle quantity increase
    const handleIncrease = (item)=>{
        item.quantity +=1;
        setCartItem([...cartItem]);

        //update localstorage with cart new item
        localStorage.setItem("cart",JSON.stringify(cartItem));
    }

    //handle quantity decrease
    const handleDecrease = (item)=>{
        if(item.quantity > 1){
            item.quantity -=1;
            setCartItem([...cartItem]);

            //update localstorage with cart new item
            localStorage.setItem("cart",JSON.stringify(cartItem));
        }
    }

    //handle item remove
    const handleRemoveItem = (item)=>{
       const updatedCart = cartItem.filter((cartItemm)=>cartItemm.id !== item.id);

       //update new cart
       setCartItem(updatedCart);

       updateLocalstorage(updatedCart);
    }


    //update localstorage
    const updateLocalstorage = (cart)=>{
       localStorage.setItem("cart",JSON.stringify(cart));
    }

    //cart subtotal calculate
    const cartSubtotal = cartItem.reduce((total, item)=>{
        return total + calculateTotalPrice(item);
    },0)

    //calculate order total
    const orderTotal = cartSubtotal;




  return (
    <div>
        <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
        <div className='shop-cart padding-tb'>
            <div className="container">
                <div className="section-wrapper">
                    {/* cart top section start  */}
                    <div className="cart-top">
                        <table>
                            <thead>
                               <tr>
                               <th className='cat-product'>Product</th>
                                <th className='cat-price'>Price</th>
                                <th className='cat-quantity'>Quantity</th>
                                <th className='cat-toprice'>Total</th>
                                <th className='cat-edit'>Edit</th>
                               </tr>
                            </thead>

                            <tbody>
                                {
                                    cartItem.map((item,i)=>(
                                        <tr key={i}>
                                         <td className='product-item cat-product'>
                                            <div className='p-thumb'>
                                                <Link to="/shop"><img src={item.img} alt="" /></Link>
                                            </div>
                                            <div className='p-content'>
                                                <Link to="/shop">{item.name}</Link>
                                            </div>
                                         </td>

                                         <td className='cat-price'>$ {item.price}</td>
                                         <td className='cat-quantity'>
                                            <div className="cart-plus-minus">
                                                <div className="dec qtybutton" onClick={()=> handleDecrease(item)}>-</div>
                                                <input type="text" className='cart-plus-minus-box' 
                                                name="qtybutton" value={item.quantity} />
                                                <div className="inc qtybutton" onClick={()=> handleIncrease(item)}>+</div>
                                            </div>
                                         </td>
                                         <td className='cat-toprice'>${calculateTotalPrice(item)}</td>
                                         <td className='cat-edit'>
                                            <a href="#" onClick={()=> handleRemoveItem(item)}>
                                                <img src={dellImgUrl} alt="" />
                                            </a>
                                         </td>
                                          
                                        
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                      {/* cart top section end  */}

                      <div className='cart-bottom'>
                         <div className="cart-checkout-box">
                            <form className='coupon'>
                                <input className='cart-page-input-text' type="text" name="coupon" id="coupon" placeholder='Coupon Code...' />
                                <input type="submit" value="Apply Coupon" />
                            </form>
                            <form className='cart-checkout'>
                                <input type="submit" value="Update Cart" />
                                <button className='btn btn-primary'>
                                    Proceed Checkout 
                                </button>
                            </form>
                         </div>
                         {/* checkout box end  */}

                         {/* Shipping box section start  */}

                         <div className='shiping-box'>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="calculate-shiping">
                                        <h4>Calculate Shipping</h4>
                                        <div className="outline-select">
                                            <select>
                                                <option value="uk">United Kingdom</option>
                                                <option value="bd">Bangladesh</option>
                                                <option value="pak">Pakistan</option>
                                                <option value="np">Nepal</option>
                                            </select>
                                            <span className='select-icon'>
                                                <i className='icofont-rounded-down'></i>
                                            </span>
                                        </div>

                                        <div className="outline-select shipping-select">
                                            <select>
                                                <option value="nw">New York</option>
                                                <option value="dhaka">Dhaka</option>
                                                <option value="lon">London</option>
                                                <option value="is">Islamabad</option>
                                            </select>
                                            <span className='select-icon'>
                                                <i className='icofont-rounded-down'></i>
                                            </span>
                                        </div>
                                        <input type="text" name="postalcode" id="postalcode"
                                        className='cart-page-input-text' placeholder='PostCode/ZIP' />
                                        <button type='submit'>Update Address</button>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="cart-overview">
                                        <h5>Cart Totals</h5>
                                        <ul className="lab-ul">
                                            <li>
                                                <span className='pull-left'>Cart Subtotal</span>
                                                <p className='pull-right'>${cartSubtotal}</p>
                                            </li>
                                            <li>
                                                <span className='pull-left'>Shipping and Handling</span>
                                                <p className='pull-right'>Free Shipping</p>
                                            </li>
                                            <li>
                                                <span className='pull-left'>Order Total</span>
                                                <p className='pull-right'>$ {orderTotal.toFixed(2)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                         </div>


                      </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage
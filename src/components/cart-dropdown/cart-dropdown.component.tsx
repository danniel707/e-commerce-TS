import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector'

import { setIsCartOpen, clearCartItems } from '../../store/cart/cart.action'
import { selectCurrentUser } from '../../store/user/user.selector'
import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component'

import {
	CartDropdownContainer, 
	EmptyMessage, 
	CartItems
	} from './cart-dropdown.styles';

const CartDropdown = () => {
	const currentUser = useSelector(selectCurrentUser)
	const cartItems = useSelector(selectCartItems);
	const isCartOpen = useSelector(selectIsCartOpen);
	const dispatch = useDispatch();	
	const navigate = useNavigate();

	useEffect(() => {
	    // Clear cart items when currentUser changes to null
	    if (!currentUser) {
	      dispatch(clearCartItems());
	    }
	  }, [currentUser, dispatch]);

	const goToCheckoutHandler = () => {		
		navigate('/checkout')
		//Close the cart
		const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
		toggleIsCartOpen();			
	}

	return (
		<CartDropdownContainer>
			<CartItems>
		        {currentUser && cartItems.length ? (
		          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
		        ) : (
		          <EmptyMessage>Your cart is empty</EmptyMessage>
		        )}
	      	</CartItems>
	      	{currentUser ? (
	        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
	      	) : (
	        <Button onClick={goToCheckoutHandler} disabled>GO TO CHECKOUT</Button>
	      	)}
		</CartDropdownContainer>
	)
}

export default CartDropdown;
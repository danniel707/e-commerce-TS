import { useDispatch, useSelector } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector' 
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCurrentUser } from '../../store/user/user.selector'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import './product-card.styles.scss'

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems)
	const currentUser = useSelector(selectCurrentUser)

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
	
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className='footer-product-card'>
				<span className='name'>{name}</span>
				<span className='price'>${price}</span>
			</div>
			{currentUser && (
	        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>

	      	)}
					</div>
	)	
}

export default ProductCard;
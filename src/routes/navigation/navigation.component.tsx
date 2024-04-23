import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdowm from '../../components/cart-dropdown/cart-dropdown.component'
import { useNavigate } from 'react-router-dom'

import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { selectCurrentUser, selectUserData } from '../../store/user/user.selector'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import Footer from '../../components/footer/footer.component'
import { NavigationContainer, NavLinks, NavLink, Logo, Brand } from './navigation.styles'

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const userData = useSelector(selectUserData)
  const isCartOpen = useSelector(selectIsCartOpen)
  const navigate = useNavigate();
  
  const signOutHandler = () => {   
    navigate('/')       
    signOutUser() 
  }

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to='/'>
          <img src="../../../logo.png" alt="brand" />
        </Logo>
        <Brand to='/'>
         
        </Brand>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          <CartIcon />
          {currentUser ? (
            <Fragment>
              {userData ? (
                <p><strong>{userData.displayName}</strong></p>
              ) : (
                <p>{currentUser.displayName}</p>
              )}
              
              <NavLink to="/" onClick={signOutHandler}>SIGN OUT</NavLink>
            </Fragment>
          ) : (
            <NavLink to='/auth'>LOG IN/SIGN IN</NavLink>
          )}
          
        </NavLinks>
        {isCartOpen && <CartDropdowm />}
      </NavigationContainer>
      <Outlet /> {/* This is where all the other pages are contained */}
      <Footer />
    </Fragment>
  )
}

export default Navigation;
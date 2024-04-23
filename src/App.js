import { useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  fetchUser
} from './utils/firebase/firebase.utils';

import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser, setUserData } from './store/user/user.action';
import { selectCurrentUser } from './store/user/user.selector'

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const fetchedUser = currentUser ? await fetchUser(currentUser.uid) : null;
          dispatch(setUserData(fetchedUser));
        } catch (error) {
          console.error(error);
        }
      }
      fetchUserData();
  }, [currentUser, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />    
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>  
    </Routes>
  );
}

export default App;
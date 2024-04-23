import {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

import Spinner from '../../components/spinner/spinner.component'

const Shop = () => {
  const dispatch = useDispatch();
  //Get Cateogories for the Redux Store
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesDocuments();
      dispatch(setCategories(categoriesArray));

    };

    getCategoriesMap();
  }, []);

	return(
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	)
};

export default Shop;
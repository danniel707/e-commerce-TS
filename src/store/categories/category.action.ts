import { CATEGORIES_ACTION_TYPES, Category } from './category.types';
import { createAction, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';


export type SetCategories = ActionWithPayload<CATEGORIES_ACTION_TYPES.SET_CATEGORIES, Category[]>

export const setCategories = withMatcher((categoriesArray: Category[]): SetCategories =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray));
import {
  getGearCategoriesForUser,
  addGearCategoryForUser,
  deleteCategoryForUser,
} from '../apis/gear.api'

export const SET_GEARCATEGORIES_SUCCESS = 'SET_GEARCATEGORIES_SUCCESS'

export function fetchGearCategoriesForUser(userId) {
  return (dispatch) => {
    return getGearCategoriesForUser(userId)
      .then((categories) => {
        dispatch(setGearCategoriesSuccess(categories))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function addGearCategory(category) {
  return (dispatch) => {
    return addGearCategoryForUser(category)
      .then((categories) => {
        dispatch(setGearCategoriesSuccess(categories))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function deleteCategory(categoryId, userId) {
  return (dispatch) => {
    return deleteCategoryForUser(categoryId, userId)
      .then((categories) => {
        dispatch(setGearCategoriesSuccess(categories))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function setGearCategoriesSuccess(categories) {
  return { type: SET_GEARCATEGORIES_SUCCESS, payload: categories }
}

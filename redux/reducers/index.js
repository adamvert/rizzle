import { combineReducers } from 'redux'
import { items, itemsHasErrored } from './items'
// import { currentItem } from './currentItem'
import { itemDidScroll } from './item'
import { toolbar } from './toolbar'

export default combineReducers({
  items,
  itemsHasErrored,
  // currentItem,
  itemDidScroll,
  toolbar
})

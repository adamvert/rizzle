import {REHYDRATE} from 'redux-persist'
import {
  itemMarkRead,
  itemSetScrollOffset,
  itemToggleMercury,
  itemDecorationSuccess,
  itemsFlate,
  updateCurrentItemTitleFontSize,
  updateCurrentItemTitleFontResized
} from './items-common'
import {
  addStylesIfNecessary,
  fixRelativePaths,
  nullValuesToEmptyStrings,
  addMercuryStuffToItem,
  addCoverImageToItem,
  setShowCoverImage
} from '../../utils/item-utils.js'

export const initialState = {
  items: [],
  index: 0
}

export const itemsSaved = (state = initialState, action) => {
  let items = []
  let newItems = []
  let savedItems = []
  let savedItem = {}
  let newState = {}

  switch (action.type) {
    case 'ITEMS_REHYDRATE_SAVED':
      // workaround to make up for slideable bug
      if (action.items) {
        console.log('REHYDRATE SAVED ITEMS!')
        return {
          items: action.items
        }
      }
      return { ...state }

    case 'ITEMS_UPDATE_CURRENT_INDEX':
      if (action.displayMode === 'saved') {
        newState.index = action.index
      }
      return {
        ...state,
        ...newState
      }

    case 'ITEM_MARK_READ':
      return itemMarkRead(action, state)

    case 'ITEM_SET_SCROLL_OFFSET':
      return itemSetScrollOffset(action, state)

    case 'ITEM_TOGGLE_MERCURY':
      return itemToggleMercury(action, state)

    case 'ITEM_SAVE_ITEM':
      items = [ ...state.items ]
      savedItem = action.item
      savedItem.isSaved = true
      items.push({
        ...savedItem,
        savedAt: Date.now()
      })
      return {
        ...state,
        items
      }

    case 'ITEM_SAVE_EXTERNAL_ITEM':
      items = [ ...state.items ]
      savedItem = nullValuesToEmptyStrings(action.item)
      savedItem = addStylesIfNecessary(savedItem)
      savedItem.isSaved = true
      items.push({
        ...savedItem,
        savedAt: Date.now()
      })
      return {
        ...state,
        items
      }

    // TODO; saved index
    case 'ITEM_UNSAVE_ITEM':
      let savedIndex = state.items.indexOf(action.item) || 0
      savedItem = state.items[savedIndex]
      items = state.items.filter((item) => item._id !== action.item._id)
      if (savedItem) savedItem.isSaved = false
      if (savedIndex > items.length - 1) {
        savedIndex = items.length - 1
      }
      return {
        ...state,
        items
      }

    case 'SAVED_ITEMS_SET_LAST_UPDATED':
      return {
        ...state,
        lastUpdated: Date.now()
      }

    case 'ITEMS_BATCH_FETCHED':
      if (action.itemType !== 'saved') return state
      debugger
      items = [...state.items]
      newItems = action.items
      newItems.forEach(newItem => {
        let indexToUpdate = items.findIndex(item => item.id === newItem.id || item._id === newItem._id)
        if (indexToUpdate !== -1) {
          items[indexToUpdate] = newItem
        } else {
          items.push(newItem)
        }
      })

      // order by date
      items.sort((a, b) => a.created_at - b.created_at)

      return {
        ...state,
        items,
        index: 0
      }

    case 'ITEMS_FLATE':
      return itemsFlate(action, state)

    case 'ITEM_DECORATION_SUCCESS':
      return itemDecorationSuccess(action, state)

    case 'UPDATE_CURRENT_ITEM_TITLE_FONT_SIZE':
      return updateCurrentItemTitleFontSize(action, state)

    case 'UPDATE_CURRENT_ITEM_TITLE_FONT_RESIZED':
      if (action.item.title === 'Loading...') return state
      return updateCurrentItemTitleFontResized(action, state)

    default:
      return state
  }
}

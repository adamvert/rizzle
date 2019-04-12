import { mergeItems, id } from '../../utils/merge-items'
import moment from 'moment'

const feedbin = require('./feedbin')
const feedwrangler = require('./feedwrangler')
const rizzle = require('./rizzle')

const MAX_ITEMS_TO_DOWNLOAD = 5000

let backend
let backends = {
  feedbin,
  feedwrangler,
  rizzle
}

export function setBackend (bcknd) {
  backend = bcknd
}

export function loadMercuryStuff (item) {
  const url = getMercuryUrl(item)
  return fetch(url, {
    'headers': new Headers({
      'x-api-key': 'vTNatJB4JsgmfnKysiE9cOuJonFib4U9176DRF2z'
    })})
    .then(response => {
      return response.json()
    })
}

export function getMercuryUrl (item) {
  let url = 'https://api.rizzle.net/mercury/?url=' +
    encodeURIComponent(item.url)
  return url
}

// old items are (fetched items + read items)
export async function fetchItems (callback, type, lastUpdated, oldItems, currentItem, feeds) {

  // { readItems, newItems }
  let items

  if (backend === 'rizzle') {
    items = await rizzle.fetchItems(callback, type, lastUpdated, oldItems, currentItem, feeds, MAX_ITEMS_TO_DOWNLOAD)
  } else if (backend === 'feedwrangler') {
    items = await feedwrangler.fetchItems(callback, type, lastUpdated, oldItems, currentItem, feeds, MAX_ITEMS_TO_DOWNLOAD)
  }

  return items
}

// export async function fetchSavedItems (savedItems, currentItem, feeds, lastUpdated, cb) {

//   // { readItems, newItems }
//   let items

//   if (backend === 'rizzle') {
//     items = await rizzle.getSavedItems(savedItems, MAX_ITEMS_TO_DOWNLOAD, lastUpdated, cb)
//   } else if (backend === 'feedwrangler') {
//     items = await feedwrangler.getSavedItems(savedItems, MAX_ITEMS_TO_DOWNLOAD, lastUpdated, cb)
//   }

//   return items
// }

export function fetchUnreadIds () {
  switch (backend) {
    case 'rizzle':
      return
    case 'feedwrangler':
      return feedwrangler.fetchUnreadIds()
  }
}

export async function markItemRead (item) {
  switch (backend) {
    case 'rizzle':
      return rizzle.markItemRead(item)
    case 'feedwrangler':
      return feedwrangler.markItemRead(item)
  }
}

export async function saveItem (item, folder) {
  switch (backend) {
    case 'rizzle':
      await rizzle.saveItem(item, folder)
      break
    case 'feedwrangler':
      await feedwrangler.saveItem(item)
      break
  }
  return item
}

export async function unsaveItem (item, folder) {
  switch (backend) {
    case 'rizzle':
      await rizzle.unsaveItem(item, folder)
      break
    case 'feedwrangler':
      await feedwrangler.unsaveItem(item)
      break
  }
  return item
}

export function markFeedRead (feed, olderThan) {
  switch (backend) {
    case 'rizzle':
      return
    case 'feedwrangler':
      // return feedwrangler.markFeedRead(feed, olderThan)
  }
}

export function addFeed (url) {
  switch (backend) {
    case 'rizzle':
      return
    case 'feedwrangler':
      return feedwrangler.addFeed(url)
  }
}

export async function getFeedDetails (feed) {
  switch (backend) {
    case 'feedwrangler':
      feed = await feedwrangler.getFeedDetails(feed)
  }
  return await rizzle.getFeedDetails(feed)
}

export function authenticate ({username, password, email}, backend) {
  switch (backend) {
    case 'rizzle':
      return
    case 'feedbin':
      return
    case 'feedwrangler':
      return feedwrangler.authenticate(username, password)
  }
}

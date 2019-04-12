import { delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { InteractionManager } from 'react-native'
import { addFeed, getFeedDetails } from '../backends'
import { id, getFeedColor } from '../../utils/'
import feeds from '../../utils/seedfeeds.js'
import { upsertFeedsFS, addFeedToFirestore } from '../firestore/'
const { desaturated } = require('../../utils/colors.json')
const RNFS = require('react-native-fs')

import { getFeeds, isFirstTime } from './selectors'

function * prepareAndAddFeed (feed) {
  const feeds = yield select(getFeeds)
  if (feeds.find(f => (f.url && f.url === feed.url) ||
    (f._id && f._id === feed._id))) return
  yield addFeed(feed.url)
  console.log(`Added feed: ${feed.title}`)
  feed._id = feed._id || id()
  feed.color = getFeedColor(feeds)
  return feed
}

export function * subscribeToFeed (action) {
  let {feed} = action
  const addedFeed = yield prepareAndAddFeed(feed)
  if (!addedFeed) return

  // no need to wait until this has completed...
  addFeedToFirestore(addedFeed)

  yield put ({
    type: 'FEEDS_ADD_FEED_SUCCESS',
    addedFeed
  })
}

export function * inflateFeeds () {
  const feeds = yield select(getFeeds)
  for (let feed of feeds) {
    yield call(delay, 500)
    if (feed.description || feed.favicon) continue
    const details = yield call(getFeedDetails, feed)
    const inflatedFeed = {
      ...feed,
      ...details
    }
    yield call(InteractionManager.runAfterInteractions)
    yield put({
      type: 'FEEDS_UPDATE_FEED',
      feed: inflatedFeed
    })
    if (inflatedFeed.favicon) {
      const fileName = yield call(cacheFeedFavicon, inflatedFeed)
      yield call(InteractionManager.runAfterInteractions)
      yield put({
        type: 'FEED_CACHED_FAVICON',
        cachedFaviconPath: fileName
      })
    }
  }
}

function cacheFeedFavicon (feed) {
  const url = feed.favicon.url
    || (feed.url.endsWith('/')
      ? feed.url + feed.favicon.path.substring(1)
      : feed.url + feed.favicon.path)
  // making a big assumption that this is a png...
  const fileName = `${RNFS.DocumentDirectoryPath}/feed-icons/${feed._id}.png`
  return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/feed-icons`).then(_ =>
    RNFS.downloadFile({
      fromUrl: url,
      toFile: fileName
    }).promise.then((result) => {
      return fileName
    })
  ).catch((err) => {
    console.log(`Loading feed favicon for ${feed._id} failed :(`)
    console.log(err)
    return false
  })
}

export async function * subscribeToFeeds (action) {
  let {feeds} = action
  let addedFeeds = []
  for (var i = 0; i < feeds.length; i++) {
    let f = yield prepareAndAddFeed(feeds[i])
    if (f) addedFeeds.push(f)
  }

  upsertFeedsFS(addedFeeds)

  yield put({
    type: 'FEEDS_ADD_FEEDS_SUCCESS',
    addedFeeds
  })
}

export function * seedFeeds () {
  const shouldSeed = yield select(isFirstTime)
  if (shouldSeed) {
    yield subscribeToFeeds({feeds})
    // yield put({
    //   type: 'CONFIG_TOGGLE_FIRST_TIME',
    //   isFirstTime: false
    // })
  }
}

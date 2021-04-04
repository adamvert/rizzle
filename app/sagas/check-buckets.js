import SharedGroupPreferences from 'react-native-shared-group-preferences'
import { Clipboard } from "react-native"
import { isIgnoredUrl } from "../storage/async-storage"
import { parseString } from 'react-native-xml2js'
import log from '../utils/log'
import { call } from '@redux-saga/core/effects'

const GROUP_NAME = 'group.com.adam-butler.rizzle'

export function * checkBuckets () {
  yield checkClipboard()
  yield checkPageBucket()
  yield checkFeedBucket()
}

function * checkClipboard () {
  console.log('Checking clipboard')
  try {
    let contents = yield call(Clipboard.getString)
    // TODO make this more robust
    if (contents.substring(0, 4) === 'http') {
      const isIgnored = yield call(isIgnoredUrl, contents)
      if (!isIgnored) {
        yield showSavePageModal(contents, true)
      }
    } else if (contents.substring(0, 6) === '<opml>') {
    }
  } catch(err) {
    log('checkClipboard', err)
  }
}

function * checkPageBucket () {
  SharedGroupPreferences.getItem('page', GROUP_NAME).then(value => {
    if (value !== null) {
      SharedGroupPreferences.setItem('page', null, GROUP_NAME)
      value = typeof value === 'object' ?
        value[0] :
        value
      console.log(`Got a page to save: ${value}`)
      showSavePageModal(value)
    }
  }).catch(err => {
    // '1' just means that there is nothing in the bucket
    if (err !== 1) {
      log('checkPageBucket', err)
    }
  })
}

function * checkFeedBucket () {
  SharedGroupPreferences.getItem('feed', GROUP_NAME).then(value => {
    if (value !== null) {
      const url = value
      SharedGroupPreferences.setItem('feed', null, GROUP_NAME)
      console.log(`Got a feed to subscribe to: ${url}`)
      // TODO check that value is a feed url
      // TODO check that feed is not already subscribed!
      // right now it will just get ignored if it's already subscribed
      // but it might be nice to say that in the message
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response
        })
        .then((response) => {
          return response.text()
        })
        .then((xml) => {
          parseString(xml, (error, result) => {
            if (error) {
              throw error
            }
            let title, description
            if (result.rss) {
              title = typeof result.rss.channel[0].title[0] === 'string' ?
                result.rss.channel[0].title[0] :
                result.rss.channel[0].title[0]._
              description = result.rss.channel[0].description ?
                (typeof result.rss.channel[0].description[0] === 'string' ?
                  result.rss.channel[0].description[0] :
                  result.rss.channel[0].description[0]._) :
                ''
            } else if (result.feed) {
              // atom
              title = typeof result.feed.title[0] === 'string' ? 
                result.feed.title[0] : 
                result.feed.title[0]._
              description = result.feed.subtitle ?
                (typeof result.feed.subtitle[0] === 'string' ? 
                  result.feed.subtitle[0] : 
                  result.feed.subtitle[0]._) :
                ''
            }
            showSaveFeedModal(url, title, description)
          })
        })
        .catch(err => {
          log('checkFeedBucket', err)
        })
    }
  }).catch(err => {
    // '1' just means that there is nothing in the bucket
    if (err !== 1) {
      log('checkFeedBucket', err)
    }
  })
}

function * showSavePageModal (url, isClipboard = false) {
  let displayUrl = url
  if (displayUrl.length > 64) {
    displayUrl = displayUrl.slice(0, 64) + '…'
  }
  let modalText = [
    {
      text: 'Save this page?',
      style: ['title']
    },
    {
      text: displayUrl,
      style: ['em']
    }
  ]
  if (isClipboard) {
    modalText.push({
      text: 'This URL was in your clipboard. Copying a URL is an easy way to save a page in Rizzle.',
      style: ['hint']
    })
  }
  yield showModal({
    modalText,
    modalHideCancel: false,
    modalShow: true,
    modalOnOk: () => {
      saveURL(url)
    }
  })
}

function * showSaveFeedModal (url, title, description) {
  yield showModal({
    modalText: [
      {
        text: 'Add this feed?',
        style: ['title']
      },
      {
        text: title,
        style: ['em']
      },
      {
        text: description,
        style: ['em', 'smaller']
      }
    ],
    modalHideCancel: false,
    modalShow: true,
    modalOnOk: () => {
      addFeed({
        url,
        title,
        description
      })
      fetchData()
    }
  })
}

function * showModal (modalProps) {
  yield put({
    type: SHOW_MODAL,
    modalProps
  })
}

function * saveURL (url) {
  yield put({
    type: SAVE_EXTERNAL_URL,
    url
  })
  yield put({
    type: SET_DISPLAY_MODE,
    displayMode: ItemType.saved
  })
}

function * addFeed (feed) {
  yield put({
    type: ADD_FEED,
    feed
  })
}

function * fetchData () {
  dispatch({
    type: FETCH_ITEMS
  })
}

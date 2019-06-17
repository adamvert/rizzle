const initialState = {
  feeds: [],
  lastUpdated: 0
}

export function feeds (state = initialState, action) {
  let feeds
  let feed
  let newState, dirtyFeed, dirtyFeedIndex

  switch (action.type) {
    case 'FEEDS_ADD_FEED_SUCCESS':
      let cleanedFeeds = state.feeds.filter(feed => !!feed)
      return {
        ...state,
        feeds: [
          ...cleanedFeeds,
          action.addedFeed
        ]
      }
    case 'FEEDS_ADD_FEEDS_SUCCESS':
      let newFeeds = action.addedFeeds.filter(addedFeed => {
        return !state.feeds
          .find(feed => feed.url === addedFeed.url || feed._id === addedFeed._id)
      })
      return {
        ...state,
        feeds: [
          ...state.feeds,
          ...newFeeds
        ]
      }
    case 'FEEDS_ADD_FEED':
      console.log(action)
      return state

    case 'FEEDS_REMOVE_FEED':
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed._id !== action.id)
      }

    case 'FEEDS_UPDATE_FEEDS':
      return {
        ...state,
        feeds: action.feeds
      }

    case 'FEEDS_UPDATE_FEED':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.feed._id ?
          {
            ...feed,
            ...action.feed
          } :
          feed)
      }

    case 'FEED_SET_CACHED_COVER_IMAGE':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.id ?
          {
            ...feed,
            cachedCoverImageId: action.cachedCoverImageId
          } :
          feed)
      }

    case 'ITEM_ADD_READING_TIME':
      feeds = [ ...state.feeds ]
      feed = feeds.find(feed => feed._id === action.item.feed_id)

      feed.reading_time = feed.reading_time || 0
      feed.reading_time += action.readingTime

      feed.number_read = feed.number_read || 0
      feed.number_read++
      feed.number_unread--

      const getContentLength = (item) => {
        if (item.hasShownMercury) {
          return item.content_mercury.length
        } else if (item.content_html) {
          return item.content_html.length
        } else {
          return 1
        }
      }

      const readingRate = action.readingTime / getContentLength(action.item)
      feed.reading_rate = (feed.reading_rate && feed.reading_rate !== 'NaN') ?
        feed.reading_rate :
        0
      feed.reading_rate = (feed.reading_rate * (feed.number_read - 1) + readingRate) / feed.number_read
      feed.reading_rate = Number.parseFloat(feed.reading_rate.toFixed(4))

      if (feed.reading_rate === null || feed.reading_rate === 'NaN') {
        debugger
      }

      return {
        ...state,
        feeds
      }

    case 'ITEM_SHARE_ITEM':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.item.feed_id ?
          {
            ...feed,
            number_shared: feed.number_shared ? feed.number_shared + 1 : 1
          } :
          feed)
      }

    case 'ITEM_SAVE_ITEM':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.item.feed_id ?
          {
            ...feed,
            number_saved: feed.number_saved ? feed.number_saved + 1 : 1
          } :
          feed)
      }

    case 'FEED_LIKE':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.feed._id ?
          {
            ...feed,
            like: true
          } :
          feed)
      }

    case 'FEED_UNLIKE':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.feed._id ?
          {
            ...feed,
            like: false
          } :
          feed)
      }

    case 'FEED_MUTE':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.feed._id ?
          {
            ...feed,
            muted: true
          } :
          feed)
      }

    case 'FEED_UNMUTE':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.feed._id ?
          {
            ...feed,
            muted: false
          } :
          feed)
      }

    case 'ITEMS_MARK_READ':
      return updateUnreadCounts(action.items, state)

    case 'ITEMS_PRUNE_UNREAD':
      return updateUnreadCounts(action.prunedItems, state)

    case 'ITEM_MARK_READ':
      return {
        ...state,
        feeds: state.feeds.map(feed => feed._id === action.item.feed_id ?
          {
            ...feed,
            number_unread: feed.number_unread - 1
          } :
          feed)
      }

    default:
      return state
  }
}

function updateUnreadCounts (itemsToClear, state) {
  let feedsWithCleared = {}
  itemsToClear.forEach(item => {
    let feed
    if (feedsWithCleared[item.feed_id]) {
      feedsWithCleared[item.feed_id]++
    } else {
      feedsWithCleared[item.feed_id] = 1
    }
  })
  return {
    ...state,
    feeds: state.feeds.map(feed => feedsWithCleared[feed._id] ?
      {
        ...feed,
        number_unread: feed.number_unread - feedsWithCleared[feed._id]
      } :
      feed)
  }
}
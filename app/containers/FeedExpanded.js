import { connect } from 'react-redux'
import FeedExpanded from '../components/FeedExpanded.js'
// import {getCachedCoverImagePath} from '../utils/'

const mapStateToProps = (state, ownProps) => {
  const feedId = ownProps.feed ?
    ownProps.feed._id :
    ownProps.feedId
  const feed = state.feeds.feeds.find(f => f._id === feedId)
  const items = state.itemsUnread.items

  // this stuff is all in the ownProps from FeedContracted,
  // but not from TopBar - hence we have to get it
  const feedLocal = state.feedsLocal.feeds.find(f => f._id === feedId)
  const feedItems = items.filter(i => i.feed_id === feedId)
  const numFeedItems = feedItems.length
  const coverImageItem = feedItems.find(item => item.banner_image)
  const coverImageId = coverImageItem ?
    coverImageItem._id :
    null
  const coverImageDimensions = coverImageItem ?
    coverImageItem.imageDimensions :
    null
  const isFiltered = state.config.feedFilter && state.config.feedFilter === feedId

  if (feed) {
    return {
      ...ownProps,
      feed: {
        ...feed,
        isFiltered,
        numUnread: feedItems.length,
        numRead: feed.number_read || 0,
        readingTime: feed.reading_time || 0,
        readingRate: feed.reading_rate || 0,
        coverImageId,
        coverImageDimensions,
        cachedCoverImageId: feedLocal && feedLocal.cachedCoverImageId,
        iconDimensions: feedLocal && feedLocal.cachedIconDimensions
      },
      isFeedOnboardingDone: state.config.isFeedOnboardingDone
    }
  } else {
    return {
      isDeleted: true
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterItems: (id) => dispatch({
      type: 'CONFIG_SET_FEED_FILTER',
      feedFilter: id
    }),
    setIndex: (index) => dispatch({
      type: 'ITEMS_UPDATE_CURRENT_INDEX',
      index,
      displayMode: 'unread'
    }),
    markAllRead: (id, originalId, olderThan) => dispatch({
      type: 'FEED_MARK_READ',
      id,
      originalId,
      olderThan: olderThan || Date.now()
    }),
    clearReadItems: () => dispatch({
      type: 'ITEMS_CLEAR_READ'
    }),
    unsubscribe: (id) => dispatch({
      type: 'FEEDS_REMOVE_FEED',
      id
    }),
    toggleMute: (id) => dispatch({
      type: 'FEED_TOGGLE_MUTE',
      id
    }),
    toggleLike: (id) => dispatch({
      type: 'FEED_TOGGLE_LIKE',
      id
    }),
    setCachedCoverImage: (feedId, cachedCoverImageId) => {
      return dispatch({
        type: 'FEED_SET_CACHED_COVER_IMAGE',
        id: feedId,
        cachedCoverImageId
      })
    }
  }
}

let FeedExpandedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedExpanded)

export default FeedExpandedContainer

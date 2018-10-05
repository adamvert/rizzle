import { connect } from 'react-redux'
import Feed from '../components/Feed.js'
import {getCachedImagePath} from '../utils/'

const mapStateToProps = (state, ownProps) => {
  const feed = ownProps.feed
  const items = state.items.items
  const feedItems = items.filter(i => i.feed_id === feed._id)
  const numFeedItems = feedItems.length
  const coverImageItem = feedItems.find(item => item.banner_image)
  const coverImagePath = coverImageItem ? getCachedImagePath(coverImageItem) : null
  return {
    ...ownProps,
    numFeedItems,
    coverImagePath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAllRead: (id) => dispatch({
      type: 'FEED_MARK_READ',
      id
    }),
    unsubscribe: (id) => dispatch({
      type: 'FEEDS_REMOVE_FEED',
      id
    })
  }
}

let FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default FeedContainer

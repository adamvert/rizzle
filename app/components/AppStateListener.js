import React from 'react'
import { Alert, AppState, Clipboard, Text, TouchableHighlight, View } from 'react-native'
// import { RNSKBucket } from 'react-native-swiss-knife'
import SharedGroupPreferences from 'react-native-shared-group-preferences'
import { parseString } from 'react-native-xml2js'
// import { RizzleModal } from './RizzleModal'

class AppStateListener extends React.Component {

  group = 'group.com.adam-butler.rizzle'

  MINIMUM_UPDATE_INTERVAL = 600000 // 10 minutes

  constructor (props) {
    super(props)
    this.props = props

    this.checkClipboard = this.checkClipboard.bind(this)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.showSavePageModal = this.showSavePageModal.bind(this)
    this.showSaveFeedModal = this.showSaveFeedModal.bind(this)

    AppState.addEventListener('change', this.handleAppStateChange)
  }

  async handleAppStateChange (nextAppState) {
    if (this.props.appState.match(/inactive|background/) && nextAppState === 'active') {
      Alert.alert('AppState changed to ACTIVE from ' + this.props.appState)
      this.checkClipboard()
      await this.checkPageBucket()
      await this.checkFeedBucket()
      // see Rizzle component

      if (!global.isStarting && (Date.now() - this.props.lastUpdated > this.MINIMUM_UPDATE_INTERVAL)) {
        this.props.fetchData()
      }
    }
  }

  checkClipboard () {
    console.log('Checking clipboard')
    const that = this
    Clipboard.getString().then(contents => {
      console.log('Clipboard contents: ' + contents)
      console.log(contents.substring(0, 4))
      // TODO make this more robust
      if (contents.substring(0, 4) === 'http') {
        that.showSavePageModal(contents)
      } else if (contents.substring(0, 6) === '<opml>') {
      }
    })
  }

  async checkPageBucket () {
    SharedGroupPreferences.getItem('page', this.group).then(value => {
      if (value !== null) {
        SharedGroupPreferences.setItem('page', null, this.group)
        console.log(`Got a page to save: ${value}`)
        this.showSavePageModal(value)
      }
    })
  }

  async checkFeedBucket () {
    const that = this
    SharedGroupPreferences.getItem('feed', this.group).then(value => {
      if (value !== null) {
        const url = value
        SharedGroupPreferences.setItem('feed', null, this.group)
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
            let parsed = parseString(xml, (error, result) => {
              let title, description
              if (result.rss) {
                title = result.rss.channel[0].title[0]
                description = result.rss.channel[0].description ?
                  result.rss.channel[0].description[0] :
                  ''
              } else if (result.feed) {
                // atom
                title = result.feed.title[0]
                description = result.feed.subtitle ?
                  result.feed.subtitle[0] :
                  ''
              }
              this.showSaveFeedModal(url, title, description, that)
            })
          })
      }
    })
  }

  showSavePageModal (url) {
    this.props.showModal({
      modalText: [
        {
          text: 'Save this page?',
          style: ['title']
        },
        {
          text: url,
          style: ['em']
        }
      ],
      modalHideCancel: false,
      modalShow: true,
      modalOnOk: () => {
        this.props.saveURL(url)
      }
    })
  }

  showSaveFeedModal (url, title, description, scope) {
    scope.props.showModal({
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
        scope.props.addFeed({
          url,
          title,
          description
        })
        scope.props.fetchData()
      }
    })
  }

  render () {
    return null
  }
}

export default AppStateListener

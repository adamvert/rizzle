import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../redux/store/configureStore.js'
import { Sentry } from 'react-native-sentry'
import App from './App.js'
import { setBackend } from '../redux/backends'

export default class Rizzle extends Component {
  constructor (props) {
    super(props)
    this.props = props

    setBackend('rizzle')

    this.store = configureStore()

    Sentry
      .config('https://1dad862b663640649e6c46afed28a37f:08138824595d4469b62aaba4c01c71f4@sentry.io/195309')
      .install()

    // this is a stupid hack to stop AppState firing on startup
    // which it does on the device in some circumstances
    global.isStarting = true
    setTimeout(() => {
      global.isStarting = false
    }, 5000)
  }

  render () {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}


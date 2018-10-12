import React from 'react'
import {
  Button,
  Dimensions,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import FeedsScreenContainer from '../containers/FeedsScreen.js'
import FeedInfoScreenContainer from '../containers/FeedInfoScreen.js'
import ItemCarouselContainer from '../containers/ItemCarousel.js'
import RizzleModalContainer from '../containers/RizzleModal.js'
import RizzleImageViewerContainer from '../containers/RizzleImageViewer.js'
import ToolbarsContainer from '../containers/Toolbars.js'
import LogoSpinnerContainer from '../containers/LogoSpinner.js'
import AppStateListenerContainer from '../containers/AppStateListener.js'
import SplashScreen from 'react-native-splash-screen'
import { FluidNavigator } from 'react-navigation-fluid-transitions'

// temporary hacky approach
class ItemsScreen extends React.Component {

  componentDidMount () {
    SplashScreen.hide()
  }

  render = () => (
    <View style={{flex: 1}}>
      <StatusBar barStyle='light-content' />
      <AppStateListenerContainer />
      <ToolbarsContainer navigation={this.props.navigation}/>
      <View style={styles.infoView} />
      <Image
        source={require('../assets/images/dark-splash.png')}
        style={styles.image}
        onLoad={() => {
          SplashScreen.hide()
        }}
      />
      <LogoSpinnerContainer />
      <ItemCarouselContainer style={styles.ItemCarousel} />
      <RizzleImageViewerContainer />
    </View>
  )

  // render = () => (
  //   <View style={{flex: 1}}>
  //     <StatusBar barStyle='light-content' />
  //     <AppStateListenerContainer />
  //     <ToolbarsContainer navigation={this.props.navigation}/>
  //     <View style={styles.infoView} />
  //     <Image
  //       source={require('../assets/images/dark-splash.png')}
  //       style={styles.image}
  //       onLoad={() => {
  //         SplashScreen.hide()
  //       }}
  //     />
  //     <LogoSpinnerContainer />
  //     <RizzleImageViewerContainer />
  //   </View>
  // )
}

// class App extends React.Component {

//   constructor (props) {
//     super(props)
//     this.props = props
//   }

//   componentDidMount () {
//     SplashScreen.hide()
//   }

//   render () {
//     return (
//       <View style={styles.mainView}>
//         <AppStateListenerContainer />
//         <StatusBar barStyle='dark-content' />
//         <RizzleModalContainer />
//         <FeedView />
//       </View>
//     )
//   }
// }

const transitionConfig = {
  duration: 300,
  // timing: Animated.timing,
  easing: Easing.out(Easing.elastic(1)),
  // useNativeDriver: true
}

export default FluidNavigator(
  {
    Feeds: {screen: FeedsScreenContainer},
    FeedInfo: {screen: FeedInfoScreenContainer, navigationOption: { gesturesEnabled: true }},
    Items: {screen: ItemsScreen},
  },
  {
    initialRouteName: 'Items',
    transitionConfig
  }
)

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  infoView: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(42, 12%, 95%)'
    // backgroundColor: 'white'
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#f6f6f6'
  },
  ItemCarousel: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: 1024,
    height: 1366,
    top: (height - 1366) / 2,
    left: (width - 1024) / 2
  }
})

// export default App

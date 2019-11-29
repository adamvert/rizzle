import React from 'react'
import {Animated, Dimensions, Image, View } from 'react-native'

import {Surface} from 'gl-react-native'
import { VibrancyView } from 'react-native-blur'

import Svg, {Text} from 'react-native-svg'
import {ContrastSaturationBrightness} from 'gl-react-contrast-saturation-brightness'
import ColorBlending from 'gl-react-color-blending'
import GLImage from 'gl-react-image'

import { blendColor, hslString } from '../utils/colors'
import { isIphoneX } from '../utils'

class CoverImage extends React.Component {
  constructor (props) {
    super(props)
    this.props = props

    this.blurRadius = 10

    const window = Dimensions.get('window')
    this.screenWidth = window.width
    this.screenHeight = window.height

    this.blendMode = props.styles.isMultiply
      ? 'blendMultiply'
      : (props.styles.isScreen
        ? 'blendScreen'
        : 'none')

    // go for all out bw
    if (props.styles.isBW) {
      this.saturation = 0
      // this.contrast = 1.4
      // this.brightness = 1.4
    }

    this.flipColours = Math.random() > 0.5
  }

  getColor () {
    const {color, isCoverImageDarker, isCoverImageLighter} = this.props.styles
    let palette = ''
    if (isCoverImageLighter) palette = 'lighter'
    if (isCoverImageDarker) palette = 'darker'
    return hslString(color, palette)
  }

  // if image too small, returns < 1
  getImageSizeRatio () {
    const widthRatio = this.props.imageDimensions.width / this.screenWidth
    const heightRatio = this.props.imageDimensions.height / this.screenHeight
    return Math.min(widthRatio, heightRatio)
  }

  shouldComponentUpdate (prevProps, prevState) {
    return prevProps.imagePath !== this.props.imagePath ||
      (prevProps.imageDimensions ?
        prevProps.imageDimensions.width !== this.props.imageDimensions.width :
        false)
  }

  render () {
    const {isInline, resizeMode, isMultiply, isScreen, color} = this.props.styles
    const {imageDimensions} = this.props
    const absolute = {
      position: 'absolute',
      top: '0%',
      height: isInline ? '100%' : '120%',
      left: isInline ? '0%' : '-10%',
      width: isInline ? '100%' : '120%'
    }
    const inline = {
      flex: 1,
      width: '100%',
      marginTop: isIphoneX() ? 90 : 70,
      // weird bug with the top pixel row of images
      top: -1,
      marginBottom: -1
    }
    const position = isInline ? inline : absolute
    const scrollOffset = this.props.scrollOffset || 0
    const imageHeight = this.screenWidth / imageDimensions.width * imageDimensions.height
    const scale = isInline ?
      scrollOffset.interpolate({
        inputRange: [-imageHeight, 0, 1],
        outputRange: [2, 1, 1]
      }) :
      scrollOffset.interpolate({
        inputRange: [-100, 0, this.screenHeight],
        outputRange: [1.3, 1, 0.8]
      })
    const translateY = isInline ?
      scrollOffset.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-.5, 0, 0]
      }) :
      scrollOffset.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, -0.333]
      })
    const opacity = scrollOffset.interpolate({
      inputRange: [0, this.screenHeight * 0.75, this.screenHeight],
      outputRange: [1, 1, 0]
    })
    const blurOpacity = scrollOffset.interpolate({
      inputRange: [-100, -50, 0, 200],
      outputRange: [0, 0.8, 1, 0]
    })
    let style = {
      ...position,
      backgroundColor: isMultiply || isScreen ? this.getColor() : 'white',
      opacity,
      transform: isInline ?
        [ { translateY }, { scale } ] :
        [ { scale }, { translateY } ]
    }

    if (resizeMode === 'contain') {
      style = {
        ...style,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
    const blurStyle = {
      ...absolute,
      opacity
    }
    const borderStyle = {
      position: 'absolute',
      top: '0%',
      height: '100%',
      left: '0%',
      width: '100%',
      borderWidth: 50,
      borderColor: 'white'
    }

    const saturation = this.getImageSizeRatio() < .75 ? 1.1 : 1
    const contrast = 1.1
    const brightness = this.blendMode == 'blendMultiply' ?
      1.5 :
      this.getImageSizeRatio() < 1 ? 1.2 : 1


    if (this.props.imagePath &&
      this.props.imageDimensions.width > 0 &&
      this.props.imageDimensions.height > 0) {
      const center = this.getCenterArray(this.props.styles.align)
      const colorBlendingColor = blendColor(this.props.styles.color)
      // const colorBlendingColor = [1, 0, 0, 1]

      const image = (
        <GLImage
          center={isInline || resizeMode === 'cover' ? center : undefined}
          key={this.props.imagePath}
          source={{
            uri: `file://${this.props.imagePath}`,
            width: this.props.imageDimensions.width * (isInline ? 1 : 1.2),
            height: this.props.imageDimensions.height * (isInline ? 1 : 1.2)
         }}
          resizeMode={this.props.styles.resizeMode}
          imageSize={{
            width: this.props.imageDimensions.width * (isInline ? 1 : 1.2),
            height: this.props.imageDimensions.height * (isInline ? 1 : 1.2)
          }}
        />
      )
      const blur = (
        <Animated.View
          style={{
            ...position,
            opacity: 1
          }}
        >
          <VibrancyView
            style={absolute}
            blurType='light'
            blurAmount={this.getImageSizeRatio() < 0.3 ? 10 : 2}
          />
        </Animated.View>
      )
      const csb = (
        <ContrastSaturationBrightness
          saturation={saturation}
          contrast={contrast}
          brightness={brightness}
        >
          {image}
        </ContrastSaturationBrightness>
      )
      const blended = (
        <ColorBlending
          color={colorBlendingColor}
          blendMode={this.blendMode}
        >
          {csb}
        </ColorBlending>
      )
      const inlineImageHeight = this.screenWidth / this.props.imageDimensions.width *
        this.props.imageDimensions.height *
        (isInline ? 1 : 1.2)
      const surface = (
        <Surface
          width={this.screenWidth * (isInline ? 1 : 1.2)}
          height={isInline || resizeMode === 'contain' ? inlineImageHeight : this.screenHeight * 1.2}
          backgroundColor="#000"
          key="456"
        >
          { this.blendMode === 'none' ? csb : blended }
        </Surface>
      )
      // return (
      //   <Animated.View style={style}>
      //     { this.state.width && surface }
      //     { blur }
      //   </Animated.View>
      // )
      return (
        <Animated.View
          shouldRasterizeIOS
          style={style}
        >
          { surface }
          { !isInline && this.getImageSizeRatio() < .5 && blur }
        </Animated.View>
      )
    } else {
      // const radius = this.screenWidth * 0.4
      const cx = this.screenWidth * 0.5
      const cy = this.screenHeight * 0.5
      const fill = this.flipColours ? 'white' : this.getColor()
      style.backgroundColor = this.flipColours ? this.getColor() : 'white'

      return (
        <Animated.View
          shouldRasterizeIOS
          style={style}
        >
          <Svg
            height={this.screenHeight * 1.2}
            width={this.screenWidth * 1.2}
          >
            {this.letters.map((l, i) =>
              (<Text
                x={cx * 1.6}
                y={cy}
                fontSize={l.size}
                fontFamily='IBMPlexMono'
                fontWeight={l.weight}
                fill={fill}
                fillOpacity='0.5'
                originX={cx}
                originY={cy}
                rotate={l.rotation}
                textAnchor='middle'
                key={i}
              >{l.letter}</Text>)
            )}
          </Svg>
        </Animated.View>
      )
    }
  }

  getCenterArray (align) {
    const values = {
      'center': [0.5, 0],
      'left': [0, 0],
      'right': [1, 0],
    }
    return values[align]
  }
}

export default CoverImage

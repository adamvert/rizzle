import React from 'react'
import {
  TouchableOpacity,
  View
} from 'react-native'
import {hslString} from '../utils/colors'

class RizzleButton extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  getStyles () {
    const backgroundColor = this.props.backgroundColor || hslString('rizzleSaved')
    const borderColor = this.props.borderColor || hslString('rizzleSaved')
    return {
        backgroundColor,
        // opacity: 0.95,
        width: 56,
        height: 56,
        borderRadius: 28,
        borderColor: borderColor,
        borderWidth: 2,
        justifyContent: 'center',
        flexDirection: 'column',
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        opacity: 0.8
        // shadowRadius: 2,
        // shadowOpacity: 0.1
    }
  }

  render () {
    let newProps = Object.assign({}, this.props)
    delete newProps.style
    return <TouchableOpacity style={{
      ...this.getStyles(),
      ...this.props.style
    }}
    { ...newProps } />
  }
}

export default RizzleButton

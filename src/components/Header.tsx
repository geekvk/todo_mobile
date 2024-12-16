import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BLACK } from '../utils/Colors'

interface HeaderProps{
    title : string
}

const Header : React.FC<HeaderProps> = ({
    title
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container : {
        width : "100%",
        display : 'flex',
        justifyContent : 'flex-start',
        marginBottom : 10,
        marginTop : 5
    },
    headerText : {
        fontSize : 24,
        fontWeight : 'bold',
        color : BLACK
    },

})
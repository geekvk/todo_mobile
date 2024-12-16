import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useReducer, useState } from 'react'
import CommonStyles from '../../utils/CommonStyles'
import { TextInput } from 'react-native-paper'
import { WHITE } from '../../utils/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { useNavigation } from '@react-navigation/core'
import { getAuth, signOut } from 'firebase/auth'
import { logout } from '../../redux/reducer/authReducer'

const BrowseScreen = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      dispatch(logout());
      navigation.navigate('Login')
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <View style={[CommonStyles.container, styles.container]}>
      
    <View style={styles.loginContainer}>
      <Image
        source={require('../../../assets/Login.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text>{ username } </Text>
      <TouchableOpacity 
        style={styles.loginOption}
        onPress={handleLogout}
      >
        <Text style={{
          fontSize : 16,
          fontWeight : 'semibold'
        }}> Logout </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default BrowseScreen

const styles = StyleSheet.create({
  container : {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
  },
  image : {
    width : 200,
    height : 300,
    borderRadius : 10
  },
  loginContainer : {
    width : '100%',
    flex : 1,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
  },
  input: {
    width: '80%',
    marginBottom: 10,
    backgroundColor : WHITE
  },
  loginOption : {
    width : "80%",
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-evenly',
    paddingVertical : 10,
    paddingHorizontal : 20,
    borderRadius : 20,
    backgroundColor : WHITE,
    elevation : 1,
    marginTop : 10
  },
  loginImage : {
    width : 30,
    height : 30,
    marginRight : 10
  }
})
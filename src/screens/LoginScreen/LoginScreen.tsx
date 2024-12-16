import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native'
import React, { Children, useCallback, useMemo, useRef, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' 
import { app } from '../../../firebase'
import { BLUE, RED, WHITE } from '../../utils/Colors';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RegisterSheet from '../../components/RegisterSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/authReducer';

const LoginScreen = () => {
  const[status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const dispatch = useDispatch()

  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const toggleSheet = () => {
    setStatus(!status)
  }

  const handleLogin = () => {
    if(email === "" || password === ""){
        return alert('Password and Email are requred')
    }
    signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log(user)
        dispatch(login(user.email))
        await SecureStore.setItemAsync('user', JSON.stringify(user));
        navigation.navigate('Tabs')
    }).catch((e) => {
        alert(e.message)
    })
  }

  return (
    <GestureHandlerRootView  style={styles.container}>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity 
        style={styles.loginOption}
        onPress={handleLogin}
        >
        
        <Text style={{
            fontSize : 18,
            fontWeight : 'bold',
            color : WHITE
        }}> Sign In </Text>
    </TouchableOpacity>
    <TouchableOpacity 
        style={{
            marginTop : 10
        }}
        onPress={toggleSheet}
    >

        <Text style={{
            fontSize : 18,
            fontWeight : 'semibold',
            color : BLUE
        }}> Register </Text>
    </TouchableOpacity>
    { status && <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
            <RegisterSheet/>
        </BottomSheetView>
      </BottomSheet>}
    </GestureHandlerRootView>
  );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      display : 'flex',
      alignItems : 'center',
      padding: 16,
    },
    input: {
      borderBottomWidth: 1,
      marginBottom: 12,
      width : '80%'
    },
    loginOption : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 20,
        backgroundColor : RED,
        elevation : 1,
        marginTop : 10
      },
      loginImage : {
        width : 30,
        height : 30,
        marginRight : 10
      },
      bottomSheetBackground: {
        backgroundColor: "#f8f9fa",
      },
      contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxHeight : '400%'
      },
  });
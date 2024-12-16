import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { BG_WHITE } from '../utils/Colors';

interface ScreenLayoutProps {
  children : ReactNode;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
}
const ScreenLayout : React.FC<ScreenLayoutProps> = ({ 
  children,
  statusBarStyle = 'default',
  statusBarBackgroundColor = 'transparent'
}) => {
  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent
      />
      <View style={styles.container} >
        { children }
      </View>
    </SafeAreaView>
  )
}

export default ScreenLayout

const styles = StyleSheet.create({
    bg : {
      flex : 1
    },
    container : {
        flex : 1,
        backgroundColor : BG_WHITE,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    }
})
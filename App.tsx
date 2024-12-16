import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScreenLayout from './src/components/ScreenLayout';
import { BLUE, RED } from './src/utils/Colors';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/bottomNavigation/BottomNavigation';
import store, { RootState } from './src/redux/store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import StackNavigation from './src/navigation/stacknavigator/StackNavigation';
import { useEffect, useState } from 'react';
import SecureStore from 'expo-secure-store';
import { login } from './src/redux/reducer/authReducer';

function AppContent() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await SecureStore.getItemAsync('user');
      if (user) {
        dispatch(login({ email: JSON.parse(user).email }));
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);
  return (
    <ScreenLayout
      statusBarStyle="light-content"
      statusBarBackgroundColor={RED}
    >
      <NavigationContainer>
        {isAuthenticated ? <BottomNavigation /> : <LoginScreen />}
      </NavigationContainer>
    </ScreenLayout>
  );
} 
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store = {store}>
        <AppContent/>
    </Provider>
    </GestureHandlerRootView>
  );
}
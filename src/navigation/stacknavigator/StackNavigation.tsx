import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParams } from "./StackNavigatorParams"
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import { BottomNavigation } from 'react-native-paper';

const Stack = createNativeStackNavigator<StackNavigatorParams>()

const StackNavigation = () => {
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name = 'Tabs' component={BottomNavigation}/>
    </Stack.Navigator>
}

export default StackNavigation
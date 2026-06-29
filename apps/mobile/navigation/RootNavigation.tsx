import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../screens/WelcomeScreen"
import HomeScreen from "../screens/HomeScreen"
import GameScreen from "../screens/GameScreen"

const Stack = createNativeStackNavigator()
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"Game"} component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator

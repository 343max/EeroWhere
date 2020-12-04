import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "@ui-kitten/components"
import * as React from "react"

import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../../types"
import BottomTabNavigator from "./BottomTabNavigator"
import LinkingConfiguration from "./LinkingConfiguration"

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const theme = useTheme()

  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme["color-primary-default"],
      background: theme["background-basic-color-1"],
      card: theme["background-basic-color-2"],
      border: theme["border-basic-color-1"],
    },
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={navigationTheme as Theme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}

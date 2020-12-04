import { createStackNavigator } from "@react-navigation/stack"
import React, { FC } from "react"
import { LoginScreen } from "./LoginScreen"
import { TokenScreen } from "./TokenScreen"

export type LoginFlowParamList = {
  Login: undefined
  Token: undefined
}

const Stack = createStackNavigator<LoginFlowParamList>()

export const LoginFlow: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Token" component={TokenScreen} />
  </Stack.Navigator>
)

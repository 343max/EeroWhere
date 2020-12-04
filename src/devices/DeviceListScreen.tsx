import { createStackNavigator } from "@react-navigation/stack"
import React, { FC } from "react"
import { DeviceList } from "./DeviceList"

const Stack = createStackNavigator()

export const DeviceListScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Devices" component={DeviceList} />
  </Stack.Navigator>
)

import { NavigationContainer, Theme } from "@react-navigation/native"
import { useTheme } from "@ui-kitten/components"
import * as React from "react"

import { LoginFlow } from "../login/LoginFlow"

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const theme = useTheme()

  const navigationTheme: Theme = {
    dark: false,
    colors: {
      primary: theme["color-primary-default"],
      background: theme["background-basic-color-1"],
      card: theme["background-basic-color-2"],
      border: theme["border-basic-color-1"],
      text: theme["text-control-color"],
      notification: theme["color-danger-300"],
    },
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <LoginFlow />
    </NavigationContainer>
  )
}

import { StatusBar } from "expo-status-bar"
import React from "react"
import * as eva from "@eva-design/eva"

import useCachedResources from "./src/hooks/useCachedResources"
import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"
import { ApplicationProvider } from "@ui-kitten/components"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const evaScheme = eva[colorScheme]

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApplicationProvider {...eva} theme={evaScheme}>
        <Navigation />
        <StatusBar />
      </ApplicationProvider>
    )
  }
}

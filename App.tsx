import { StatusBar } from "expo-status-bar"
import React from "react"
import * as eva from "@eva-design/eva"

import useCachedResources from "./src/hooks/useCachedResources"
import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EeroContext } from "./src/components/EeroContext"
import { EvaIconsPack } from "@ui-kitten/eva-icons"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const evaScheme = eva[colorScheme]

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={evaScheme}>
          <EeroContext>
            <Navigation />
            <StatusBar />
          </EeroContext>
        </ApplicationProvider>
      </>
    )
  }
}

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react"
import { Client, Eero } from "@343max/eero-ts"
import AsyncStorage from "@react-native-community/async-storage"

type EeroReturnType = ReturnType<typeof Eero>

const setupEero = async () => {
  const SessionCookie = "SessionCookie"

  const cookie = await AsyncStorage.getItem(SessionCookie)

  const storeCookie = async (value: string) => {
    await AsyncStorage.setItem(SessionCookie, value)
  }

  const client = Client(fetch)

  return Eero(storeCookie, client, cookie)
}

const Context = createContext({} as EeroReturnType)

export const EeroContext: FC = ({ children }) => {
  const [eero, setEero] = useState<EeroReturnType | undefined>()

  useEffect(() => {
    const f = async () => {
      setEero(await setupEero())
    }

    f()
  }, [])

  if (eero === undefined) {
    return <></>
  } else {
    return <Context.Provider value={eero}>{children}</Context.Provider>
  }
}

export const useEero = (): EeroReturnType => useContext(Context)

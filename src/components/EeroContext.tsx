import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react"
import { Client, Eero, Account, Network, Device } from "@343max/eero-ts"
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

const setupMockEero: typeof setupEero = () => {
  const state = { needsLogin: true }
  return {
    needsLogin: () => state.needsLogin,
    login: async (identifier: string) => {},
    loginVerify: async (_: string) => {
      state.needsLogin = false
      // throw new Error("some error!")
      return {} as any
    },
    refreshSessionCookie: async () => "4567",
    account: async () => {
      return ({ networks: { data: [{ url: "abc" }] } } as unknown) as Account
    },
    network: async (_: string): Promise<Network> => {
      throw new Error("error!")
    },
    eeros: async (): Promise<any> => {
      throw new Error("error!")
    },
    devices: async (_: string): Promise<Device[]> => [],
    rebootEero: (_: string): Promise<Device[]> => {
      throw new Error("error!")
    },
  }
}

const useForceRerender = () => {
  const [rerenderToggle, setRerenderToggle] = useState(false)
  return () => setRerenderToggle(!rerenderToggle)
}

export const EeroContext: FC = ({ children }) => {
  const [eero, setEero] = useState<EeroReturnType | undefined>()
  const forceRerender = useForceRerender()

  useEffect(() => {
    const f = async () => {
      setEero(await setupEero())
    }

    f()
  }, [])

  if (eero === undefined) {
    return <></>
  } else {
    return (
      <Context.Provider
        value={{
          ...eero,
          loginVerify: async (authToken: string) => {
            await eero.loginVerify(authToken)
            forceRerender()
          },
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export const useEero = () => useContext(Context)

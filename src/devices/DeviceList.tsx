import { Device } from "@343max/eero-ts"
import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
  useTheme,
} from "@ui-kitten/components"
import React, { FC, useEffect, useState } from "react"
import { ListRenderItem, Pressable, RefreshControl } from "react-native"
import { useEero } from "../components/EeroContext"
import AsyncStorage from "@react-native-community/async-storage"

const FavoritesKey = "Favorites"

export const DeviceList: FC = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [isRefreshing, setRefreshing] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const isFaved = (device: Device) => favorites.includes(device.mac)

  const favoriteDevices = devices.filter(isFaved)
  const notFavoriteDevices = devices.filter((d) => !isFaved(d))

  const eero = useEero()

  const saveFavorites = (favorites: string[]) => {
    AsyncStorage.setItem(FavoritesKey, JSON.stringify(favorites))
  }

  const setFaved = (device: Device, fav: boolean) => {
    if (fav && !favorites.includes(device.mac)) {
      const favs = [...favorites, device.mac]
      setFavorites(favs)
      saveFavorites(favs)
    } else if (!fav && favorites.includes(device.mac)) {
      const favs = favorites.filter((mac) => mac !== device.mac)
      setFavorites(favs)
      saveFavorites(favs)
    }
  }

  const reloadDevices = async () => {
    setRefreshing(true)
    const networkId = (await eero.account()).networks.data[0].url
    const devices = (await eero.devices(networkId)).filter((d) => d.connected)
    setDevices(devices)
    setRefreshing(false)
  }

  useEffect(() => {
    reloadDevices()
  }, [])

  useEffect(() => {
    const f = async () => {
      const json = await AsyncStorage.getItem(FavoritesKey)

      if (json === null) {
        setFavorites([])
      } else {
        const favorites = JSON.parse(json) as string[]
        setFavorites(favorites)
      }
    }
    f()
  }, [])

  const theme = useTheme()

  const renderItem: ListRenderItem<Device> = ({ item, index }) => {
    const faved = isFaved(item)
    return (
      <ListItem
        title={item.nickname ?? item.manufacturer ?? item.ip ?? undefined}
        description={item.source.location}
        accessoryRight={() => (
          <Button
            onPress={() => setFaved(item, !faved)}
            appearance="ghost"
            accessoryLeft={() => (
              <Icon
                name={faved ? "heart" : "heart-outline"}
                style={{ width: 24, height: 24 }}
                fill={theme["text-control-color"]}
              />
            )}
          ></Button>
        )}
      />
    )
  }

  return (
    <List
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={reloadDevices} />
      }
      ItemSeparatorComponent={Divider}
      data={[...favoriteDevices, ...notFavoriteDevices]}
      renderItem={renderItem}
    />
  )
}

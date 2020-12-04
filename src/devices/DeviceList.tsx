import { Device } from "@343max/eero-ts"
import { Divider, List, ListItem, Text } from "@ui-kitten/components"
import React, { FC, useEffect, useState } from "react"
import { ListRenderItem, RefreshControl } from "react-native"
import { useEero } from "../components/EeroContext"

export const DeviceList: FC = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [isRefreshing, setRefreshing] = useState(false)

  const eero = useEero()

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

  const renderItem: ListRenderItem<Device> = ({ item, index }) => (
    <ListItem
      title={item.nickname ?? item.manufacturer ?? item.ip ?? undefined}
      description={item.source.location}
    />
  )

  return (
    <List
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={reloadDevices} />
      }
      data={devices}
      renderItem={renderItem}
    />
  )
}

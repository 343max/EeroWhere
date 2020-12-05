import { Card, Modal, Spinner, useTheme } from "@ui-kitten/components"
import React, { FC } from "react"

type ModalSpinnerProps = {
  loading: boolean
}

export const ModalSpinner: FC<ModalSpinnerProps> = ({ loading }) => {
  const theme = useTheme()
  return (
    <Modal
      visible={loading}
      backdropStyle={{ backgroundColor: theme["color-basic-transparent-600"] }}
    >
      <Card disabled={true}>
        <Spinner size="giant" />
      </Card>
    </Modal>
  )
}

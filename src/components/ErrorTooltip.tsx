import { Tooltip, TooltipProps, Text } from "@ui-kitten/components"
import React, { FC } from "react"

type ErrorTooltipProps = Omit<
  TooltipProps,
  "anchor" | "visible" | "accesoryLeft" | "children"
> & {
  error: Error | null
  children: React.ReactElement
}

export const ErrorTooltip: FC<ErrorTooltipProps> = ({
  error,
  children,
  ...props
}) => (
  <Tooltip
    anchor={() => children}
    visible={error !== null}
    accessoryLeft={() => <Text>⚠️</Text>}
    {...props}
  >
    {error?.message ?? ""}
  </Tooltip>
)

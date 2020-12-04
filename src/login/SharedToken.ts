import { useState } from "react"
import { useBetween } from "use-between"

export const useSharedToken = () =>
  useBetween(() => {
    const [sharedToken, setSharedToken] = useState<string | undefined>()
    return {
      sharedToken,
      setSharedToken,
    }
  })

import { Spinner } from "@ui-kitten/components"
import React, { FC } from "react"
import styled from "styled-components/native"

const Container = styled.SafeAreaView`
  flex: 1;
  align-content: center;
  justify-content: center;
  align-items: center;
`

export const FullScreenSpinner: FC = () => (
  <Container>
    <Spinner size="giant" />
  </Container>
)

import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input, Layout, Spinner } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC, useState } from "react"
import styled from "styled-components/native"
import { useEero } from "../components/EeroContext"
import { FullScreenSpinner } from "../components/FullScreenSpinner"
import { LoginFlowParamList } from "./LoginFlow"
import { useSharedToken } from "./SharedToken"

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-content: center;
  justify-content: center;
  margin: 30px;
`

const LoginButton = styled(Button)`
  margin-top: 10px;
`

type FormValues = {
  username: string
}

export const LoginScreen: FC<StackScreenProps<LoginFlowParamList, "Login">> = ({
  navigation,
}) => {
  const [isLoading, setLoading] = useState(false)
  const { login } = useEero()
  const { setSharedToken } = useSharedToken()

  const onSubmit = async ({ username }: FormValues) => {
    setLoading(true)

    const sessionToken = await login(username)
    setSharedToken(sessionToken)

    navigation.navigate("Token")
  }

  if (isLoading) {
    return <FullScreenSpinner />
  } else {
    return (
      <Formik<FormValues> initialValues={{ username: "" }} onSubmit={onSubmit}>
        {({ values, handleChange, isValid, handleSubmit }) => (
          <Container>
            <Input
              placeholder="Email or Phone#"
              value={values.username}
              onChangeText={handleChange("username")}
              returnKeyType="send"
            />
            <LoginButton
              size="giant"
              disabled={!isValid}
              onPress={() => handleSubmit()}
            >
              Request Token
            </LoginButton>
          </Container>
        )}
      </Formik>
    )
  }
}

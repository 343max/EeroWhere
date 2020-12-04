import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input, Layout } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC, useState } from "react"
import styled from "styled-components/native"
import { LoginFlowParamList } from "./LoginFlow"

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
  const onSubmit = () => {
    navigation.navigate("Token")
  }

  return (
    <Formik<FormValues> initialValues={{ username: "" }} onSubmit={onSubmit}>
      {({ values, handleChange, isValid, handleSubmit }) => (
        <Container>
          <Layout>
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
          </Layout>
        </Container>
      )}
    </Formik>
  )
}

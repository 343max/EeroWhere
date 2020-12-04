import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input, Layout } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC } from "react"
import styled from "styled-components/native"
import { LoginFlowParamList } from "./LoginFlow"
import * as Yup from "yup"

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-content: center;
  justify-content: center;
  margin: 30px;
`

const LoginButton = styled(Button)`
  margin-top: 10px;
`

const FormSchema = Yup.object({
  token: Yup.string()
    .test(
      "Digits only",
      "Token must be numeric",
      (v) => (v ?? "").match(/^[0-9]+$/) !== null
    )
    .length(6),
})

type FormValues = Yup.InferType<typeof FormSchema>

export const TokenScreen: FC<
  StackScreenProps<LoginFlowParamList, "Token">
> = () => {
  const onSubmit = () => {}

  return (
    <Formik<FormValues>
      initialValues={{ token: "" }}
      onSubmit={onSubmit}
      validationSchema={FormSchema}
    >
      {({ values, handleChange, isValid, handleSubmit }) => (
        <Container>
          <Layout>
            <Input
              placeholder="Token"
              value={values.token}
              onChangeText={handleChange("token")}
              returnKeyType="send"
              keyboardType="number-pad"
            />
            <LoginButton
              size="giant"
              disabled={!isValid}
              onPress={() => handleSubmit()}
            >
              Submit
            </LoginButton>
          </Layout>
        </Container>
      )}
    </Formik>
  )
}

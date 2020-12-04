import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input, Layout } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC, useState } from "react"
import styled from "styled-components/native"
import { LoginFlowParamList } from "./LoginFlow"
import * as Yup from "yup"
import { FullScreenSpinner } from "../components/FullScreenSpinner"
import { useEero } from "../components/EeroContext"
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

const FormSchema = Yup.object({
  authToken: Yup.string()
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
  const [isLoading, setLoading] = useState(false)
  const { sharedToken } = useSharedToken()

  const { loginVerify } = useEero()

  const onSubmit = async ({ authToken }: FormValues) => {
    setLoading(true)
    await loginVerify(sharedToken!, authToken!)
    setLoading(false)
  }

  if (isLoading) {
    return <FullScreenSpinner />
  } else {
    return (
      <Formik<FormValues>
        initialValues={{ authToken: "" }}
        onSubmit={onSubmit}
        validationSchema={FormSchema}
      >
        {({ values, handleChange, isValid, dirty, handleSubmit }) => (
          <Container>
            <Layout>
              <Input
                placeholder="Token"
                value={values.authToken}
                onChangeText={handleChange("authToken")}
                returnKeyType="send"
                keyboardType="number-pad"
              />
              <LoginButton
                size="giant"
                disabled={!isValid || !dirty}
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
}

import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input, Layout } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC, useState } from "react"
import styled from "styled-components/native"
import { LoginFlowParamList } from "./LoginFlow"
import * as Yup from "yup"
import { FullScreenSpinner } from "../components/FullScreenSpinner"
import { useEero } from "../components/EeroContext"
import { ModalSpinner } from "../components/ModalSpinner"
import { ErrorTooltip } from "../components/ErrorTooltip"

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-content: center;
  margin: 30px;
`

const LoginButton = styled(Button)`
  margin-top: 10px;
`

const FormSchema = Yup.object({
  authToken: Yup.string()
    .required()
    .matches(/^[0-9]{6,6}$/, "Verification code with 6 digits"),
})

type FormValues = Yup.InferType<typeof FormSchema>

export const TokenScreen: FC<
  StackScreenProps<LoginFlowParamList, "Token">
> = () => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { loginVerify } = useEero()

  const onSubmit = async ({ authToken }: FormValues) => {
    setLoading(true)
    try {
      await loginVerify(authToken)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <Container>
      <ModalSpinner loading={isLoading} />
      <Formik<FormValues>
        initialValues={{ authToken: "" }}
        onSubmit={onSubmit}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ values, handleChange, isValid, handleSubmit }) => (
          <Layout>
            <Input
              placeholder="Token"
              value={values.authToken}
              onChangeText={handleChange("authToken")}
              returnKeyType="send"
              keyboardType="number-pad"
              autoFocus={true}
              onSubmitEditing={() => handleSubmit()}
            />
            <ErrorTooltip error={error} onBackdropPress={() => setError(null)}>
              <LoginButton
                size="giant"
                disabled={!isValid}
                onPress={() => handleSubmit()}
              >
                Submit
              </LoginButton>
            </ErrorTooltip>
          </Layout>
        )}
      </Formik>
    </Container>
  )
}

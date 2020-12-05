import { StackScreenProps } from "@react-navigation/stack"
import { Button, Input } from "@ui-kitten/components"
import { Formik } from "formik"
import React, { FC, useState } from "react"
import styled from "styled-components/native"
import { useEero } from "../components/EeroContext"
import { FullScreenSpinner } from "../components/FullScreenSpinner"
import { LoginFlowParamList } from "./LoginFlow"
import * as Yup from "yup"
import { ErrorTooltip } from "../components/ErrorTooltip"
import { ModalSpinner } from "../components/ModalSpinner"

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-content: center;
  margin: 30px;
`

const LoginButton = styled(Button)`
  margin-top: 10px;
`

Yup.addMethod(Yup.string, "or", function (schemas, msg) {
  return this.test({
    name: "or",
    message: "Please enter valid url or email." || msg,
    test: (value) => {
      if (Array.isArray(schemas) && schemas.length > 1) {
        const resee = schemas.map((schema) => schema.isValidSync(value))
        return resee.some((res) => res)
      } else {
        throw new TypeError("Schemas is not correct array schema")
      }
    },
    exclusive: false,
  })
})

const FormSchema = Yup.object({
  username: Yup.string()
    .required()
    .test({
      name: "or",
      message: "Either email or phone number",
      test: (value) =>
        Yup.string().email().isValidSync(value) ||
        Yup.string()
          .matches(/^\+[0-9]{5,}$/, "Please provide a phone number")
          .isValidSync(value),
    }),
})

type FormValues = Yup.InferType<typeof FormSchema>

export const LoginScreen: FC<StackScreenProps<LoginFlowParamList, "Login">> = ({
  navigation,
}) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { login } = useEero()

  const onSubmit = async ({ username }: FormValues) => {
    setLoading(true)

    try {
      await login(username)
      navigation.navigate("Token")
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <Container>
      <ModalSpinner loading={isLoading} />
      <Formik<FormValues>
        initialValues={{ username: "" }}
        onSubmit={onSubmit}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ values, handleChange, isValid, handleSubmit }) => (
          <>
            <Input
              placeholder="Email or Phone#"
              value={values.username}
              onChangeText={handleChange("username")}
              returnKeyType="send"
              keyboardType="email-address"
              autoFocus={true}
              autoCapitalize="none"
              onSubmitEditing={() => handleSubmit()}
            />
            <ErrorTooltip error={error} onBackdropPress={() => setError(null)}>
              <LoginButton
                size="giant"
                disabled={!isValid}
                onPress={() => handleSubmit()}
              >
                Request Token
              </LoginButton>
            </ErrorTooltip>
          </>
        )}
      </Formik>
    </Container>
  )
}

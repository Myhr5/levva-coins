import { useStore } from "effector-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AuthLayout } from "../../layouts/AuthLayout";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";

import newAccountUseCase from "../../useCases/NewAccountUseCase/NewAccountUseCase";
import NewAccountStore from "../../stores/NewAccountStore/NewAccountStore";

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formSchema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas informadas não são iguais.")
      .required("A senha é obrigatória"),
    confirmPassword: yup.string().required("A confirmação de senha é obrigatória"),
  })
  .required();

export function NewAccount() {
  const { isLoading, hasError, errorMessage } = useStore(NewAccountStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ resolver: yupResolver(formSchema) });

  function handleNewAccount({ name, email, password, confirmPassword }: FormProps) {
    newAccountUseCase.execute({ name, email, password, confirmPassword });
  }

  return (
    <AuthLayout title="Cadastro" subtitle="Crie sua conta e começe a gerenciar suas finanças.">
      <Form onSubmit={handleSubmit(handleNewAccount)}>
        <FormInput {...register("name")} type="name" placeholder="Nome e sobrenome" />
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormInput {...register("email")} placeholder="E-mail" />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormInput {...register("password")} type="password" placeholder="Senha" />
        {errors.password && <FormError>{errors.password.message}</FormError>}

        <FormInput
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirme a senha"
        />
        {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormLink to="/login">Já possui conta? Acesse agora</FormLink>

        <FormButton type="submit">{isLoading ? "Carregando..." : "Cadastrar"}</FormButton>
      </Form>
    </AuthLayout>
  );
}

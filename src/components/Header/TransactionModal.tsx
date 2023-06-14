import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useStore } from "effector-react";

import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";

import GetCategoriesUseCase from "../../useCases/GetCategoriesUseCase/GetCategoriesUseCase";

import CategoryStore from "../../stores/CategoryStore/CategoryStore";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import { NewTransactionButton } from "./styles";

import { Modal } from "../Modal";
import {
  Form,
  FormButton,
  FormError,
  FormInput,
  FormSelect,
  TransactionTypeButton,
  TransactionTypeContainer,
} from "../../styles/global";
import NewTransactionUseCase from "../../useCases/NewTransactionUseCase/NewTransactionUseCase";

interface FormProps {
  description: string;
  amount: number;
  type: string;
  categoryId: string;
}

const formSchema = yup
  .object({
    description: yup.string().required("O nome da transação é obrigatório."),
    amount: yup.number().required("O valor da transação é obrigatório."),
    type: yup.string().oneOf(["income", "outcome"]).required("O valor da transação é obrigatório."),
    categoryId: yup.string().required("O nome da categoria é obrigatório."),
  })
  .required();

export function TransactionModal() {
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const { categories } = useStore(CategoryStore);
  const { isLoading, hasError, errorMessage } = useStore(TransactionStore);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({ resolver: yupResolver(formSchema) });

  useEffect(() => {
    GetCategoriesUseCase.execute();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  async function handleCreateTransaction({ description, amount, type, categoryId }: FormProps) {
    NewTransactionUseCase.execute({
      description,
      amount,
      type: type === "income" ? 0 : 1,
      categoryId,
    })
      .then(() => closeModalRef.current?.click())
      .finally(() => reset());
  }

  return (
    <Modal
      title="Nova transação"
      closeModalRef={closeModalRef}
      trigger={<NewTransactionButton>Nova Transação</NewTransactionButton>}
    >
      <Form onSubmit={handleSubmit(handleCreateTransaction)}>
        <FormInput {...register("description")} placeholder="Descrição" />
        {errors.description && <FormError>{errors.description.message}</FormError>}

        <FormInput
          {...register("amount")}
          type="number"
          placeholder="Preço"
          step="0.1"
          min="0"
          max="999999"
        />
        {errors.amount && <FormError>{errors.amount.message}</FormError>}

        <FormSelect {...register("categoryId")} defaultValue="">
          <option value="" disabled hidden>
            Categoria
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))}
        </FormSelect>
        {errors.categoryId && <FormError>{errors.categoryId.message}</FormError>}

        <TransactionTypeContainer
          {...register("type")}
          onValueChange={value => setValue("type", value)}
        >
          <TransactionTypeButton variant="income" value="income" id="Entrada">
            <ArrowCircleUp size={24} />
            Entrada
          </TransactionTypeButton>
          <TransactionTypeButton variant="outcome" value="outcome">
            <ArrowCircleDown size={24} />
            Saída
          </TransactionTypeButton>
        </TransactionTypeContainer>

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormButton type="submit">{isLoading ? "Carregando..." : "Cadastrar"}</FormButton>
      </Form>
    </Modal>
  );
}

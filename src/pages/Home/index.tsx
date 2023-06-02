import { useEffect } from "react";

import { useStore } from "effector-react";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import GetTransactiosnUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import {
  HomeWrapper,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableEmpty,
} from "./styles";

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    GetTransactiosnUseCase.execute();
  }, []);

  return (
    <HomeWrapper>
      <Header />
      <Summary />

      <SearchForm />

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <td>Descrição</td>
            <td>Preço</td>
            <td>Categoria</td>
            <td>Data</td>
          </thead>
          <tbody>
            {transactions.length > 0 &&
              transactions.map(transaction => (
                <tr>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type === 0 ? "income" : "outcome"}>
                      {money.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category.description}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
        {!isLoading && transactions.length === 0 && (
          <TransactionsTableEmpty>
            Adicione uma categoria e a sua primeira transação :)
          </TransactionsTableEmpty>
        )}
      </TransactionsContainer>
    </HomeWrapper>
  );
}

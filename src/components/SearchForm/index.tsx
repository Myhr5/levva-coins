import { useEffect, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import GetTransactiosnUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";
import SearchTransactionsUseCase from "../../useCases/SearchTransactionsUseCase/SearchTransactionsUseCase";

export function SearchForm() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    GetTransactiosnUseCase.execute();
  }, []);

  async function handleSearchTransactions() {
    SearchTransactionsUseCase.execute({ searchInput }).then(data => {
      console.log(data);
    });
    console.log("teste");
  }

  return (
    <SearchFormContainer>
      <input
        onChange={({ target }) => setSearchInput(target.value)}
        value={searchInput}
        type="text"
        placeholder="Busque por transações"
      />

      <button onClick={handleSearchTransactions} disabled={searchInput ? false : true}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

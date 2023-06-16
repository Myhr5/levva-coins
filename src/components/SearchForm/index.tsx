import * as yup from "yup";
import { useForm } from "react-hook-form";

import { useEffect } from "react";

import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import GetTransactiosnUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";
import SearchFormUseCase from "../../useCases/SearchFormUseCase/SearchFormUseUseCase";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormProps {
  searchInput: string;
}

export function SearchForm() {
  const formSchema = yup.object({
    searchInput: yup.string(),
  });

  const { register, handleSubmit, reset } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
  });

  // const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    GetTransactiosnUseCase.execute();
  }, []);

  const handleSearchTransactions = async ({ searchInput }: FormProps) => {
    SearchFormUseCase.execute({ searchInput }).finally(() => reset());
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register("searchInput")} />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

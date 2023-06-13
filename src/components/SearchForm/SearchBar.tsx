import React, { useState } from "react";
import { useStore } from "effector-react";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";

export function SearchBar() {
  const { transactions } = useStore(TransactionStore);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchBarInput = event => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  if (searchInput.length > 0) {
    transactions.filter(transaction => {
      return transaction.description.match(searchInput);
    });
  }
}

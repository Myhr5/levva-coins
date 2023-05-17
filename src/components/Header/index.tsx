import {
  HeaderContainer,
  HeaderContent,
  NewCategoryButton,
  NewTransactionButton,
  UserAvatar,
} from "./styles";

import levvaCoinsLogo from "../../assets/logo.svg";
import perfilIcon from "../../assets/icon.jpg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <NewCategoryButton>Nova Categoria</NewCategoryButton>
          <NewTransactionButton>Nova Transação</NewTransactionButton>
        </div>
      </HeaderContent>

      <UserAvatar src={perfilIcon} alt="Jemima Luz" />
    </HeaderContainer>
  );
}

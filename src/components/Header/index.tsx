import {
  HeaderContainer,
  HeaderContent,
  NewCategoryButton,
  NewTransactionButton,
  UserAvatar,
} from "./styles";

import * as Dialog from "@radix-ui/react-dialog";

import levvaCoinsLogo from "../../assets/logo.svg";
import perfilIcon from "../../assets/icon.jpg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <NewCategoryButton>Nova Categoria</NewCategoryButton>

          <Dialog.Root>
            <Dialog.Trigger>
              <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay />

              <Dialog.Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                {/* <Dialog.Description /> */}

                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </HeaderContent>

      <UserAvatar src={perfilIcon} alt="Jemima Luz" />
    </HeaderContainer>
  );
}

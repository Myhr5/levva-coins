import { ReactNode } from "react";

import { HeaderContainer, HeaderContent, SignOutButton, UserAvatar } from "./styles";

import levvaCoinsLogo from "../../assets/logo.svg";
import icon from "../../assets/icon.jpg";
import { Modal } from "../Modal";
import { Form, FormButton, FormInput } from "../../styles/global";

import { router } from "../../Router";
import { CategoryModal } from "./CategoryModal";
import { TransactionModal } from "./TransactionModal";

export function Header() {
  const userAvatar: ReactNode = <UserAvatar src={icon} alt="Ícone" />;

  function handleSignOut() {
    window.localStorage.removeItem("user");
    router.navigate("/login");
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <CategoryModal />

          <TransactionModal />
        </div>

        <Modal title="Meu perfil" trigger={userAvatar}>
          <Form>
            <UserAvatar src={icon} alt="User Icon" variant="large" />
          </Form>

          <FormInput type="name" value="User Name" />
          <FormInput type="email" placeholder="user.email@levva.io" disabled />
          <FormButton type="submit">Atualizar</FormButton>
          <SignOutButton type="button" onClick={handleSignOut}>
            Sair
          </SignOutButton>
        </Modal>
      </HeaderContent>
    </HeaderContainer>
  );
}

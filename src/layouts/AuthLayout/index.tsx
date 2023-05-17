import { ReactNode } from "react";

import LevvaCoinsLogo from "../../assets/logo.svg";
import { AuthBackground } from "./styles";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <AuthBackground>
      <main>
        <header>
          <img src={LevvaCoinsLogo} alt="Marca levva Coins" />
        </header>
      </main>

      <section>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {children}
      </section>
    </AuthBackground>
  );
}

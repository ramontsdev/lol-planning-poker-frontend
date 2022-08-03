import { Link } from "react-router-dom";

import Button from "../../components/button";
import { Container } from "./styles";

export function Home() {
  return (
    <>
      <Container>
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Logo do Site" />
          <h1>Poker Planning</h1>
        </div>


        <Link to="/create-room">
          <Button type="button">
            Criar uma sala
          </Button>
        </Link>

        <Link to="/enter-room">
          <Button type="button">
            Entrar em uma sala
          </Button>
        </Link>
      </Container>
    </>
  )
}

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import { Input } from "../../components/input";
import { SocketEventManager } from "../../contexts/poker-context";
import { ButtonContainer, Container, Form } from "./styles";

export function CreateRoom() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const myName = localStorage.getItem('planning_poker_username')
    if (myName) {
      setName(myName)
    }
  }, [])

  function handleChangeName(event: ChangeEvent) {
    const inputName = (event.target as HTMLInputElement).value
    setName(inputName);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name) {
      return
    }

    localStorage.setItem('planning_poker_username', name)
    SocketEventManager.createRoom(name)
    navigate('/poker-room')
  }

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            onChange={handleChangeName}
            type='text'
            placeholder="Seu nome *"
            value={name}
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
          >
            Criar sala
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

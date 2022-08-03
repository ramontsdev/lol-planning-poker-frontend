import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import { Input } from "../../components/input";
import { SocketEventManager } from "../../contexts/poker-context";

import { ButtonContainer, Container, Form } from "./styles";

export function EnterRoom() {
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
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

  function handleChangeRoomCode(event: ChangeEvent) {
    const inputRoomCode = (event.target as HTMLInputElement).value
    setRoomCode(inputRoomCode);
  }

  function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if (!name || !roomCode) {
      return
    }

    localStorage.setItem('planning_poker_username', name)
    SocketEventManager.joinRoom(name, roomCode)
    navigate('/poker-room')
  }

  return (
    <Container>
      <Form noValidate onSubmit={handleJoinRoom}>
        <FormGroup>
          <Input
            onChange={handleChangeName}
            type='text'
            placeholder="Seu nome *"
            value={name}
          />
        </FormGroup>

        <FormGroup>
          <Input
            onChange={handleChangeRoomCode}
            type='text'
            placeholder="Código da sala *"
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
          >
            Entrar sala
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

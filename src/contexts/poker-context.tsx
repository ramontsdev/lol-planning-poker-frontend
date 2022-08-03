import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import socketIoClient, { Socket } from 'socket.io-client'
import { cards } from "../components/cards";
import toast from "../utils/toast";

type PokerContextProps = {
  users: User[]
  me: User
  isVisibleVotes: boolean
  votingCards: Vote[]
  setVotingCards: Dispatch<SetStateAction<Vote[]>>
}
const PokerContext = createContext({} as PokerContextProps)

type Props = {
  children: ReactNode;
}

type User = {
  socketId: string,
  username: string,
  isAdmin: boolean,
  roomCode: string | null
  vote: number
}

export type Vote = {
  id: number
  vote: number
  isSelected: boolean
}

let socket: Socket
const url = process.env.REACT_APP_URL_API
export function PokerContextProvider({ children }: Props) {
  const [me, setMe] = useState<User>({} as User)
  const [users, setUsers] = useState<User[]>([])
  const [isVisibleVotes, setIsVisibleVotes] = useState(false)
  const [votingCards, setVotingCards] = useState<Vote[]>(cards)

  useEffect(() => {
    socket = socketIoClient(url!, {
      autoConnect: false,
      transports: ['websocket'],
      forceNew: true,
      upgrade: false
    })

    socket.on('connect', () => {
      console.log('Conectado com sucesso!')
    })

    const myName = localStorage.getItem('planning_poker_username')

    socket.emit('User_Connected', myName)

    socket.on('Room_Users', (usersReceived: User[]) => {
      setUsers(usersReceived)
    })

    socket.on('Me', myData => {
      setMe(myData)
    })

    socket.on('Change_Visibility_Votes', isVisible => {
      setIsVisibleVotes(isVisible)
    })

    socket.on('Who_Try_Change_Voted', user => {
      toast({
        text: `${user.username} tentou trocar o voto.`,
        type: 'danger',
        duration: 3000
      })
    })

    socket.on('Is_Redefined_Votes', () => {
      const filteredCards = votingCards.map(card => {
        card.isSelected = false
        return card
      })
      setVotingCards([...filteredCards])
    })

    socket.open()
  }, [])

  return (
    <PokerContext.Provider value={{
      users,
      me,
      isVisibleVotes,
      votingCards,
      setVotingCards
    }}>
      {children}
    </PokerContext.Provider>
  )
}

export const SocketEventManager = {
  createRoom: function (username: string) {
    const userADM = {
      username,
      isAdmin: true
    }

    socket.emit('Create_Room', userADM)
  },

  joinRoom: function (username: string, roomCode: string) {
    const user = {
      socketId: socket.id,
      username,
      isAdmin: false,
      roomCode
    }

    socket.emit('Join_Room', user)
  },

  showVotes: function (isVisible: boolean) {
    socket.emit('Show_Votes', isVisible)
  },

  toVote: function (vote: number) {
    socket.emit('To_Vote', vote)
  },

  tryChangeVote: function () {
    socket.emit('Try_Change_Vote')
  },

  resetVotes: function () {
    socket.emit('Reset_Votes')
  }
}

export const usePokerContext = () => useContext(PokerContext)

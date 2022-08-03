import { SocketEventManager, usePokerContext } from "../../contexts/poker-context";
import Button from "../button";
import { Container, VotingCard, VotingCardWrap } from "./styles";

export function VotingArea() {

  const { users, me, isVisibleVotes } = usePokerContext()

  function handleVisibleVotes() {
    SocketEventManager.showVotes(!isVisibleVotes)
  }

  return (
    <Container>

      {me.isAdmin && (
        <Button type="button" onClick={handleVisibleVotes}>
          {isVisibleVotes
            ? 'Esconder'
            : 'Mostrar'
          }
        </Button>
      )}

      <VotingCardWrap>
        {users.map(user => (
          <VotingCard key={user.socketId}>
            <span>{user.username}</span>
            <div className={!user.vote ? 'no-vote' : 'with-vote'}>
              {isVisibleVotes
                ? <strong>{user.vote}</strong>
                : null
              }
            </div>
          </VotingCard>
        ))}
      </VotingCardWrap>

    </Container>
  )
}

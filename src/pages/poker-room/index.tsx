import { useState } from "react"

import Button from "../../components/button"
import { VotingArea } from "../../components/voting-area"
import { SocketEventManager, usePokerContext, Vote } from "../../contexts/poker-context"

import { Card, CardsWrap, Container } from "./styles"

export function PokerRoom() {
  const [myVote, setMyVote] = useState<Vote>({} as Vote)

  const { me, isVisibleVotes, users, votingCards, setVotingCards } = usePokerContext()

  function handleVote(vote: Vote) {
    if (isVisibleVotes) {
      return SocketEventManager.tryChangeVote()
    }

    const filteredVotes = votingCards.map(votingCard => {
      if (votingCard.id === vote.id) {
        votingCard.isSelected = true
        return votingCard
      }

      votingCard.isSelected = false

      return votingCard
    })

    me.vote = myVote.vote

    setVotingCards(filteredVotes)

    setMyVote(vote)
    SocketEventManager.toVote(vote.vote)
  }

  function getArithmeticAverage() {
    const totalSumVotes = users.reduce(
      (previousValue, currentValue) => previousValue + currentValue.vote,
      0
    );

    const usersVoted = users.filter(user => user.vote)

    const arithmeticAverage = totalSumVotes / usersVoted.length

    return Number(arithmeticAverage.toFixed(2))
  }

  function handleResetVotes() {
    /* if (isVisibleVotes) */
    SocketEventManager.showVotes(false)
    SocketEventManager.resetVotes()
  }

  return (
    <Container>
      <CardsWrap>
        {votingCards.map(votingCard => (
          <Card
            isSelected={votingCard.isSelected}
            key={votingCard.id}
            onClick={() => handleVote(votingCard)}
          >
            {votingCard.vote}
          </Card>
        ))}
      </CardsWrap>

      <h1>Sala:</h1>
      <h3>{me.roomCode}</h3>

      {me.isAdmin && (
        <Button type="button" onClick={handleResetVotes}>
          Zerar Votos
        </Button>
      )}

      {
        isVisibleVotes && (
          <h2>Média: {getArithmeticAverage()}</h2>
        )
      }

      <VotingArea />
    </Container>
  )
}

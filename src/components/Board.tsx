import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'

import Card from './Card'
import Result from './Result'

import '../styles/Board.css'

export default function Board() {
  const cardsCount = 12

  const [cardsImageUrls, setCardsImages] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [best, setBest] = useState<number>(0)
  const [lastImageUrl, setLastImageUrl] = useState<string>('')

  function resetGame() {
    if (score > best) { setBest(score) }

    setScore(0)
    fetchCards();
  }

  function setResult(imageUrl: string) {
    if (lastImageUrl !== imageUrl) {
      setScore(score + 1)

      if (score === cardsCount) {
        resetGame()
      } else {
        setLastImageUrl(imageUrl)
      }

    } else {
      resetGame()
    }

  }

  function shuffleCards() {
    setCardsImages([...cardsImageUrls].sort(() => Math.random() - 0.5))
  }

  function clickOnCardHandler(event: MouseEvent<HTMLImageElement>) {
    setResult((event.currentTarget as HTMLImageElement).src)
    shuffleCards()
  }

  const fetchCards = async () => {
    try {

      const urls = await fetch(`https://api.capy.lol/v1/capybaras?random=true&take=${cardsCount}`)
        .then(response => response.json())
        .then(data => data.data.map(({ url }: { url: string }) => url))

      setCardsImages(urls)
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <div className='board'>
      <div className='cards-grid'>
        {cardsImageUrls.map((url) => (
          <Card
            key={url}
            imageUrl={url}
            onClickHandler={clickOnCardHandler}
          />
        ))}
      </div>

      <Result score={score} best={best} />
    </div>
  )
}

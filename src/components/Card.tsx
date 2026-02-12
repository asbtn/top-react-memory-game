import '../styles/Card.css'

export default function Card({ imageUrl, onClickHandler }: { imageUrl: string, onClickHandler: (e: React.MouseEvent<HTMLImageElement>) => void }) {
  return (
    <img className="card" src={imageUrl} onClick={onClickHandler} />
  )
}
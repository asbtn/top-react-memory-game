import '../styles/Result.css'

export default function Result({ score, best }: { score: number, best: number }) {
  return (
    <div className="result">
      <div className="score-result">
        <h2><span>{'Score:'}</span> {score}</h2>
      </div>
      <div className="best-result">
        <h2><span>{'Best:'}</span> {best}</h2>
      </div>
    </div>
  )
}
import { useCatFact, useCatImage } from './hooks'
import './style/App.css'

const App = () => {
  const { fact, refreshRandomFact } = useCatFact()
  const { imageUrl, imageTitle } = useCatImage({ fact })

  const handleClick = async () => refreshRandomFact()

  return (
    <main>
      <h1>App de gatos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section className='container'>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`An image of a cat saying ${imageTitle}`}
          />
        )}
      </section>
    </main>
  )
}

export default App

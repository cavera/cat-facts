import { useEffect, useState } from 'react'
import './style/App.css'

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/gif/says/${firstWord}?color=orange&size=40&json=true`
const API_PREFIX = 'https://cataas.com'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

const App = () => {
  const [fact, setFact] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [imageTitle, setImageTitle] = useState('')

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        if (!res.ok) throw new Error('Error fetching fact')
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch(e => console.log('errors in words', e))
  }, [])

  useEffect(() => {
    if (!fact) return
    const threeWords = fact.split(' ').slice(0, 3).join(' ')
    // const firstword = fact.split(' ', 1).join(' ')
    setImageTitle(threeWords)

    fetch(`${API_PREFIX}/cat/says/${threeWords}?size=40&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
      .catch(e => { console.log(e) })
  }, [fact])

  return (
    <main>
      <h1>App de gatos</h1>
      <section className='container'>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${API_PREFIX}${imageUrl}`} alt={`An image of a cat saying ${imageTitle}`} />}
      </section>
    </main>
  )
}

export default App

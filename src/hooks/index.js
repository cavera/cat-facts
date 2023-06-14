import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'
import { API_PREFIX } from '../constants'

function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageTitle, setImageTitle] = useState('')

  useEffect(() => {
    if (!fact) return
    const threeWords = fact.split(' ').slice(0, 3).join(' ')
    // const firstword = fact.split(' ', 1).join(' ')
    setImageTitle(threeWords)

    fetch(`${API_PREFIX}/cat/says/${threeWords}?size=40&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(`${API_PREFIX}${url}`)
      })
      .catch(e => {
        console.log(e)
      })
  }, [fact])

  return { imageUrl, imageTitle }
}

const useCatFact = () => {
  const [fact, setFact] = useState(null)

  const refreshRandomFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  useEffect(refreshRandomFact, [])

  return { fact, refreshRandomFact }
}

export { useCatImage, useCatFact }

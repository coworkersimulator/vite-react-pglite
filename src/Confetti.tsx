import { usePGlite } from '@electric-sql/pglite-react'
import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

const start = new Date()

export function Confetti() {
  const db = usePGlite()

  db.live.changes(
    'SELECT * FROM click ORDER BY at DESC LIMIT 1',
    [],
    'id',
    (changes) => {
      const emojis = changes.flatMap(({ __op__, at, on }) => {
        if (__op__ === 'INSERT' && at > start && on) {
          return on
        }
        return []
      })
      if (!emojis.length) {
        return
      }
      jsConfetti.addConfetti({ confettiNumber: 1, emojis })
    },
  )
  return <></>
}

export default Confetti

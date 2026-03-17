import { useLiveIncrementalQuery } from '@electric-sql/pglite-react'
import JSConfetti from 'js-confetti'
import { useRef } from 'react'

type Click = {
  id: string
  on: string
  at: Date
}

export function Confetti() {
  const confetti = new JSConfetti()
  const lastClick = useRef<Click>({
    id: '',
    on: '',
    at: new Date(),
  })

  const changes = useLiveIncrementalQuery<Click>(
    'SELECT * FROM click ORDER BY at DESC LIMIT 20',
    [],
    'id',
  )

  changes?.rows.toReversed().map(({ on, at }) => {
    if (at > lastClick.current.at) {
      confetti.addConfetti({
        confettiNumber: 1,
        emojis: [on],
      })
    }
  })

  if (changes?.rows.length) {
    lastClick.current = changes.rows[0]
  }

  return <></>
}

export default Confetti

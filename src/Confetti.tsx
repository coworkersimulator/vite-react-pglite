import { useLiveIncrementalQuery } from '@electric-sql/pglite-react'
import JSConfetti from 'js-confetti'
import { useState } from 'react'

type Click = {
  id: string
  on: string
  at: Date
}

const jsConfetti = new JSConfetti()

export function Confetti() {
  const [lastClickAt, setLastClickAt] = useState<Date>(new Date())
  const changes = useLiveIncrementalQuery<Click>(
    'SELECT * FROM click ORDER BY at DESC LIMIT 1',
    [],
    'id',
  )

  changes?.rows.forEach(({ on, at }) => {
    if (at > lastClickAt) {
      setLastClickAt(at)
      jsConfetti.addConfetti({ confettiNumber: 1, emojis: [on as string] })
    }
  })

  return <></>
}

export default Confetti

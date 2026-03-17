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
    'SELECT * FROM click ORDER BY at DESC LIMIT 1',
    [],
    'id',
  )
  console.log(JSON.stringify(changes))

  changes?.rows.map(({ id, on, at }) => {
    if (at > lastClick.current.at) {
      lastClick.current = { id, on, at }
      confetti.addConfetti({
        confettiNumber: 1,
        emojis: [lastClick.current.on],
      })
    }
  })

  return <></>
}

export default Confetti

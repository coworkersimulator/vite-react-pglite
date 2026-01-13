import { useLiveQuery, usePGlite } from '@electric-sql/pglite-react'

export function Counters() {
  const db = usePGlite()

  const clickCounts = useLiveQuery(`
    SELECT f.id, count(c.id) count
    FROM fruit f
    LEFT OUTER JOIN click c
    ON (f.id = c."on")
    GROUP BY f.id
    ORDER BY f.id
  `)

  const click = async (event: React.MouseEvent<HTMLElement>) => {
    await db.query('INSERT INTO click ("on") VALUES ($1)', [
      (event.target as HTMLElement).dataset.id,
    ])
  }
  return (
    <div onClick={click}>
      {(clickCounts?.rows as { id: string; count: number }[])?.map(
        ({ id, count }) => {
          return (
            <button key={id} data-id={id}>
              {id}
              <span className="click-count">{count}</span>
            </button>
          )
        },
      )}
    </div>
  )
}

export default Counters

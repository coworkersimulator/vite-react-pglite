import { PGliteProvider } from '@electric-sql/pglite-react'
import { Repl } from '@electric-sql/pglite-repl'
import { live, type PGliteWithLive } from '@electric-sql/pglite/live'
import { PGliteWorker } from '@electric-sql/pglite/worker'
import { useEffect, useState } from 'react'
import migration01 from '../db/migrations-client/01-initialize.sql?raw'
import './App.css'
import pgliteLogo from './assets/pglite-light.svg'
import reactLogo from './assets/react.svg'
import { CopyableCode } from './CopyableCode'
import Counters from './Counters'
import PgWorker from './pglite-worker.ts?worker'
import viteLogo from '/vite.svg'

let dbGlobal: PGliteWithLive | undefined;

function App() {
  const [db, setDb] = useState<PGliteWithLive | undefined>();

  useEffect(() => {
    (async () => {
      dbGlobal ??= new PGliteWorker(
        new PgWorker({
          name: 'pglite-worker'
        }),
        {
          extensions: { live }
        }
      ) as unknown as PGliteWithLive;

      await dbGlobal.exec(migration01);

      setDb(dbGlobal);
    })()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://pglite.dev" target="_blank">
          <img src={pgliteLogo} className="logo pglite" alt="PGlite logo" />
        </a>
      </div>
      <h1>Vite + React + PGlite</h1>
      <div className='card'>
        {!db && <>Loading PGlite...</>}
        {db && (
          <PGliteProvider db={db}>
            <>
              <Counters />
              <Repl pg={db} />
            </>
            <div>
              <p>
                <a href='https://github.com/coworkersimulator/vite-react-pglite'>
                  View on GitHub.
                </a>
                Try SQL in the terminal above. Examples:
              </p>
              <CopyableCode code="SELECT * FROM click;" />
              <CopyableCode code="INSERT INTO fruit (id) VALUES ('🍅');" />
              <CopyableCode code="DELETE FROM click;" />
            </div>
          </PGliteProvider>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and PGlite logos to learn more
      </p>
    </>
  )
}

export default App

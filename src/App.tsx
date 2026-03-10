import { PGliteProvider } from '@electric-sql/pglite-react'
import { Repl } from '@electric-sql/pglite-repl'
import { live, type PGliteWithLive } from '@electric-sql/pglite/live'
import { PGliteWorker } from '@electric-sql/pglite/worker'
import { useEffect, useState } from 'react'
import migration01 from '../db/migrations-client/01-initialize.sql?raw'
import './App.css'
import heroImg from './assets/hero.png'
import pgliteLogo from './assets/pglite-light.svg'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Confetti from './Confetti'
import { CopyableCode } from './CopyableCode'
import Counters from './Counters'
import PgWorker from './pglite-worker.ts?worker'

function App() {
  const [db, setDb] = useState<PGliteWithLive | undefined>()

  useEffect(() => {
    const dbWorker = new PGliteWorker(
      new PgWorker({
        name: 'pglite-worker',
      }),
      {
        extensions: { live },
      },
    ) as unknown as PGliteWithLive

    async function migrate() {
      await dbWorker.exec(migration01)
    }

    migrate().then(() => setDb(dbWorker))

    return () => {
      dbWorker?.close()
    }
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={pgliteLogo} className="framework" alt="PGlite logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <h1>Vite + React + TypeScript + PGlite</h1>
        <div className="card">
          {!db && <>Loading PGlite...</>}
          {db && (
            <PGliteProvider db={db}>
              <>
                <Confetti />
                <Counters />
                <Repl pg={db} />
              </>
              <div>
                <p>
                  <a href="https://github.com/coworkersimulator/vite-react-pglite">
                    View on GitHub.
                  </a>
                  Try SQL in the terminal above. Examples:
                </p>
                <CopyableCode code="SELECT * FROM click;" />
                <CopyableCode code="SELECT * FROM fruit;" />
                <CopyableCode
                  code={`INSERT INTO click ("on") VALUES ('🥥');`}
                />
                <CopyableCode code="INSERT INTO fruit (id) VALUES ('🍅');" />
                <CopyableCode code={`DELETE FROM click WHERE "on" = '🍅';`} />
                <CopyableCode code="DELETE FROM fruit WHERE id = '🍅';" />
                <CopyableCode code="DELETE FROM click;" />
              </div>
            </PGliteProvider>
          )}
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use
              href={`${import.meta.env.BASE_URL}icons.svg#documentation-icon`}
            ></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use
              href={`${import.meta.env.BASE_URL}/icons.svg#social-icon`}
            ></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#github-icon`}
                  ></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}/icons.svg#discord-icon`}
                  ></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}/icons.svg#x-icon`}
                  ></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}/icons.svg#bluesky-icon`}
                  ></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

import { PGlite } from '@electric-sql/pglite'
import { worker } from '@electric-sql/pglite/worker'
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp'

worker({
  async init() {
    return new PGlite({
      dataDir: 'idb://pglite-example',
      extensions: { uuid_ossp },
      relaxedDurability: true,
    })
  },
})

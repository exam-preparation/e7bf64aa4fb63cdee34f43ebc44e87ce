const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const morgan = require('morgan')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DOMAIN,
  PROTOCOL,
  PORT
} = process.env

const charString =
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'

function ran() {
  //The maximum is inclusive and the minimum is inclusive
  return Array(9)
    .fill(1)
    .map(() => charString[Math.floor(Math.random() * charString.length)])
    .join('')
}

async function genHash({ _id, db }) {
  try {
    let hash = ran()
    while (await db.collection('shorten_url_mapping').findOne({ hash })) {
      hash = ran()
    }
    try {
      await db.collection('shorten_url_mapping').insertOne({ _id, hash })
    } catch (err) {
      hash = await db.collection('shorten_url_mapping').findOne({ _id })
    }
    return hash
  } catch (err) {
    console.error('Hash error!!', _id)
  }
}

;(async () => {
  // Connection URL
  const mongoConnectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
  // Database Name
  const client = new MongoClient(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    await client.connect()
    const db = client.db(DB_DATABASE)

    app.set('trust proxy', true)
    app.get('/healthz', async (req, res) => res.send('ok'))
    app.get('/version', async (req, res) => res.send(COMMIT))
    app.use(morgan('combined'))
    app.use(express.json())

    app.post('/newurl', async ({ body: { url: _id } }, res) => {
      try {
        const { hash } =
          (await db.collection('shorten_url_mapping').findOne({ _id })) ?? {}

        const shortenUrl = `${PROTOCOL}://${DOMAIN}/${
          hash ?? (await genHash({ _id, db }))
        }`

        return res.json({ url: _id, shortenUrl })
      } catch (err) {
        console.error(err)
      }
    })

    app.get('/:hash([a-zA-Z0-9]{9})', async ({ params: { hash } }, res) => {
      const { _id: url } =
        (await db.collection('shorten_url_mapping').findOne({ hash })) || {}
      return url
        ? res.status(304).redirect(url)
        : res.status(400).send('Location does not exist.')
    })

    app.listen(PORT, () => {
      console.log(
        `Q3 URL shortener service is listening at ${PROTOCOL}://${DOMAIN}:${PORT}/`
      )
    })
  } catch (err) {
    console.error(err)
  }
})()

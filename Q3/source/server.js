const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DOMAIN,
  PROTOCOL
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

async function genHash({ url, db }) {
  try {
    let hash = ran()
    while (await db.collection('shorten_url_mapping').findOne({ hash })) {
      hash = ran()
    }

    await db.collection('shorten_url_mapping').insertOne({ url, hash })
    return hash
  } catch (err) {
    console.error('Hash error!!', url)
  }
}

;(async () => {
  // Connection URL
  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
  // Database Name
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    await client.connect()
    const db = client.db(DB_DATABASE)

    app.use(express.json())

    app.post('/newurl', async ({ body: { url } }, res) => {
      try {
        const { hash } =
          (await db.collection('shorten_url_mapping').findOne({ url })) ?? {}

        const shortenUrl = `${PROTOCOL}://${DOMAIN}/${
          hash ?? (await genHash({ url, db }))
        }`

        return res.json({ url, shortenUrl })
      } catch (err) {
        console.error(err)
      }
    })

    app.get('/:hash([a-zA-Z0-9]{9})', async ({ params: { hash } }, res) => {
      const { url } =
        (await db.collection('shorten_url_mapping').findOne({ hash })) || {}
      return url
        ? res.status(304).redirect(url)
        : res.status(400).send('Location does not exist.')
    })

    app.listen(80, () => {
      console.log(
        `Q3 URL shortener service is listening at ${PROTOCOL}://${DOMAIN}/`
      )
    })
  } catch (err) {
    console.error(err)
  }
})()

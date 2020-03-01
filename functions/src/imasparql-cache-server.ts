import * as functions from 'firebase-functions'
import { firestore, initializeApp } from 'firebase-admin'
import { Timestamp } from '@google-cloud/firestore'
import Axios from 'axios'
import * as moment from 'moment'

interface CacheData {
  data: object | string
  expire: Timestamp
  query: string
}

initializeApp()

async function deleteExpiredCache() {
  const appFirestore = firestore()
  const matchedCaches = (
    await appFirestore
      .collection('cache')
      .where('expire', '<', Timestamp.now())
      .get()
  ).docs
  const batch = appFirestore.batch()
  matchedCaches.forEach(item => batch.delete(item.ref))
  await batch.commit()
}

export const imasparqlCacheServer = functions.https.onRequest(async (request, response) => {
  const query = request.query.query
  const isMethodNotGet = request.method !== 'GET'
  const isNotHavingQuery = query === undefined
  if (isMethodNotGet || isNotHavingQuery) {
    response.status(400)
    response.send()
    return
  }

  const appFirestore = firestore()
  const matchedCaches = (
    await appFirestore
      .collection('cache')
      .where('expire', '>', Timestamp.now())
      .where('query', '==', query)
      .get()
  ).docs
  if (matchedCaches.length > 0) {
    // キャッシュが存在するのでそのまま返す
    const document = matchedCaches[0].data() as CacheData
    console.log(`Request has cache until ${document.expire}. Query = ${query}`)
    response.send(document.data)
    return
  }
  console.log(`Request does not have cache. Query = ${query}`)
  // キャッシュがないか失効してるので問い合わせをして得られた結果をセットする
  await deleteExpiredCache()
  try {
    const apiResult = await Axios.get('https://sparql.crssnky.xyz/spql/imas/query', { params: { query } })
    const document: CacheData = {
      data: apiResult.data,
      expire: Timestamp.fromMillis(
        moment()
          .add('1', 'days')
          .milliseconds()
      ),
      query
    }
    await appFirestore.collection('cache').add(document)
    response.send(document.data)
  } catch (ex) {
    console.error(ex)
    response.status(500)
    response.send()
  }
})

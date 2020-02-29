import * as functions from 'firebase-functions'

export const vueSSR = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

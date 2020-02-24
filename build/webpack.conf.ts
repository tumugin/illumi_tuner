import clientConfig from './webpack.client.conf'
import serverConfig from './webpack.server.conf'

export default function config(
  env: { [key: string]: string | undefined },
  argv: { [key: string]: string | undefined }
) {
  return [clientConfig(env, argv), serverConfig(env, argv)]
}

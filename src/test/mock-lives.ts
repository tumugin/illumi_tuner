import ILive from '../models/i-live'
import MockIdols from './mock-idols'

const MockLives: ILive[] = [
  {
    liveName: 'THE IDOLM@STER MILLION LIVE! 俺が考えた最強のライブ starring 俺',
    liveLocation: 'さいたまスーパーアリーナ',
    liveDate: new Date('2019/1/1'),
    liveActor: MockIdols.map(item => item.actor)
  },
  {
    liveName: 'THE IDOLM@STER MILLION LIVE! 神すぎて神になるライブ',
    liveLocation: 'メットライフドーム',
    liveDate: new Date('2019/2/1'),
    liveActor: MockIdols.map(item => item.actor)
  },
  {
    liveName: 'THE IDOLM@STER MILLION LIVE! 7th 東京ドーム公演',
    liveLocation: '東京ドーム',
    liveDate: new Date('2019/3/1'),
    liveActor: MockIdols.map(item => item.actor)
  },
  {
    liveName: 'THE IDOLM@STER ALL PRODUCTION ぶち上がり合同ライブ',
    liveLocation: '日産スタジアム',
    liveDate: new Date('2019/4/1'),
    liveActor: MockIdols.map(item => item.actor)
  }
]

export default MockLives

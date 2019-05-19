import INameAndColor from '../models/i-name-and-color'
import * as uuidv4 from 'uuid/v4'

const MockIdols: INameAndColor[] = [
  {
    colorHEX: '#EA5B76',
    name: '天羽光',
    nameKana: 'あまばひかる',
    title: 'STAR ELEMENTS',
    actor: '春日未来',
    key: uuidv4(),
    checked: false
  }
]

export default MockIdols

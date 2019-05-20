import INameAndColor from '../models/i-name-and-color'
import uuidv4 from 'uuid/v4'

const MockIdols: INameAndColor[] = [
  {
    colorHEX: '#EA5B76',
    name: '天羽光',
    nameKana: 'あまばひかる',
    title: 'STAR ELEMENTS',
    actor: '春日未来',
    key: uuidv4(),
    checked: false
  },
  {
    colorHEX: '#F5AD3B',
    name: '神埼澪',
    nameKana: 'かんざきみお',
    title: 'STAR ELEMENTS',
    actor: '矢吹可奈',
    key: uuidv4(),
    checked: false
  },
  {
    colorHEX: '#92CFBB',
    name: '草薙星蘭',
    nameKana: 'くさなぎせいらん',
    title: 'STAR ELEMENTS',
    actor: '田中琴葉',
    key: uuidv4(),
    checked: false
  }
]

export default MockIdols

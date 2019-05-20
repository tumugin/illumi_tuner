import { formatDate } from '../utils/date-utils'

test('日付を正しくフォーマットできる', () => {
  const date = new Date('2019/1/1')
  const formattedDate = formatDate(date, 'YYYY-MM-DD')
  expect(formattedDate).toBe('2019-01-01')
})

import { Markdown, md } from 'telegram-md'
import { interpolate } from './interpolate.ts'

describe('#interpolate', () => {
  it('should interpolate over markdown', () => {
    const text = new Markdown('Hello %{0}, %{1}, %{2}!')

    const result = interpolate(text, 'Mark', 'Tom_Tom', md.bold('Bond'))

    expect(result).toStrictEqual(md`Hello Mark, Tom_Tom, ${md.bold('Bond')}!`)
    expect(result).not.toBe(text)
  })

  it('should interpolate over string', () => {
    const text = 'Hello %{0}, %{1}, %{2}!'

    const result = interpolate(text, 'Mark', 'Tom_Tom', md.bold('Bond'))

    expect(result).toStrictEqual(md`Hello Mark, Tom_Tom, ${md.bold('Bond')}!`)
  })

  it('should replace null arguments with empty string', () => {
    const text = 'Hello %{0}, %{1}, %{2}!'

    const result = interpolate(text, null, 'Tom_Tom', md.bold('Bond'))

    expect(result).toStrictEqual(md`Hello , Tom_Tom, ${md.bold('Bond')}!`)
  })
})

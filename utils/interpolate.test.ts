import { Markdown } from 'telegram-md'
import { interpolate } from './interpolate.js'

describe('#interpolate', () => {
  it('should interpolate over markdown', () => {
    const text = new Markdown('Hello %{0}, %{1}!')

    const result = interpolate(text, 'Mark', 'Tom')

    expect(result).toStrictEqual(new Markdown('Hello Mark, Tom!'))
    expect(result).not.toBe(text)
  })

  it('should interpolate over string', () => {
    const text = 'Hello %{0}, %{1}!'

    const result = interpolate(text, 'Mark', 'Tom')

    expect(result).toStrictEqual(new Markdown('Hello Mark, Tom!'))
  })

  it('should replace null arguments with empty string', () => {
    const text = 'Hello %{0}, %{1}!'

    const result = interpolate(text, null, 'Tom')

    expect(result).toStrictEqual(new Markdown('Hello , Tom!'))
  })
})

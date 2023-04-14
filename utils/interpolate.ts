import { Markdown } from 'telegram-md'

export const interpolate = (text: unknown, ...subs: unknown[]) => {
  const markdown = new Markdown(text, text instanceof Markdown)
  markdown.value = markdown.value.replace(/%\\\{(\d+)\\\}/g, (_, index) =>
    String(new Markdown(subs[index] ?? '', subs[index] instanceof Markdown))
  )

  return markdown
}

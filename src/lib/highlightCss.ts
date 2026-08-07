export type TokenKind =
  | 'plain'
  | 'comment'
  | 'atrule'
  | 'selector'
  | 'property'
  | 'variable'
  | 'function'
  | 'string'
  | 'number'
  | 'color'
  | 'keyword'
  | 'punct'

export interface Token {
  kind: TokenKind
  value: string
  /** Only on colour tokens: the literal, ready to drop into a swatch. */
  swatch?: string
}

/** At-rules whose body holds nested rules rather than declarations. */
const NESTING_AT_RULES = new Set([
  'media',
  'supports',
  'layer',
  'container',
  'scope',
  'keyframes',
])

/** Functional notations that resolve to a colour, so they get a swatch. */
const COLOR_FUNCTIONS = new Set([
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'color',
  'color-mix',
])

const WHITESPACE = /\s+/y
const COMMENT = /\/\*[\s\S]*?\*\//y
const STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y
const AT_KEYWORD = /@[\w-]+/y
const HEX = /#[0-9a-fA-F]{3,8}\b/y
const NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:[a-zA-Z]+|%)?/y
const IDENT = /-{0,2}[A-Za-z_][\w-]*/y

/** Sticky patterns match only at `index`, so scanning stays linear. */
function matchAt(pattern: RegExp, source: string, index: number): string | null {
  pattern.lastIndex = index
  const found = source.match(pattern)
  return found ? found[0] : null
}

/** Reads a balanced `(…)` run starting at `start`, ignoring parens in strings. */
function readCall(source: string, start: number): string {
  let depth = 0

  for (let i = start; i < source.length; i += 1) {
    const char = source[i]

    if (char === '"' || char === "'") {
      const quoted = matchAt(STRING, source, i)
      if (quoted) {
        i += quoted.length - 1
        continue
      }
    }

    if (char === '(') depth += 1
    else if (char === ')') {
      depth -= 1
      if (depth === 0) return source.slice(start, i + 1)
    }
  }

  return source.slice(start)
}

/**
 * A small CSS tokenizer. The gallery only ever highlights its own stylesheet,
 * so a hand-rolled pass keeps the bundle free of a highlighting library while
 * still telling selectors, properties, values and colours apart. Block kinds
 * live on a stack because the same identifier means different things inside a
 * rule body and inside a prelude.
 */
export function tokenizeCss(source: string): Token[] {
  const tokens: Token[] = []
  const blocks: Array<'rules' | 'declarations'> = []

  /** Name of the at-rule whose prelude is currently open, if any. */
  let atRule: string | null = null
  /** True between a declaration's `:` and its terminator. */
  let inValue = false
  let index = 0

  const context = () => blocks[blocks.length - 1] ?? 'rules'
  const push = (kind: TokenKind, value: string, swatch?: string) => {
    tokens.push(swatch ? { kind, value, swatch } : { kind, value })
  }

  while (index < source.length) {
    const whitespace = matchAt(WHITESPACE, source, index)
    if (whitespace) {
      push('plain', whitespace)
      index += whitespace.length
      continue
    }

    const comment = matchAt(COMMENT, source, index)
    if (comment) {
      push('comment', comment)
      index += comment.length
      continue
    }

    const quoted = matchAt(STRING, source, index)
    if (quoted) {
      push('string', quoted)
      index += quoted.length
      continue
    }

    const char = source[index]

    if (char === '{') {
      blocks.push(
        atRule && NESTING_AT_RULES.has(atRule) ? 'rules' : 'declarations',
      )
      atRule = null
      inValue = false
      push('punct', char)
      index += 1
      continue
    }

    if (char === '}' || char === ';') {
      if (char === '}') blocks.pop()
      atRule = null
      inValue = false
      push('punct', char)
      index += 1
      continue
    }

    if (char === ':') {
      if (!atRule && context() === 'declarations') inValue = true
      push('punct', char)
      index += 1
      continue
    }

    if (char === '@') {
      const keyword = matchAt(AT_KEYWORD, source, index)
      if (keyword) {
        atRule = keyword.slice(1).toLowerCase()
        push('atrule', keyword)
        index += keyword.length
        continue
      }
    }

    if (char === '#') {
      const hex = matchAt(HEX, source, index)
      if (hex) {
        if (inValue) push('color', hex, hex)
        else push('selector', hex)
        index += hex.length
        continue
      }
    }

    const number = matchAt(NUMBER, source, index)
    if (number) {
      push('number', number)
      index += number.length
      continue
    }

    const ident = matchAt(IDENT, source, index)
    if (ident) {
      const after = source[index + ident.length]

      if (after === '(') {
        const call = readCall(source, index + ident.length)
        if (inValue && COLOR_FUNCTIONS.has(ident.toLowerCase())) {
          const literal = ident + call
          push('color', literal, literal)
          index += literal.length
          continue
        }
        push('function', ident)
        index += ident.length
        continue
      }

      if (ident.startsWith('--')) push('variable', ident)
      else if (inValue || atRule) push('keyword', ident)
      else if (context() === 'declarations') push('property', ident)
      else push('selector', ident)

      index += ident.length
      continue
    }

    if (char === '.' && !inValue) {
      const className = matchAt(IDENT, source, index + 1)
      if (className) {
        push('selector', `.${className}`)
        index += className.length + 1
        continue
      }
    }

    push('punct', char)
    index += 1
  }

  return tokens
}

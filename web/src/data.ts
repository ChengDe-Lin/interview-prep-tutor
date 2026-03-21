import type {
  StoryFile,
  CompanyResearch,
  CompanyPitch,
  BQCategory,
} from './types'

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx > 0) {
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim()
      data[key] = val
    }
  }
  return { data, content: match[2] }
}

const storyMds = import.meta.glob('../../stories/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const companyResearchMds = import.meta.glob('../../company_research/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const companyPitchMds = import.meta.glob('../../pitch/companies/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const generalPitchMd = import.meta.glob('../../pitch/general.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const shortPitchMd = import.meta.glob('../../pitch/short.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const bqCategoriesMd = import.meta.glob('../../bq_categories.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() || ''
  return filename.replace(/\.md$/, '')
}

function nameFromSlug(slug: string): string {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function extractH1(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function extractBQTypes(content: string): string[] {
  const section = content.match(/## 適用 BQ 類型\s*\n([\s\S]*?)(?=\n## |\n$)/m)
  if (!section) return []
  return section[1]
    .split('\n')
    .map((l) => l.replace(/^-\s*/, '').trim())
    .filter(Boolean)
}

export function getStories(): StoryFile[] {
  return Object.entries(storyMds)
    .filter(([path]) => !path.includes('_template'))
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return {
        slug,
        name: extractH1(content) || nameFromSlug(slug),
        content,
        bqTypes: extractBQTypes(content),
      }
    })
}

export function getCompanyResearch(): CompanyResearch[] {
  return Object.entries(companyResearchMds)
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return { slug, name: extractH1(content) || nameFromSlug(slug), content }
    })
}

export function getCompanyPitches(): CompanyPitch[] {
  return Object.entries(companyPitchMds)
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return { slug, name: extractH1(content) || nameFromSlug(slug), content }
    })
}

export function getGeneralPitch(): string {
  const raw = Object.values(generalPitchMd)[0]
  if (!raw) return ''
  return parseFrontmatter(raw).content
}

export function getShortPitch(): string {
  const raw = Object.values(shortPitchMd)[0]
  if (!raw) return ''
  return parseFrontmatter(raw).content
}

export function getBQCategories(): BQCategory[] {
  const raw = Object.values(bqCategoriesMd)[0]
  if (!raw) return []
  const { content } = parseFrontmatter(raw)
  const lines = content.split('\n').filter(
    (l) => l.startsWith('|') && !l.includes('---') && !l.includes('BQ 類型')
  )
  return lines.map((line) => {
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean)
    return {
      type: cells[0] || '',
      commonQuestions: cells[1] || '',
      recommendedStories: cells[2] || '',
    }
  })
}

export interface StoryFile {
  slug: string
  name: string
  content: string
  bqTypes: string[]
}

export interface CompanyResearch {
  slug: string
  name: string
  content: string
}

export interface CompanyPitch {
  slug: string
  name: string
  content: string
}

export interface BQCategory {
  type: string
  commonQuestions: string
  recommendedStories: string
}

export type Page =
  | { type: 'quick-review' }
  | { type: 'company'; slug: string }
  | { type: 'story'; slug: string }

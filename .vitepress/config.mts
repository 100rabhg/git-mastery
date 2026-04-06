import { defineConfig, type HeadConfig } from 'vitepress'

const siteName = 'Git & GitHub Mastery'
const siteDescription =
  'Learn Git and GitHub from beginner to advanced with decision-making frameworks, realistic terminal examples, workflow design, and recovery strategies.'
const siteUrl = 'https://git-mastery-course.vercel.app'
const socialImagePath = '/social-preview.png'
const socialImageUrl = `${siteUrl}${socialImagePath}`
const socialImageAlt = 'Git & GitHub Mastery social preview card'

function resolveCanonicalPath(relativePath: string): string | null {
  if (!relativePath) return null
  if (relativePath === 'index.md') return '/'
  if (relativePath.endsWith('/index.md')) return `/${relativePath.slice(0, -'index.md'.length)}`
  if (relativePath.endsWith('.md')) return `/${relativePath.slice(0, -3)}`
  return `/${relativePath}`
}

function createMetaTitle(pageTitle: string): string {
  if (!pageTitle || pageTitle === siteName) return siteName
  return `${pageTitle} | ${siteName}`
}

function createWebPageSchema(title: string, description: string, url: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: socialImageUrl
    }
  })
}

function createHomeSchema() {
  return JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      inLanguage: 'en-US'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: siteName,
      description: siteDescription,
      provider: {
        '@type': 'Person',
        name: 'Sourabh Patware'
      },
      educationalLevel: 'Beginner to advanced',
      url: siteUrl
    }
  ])
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'course',
  lang: 'en-US',
  title: siteName,
  description: siteDescription,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#14532d' }],
    ['meta', { name: 'author', content: 'Sourabh Patware' }],
    [
      'meta',
      {
        name: 'robots',
        content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      }
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Git course, GitHub course, git merge vs rebase, how to undo git commit, git branching strategy, trunk based development, Git workflows'
      }
    ],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  sitemap: {
    hostname: siteUrl
  },
  transformHead(ctx) {
    if (ctx.pageData.isNotFound) return

    const canonicalPath = resolveCanonicalPath(ctx.pageData.relativePath)

    if (!canonicalPath) return

    const pageTitle = createMetaTitle(ctx.pageData.title || siteName)
    const pageDescription = ctx.pageData.description || siteDescription
    const pageUrl = new URL(canonicalPath, `${siteUrl}/`).toString()
    const ogType = canonicalPath === '/' ? 'website' : 'article'
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:type', content: ogType }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:image', content: socialImageUrl }],
      ['meta', { property: 'og:image:secure_url', content: socialImageUrl }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: socialImageAlt }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: socialImageUrl }],
      ['meta', { name: 'twitter:image:alt', content: socialImageAlt }]
    ]

    if (canonicalPath === '/') {
      head.push(['script', { type: 'application/ld+json' }, createHomeSchema()])
    } else {
      head.push([
        'script',
        { type: 'application/ld+json' },
        createWebPageSchema(pageTitle, pageDescription, pageUrl)
      ])
    }

    return head
  },
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: siteName,
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Start Here', link: '/' },
      { text: 'Git', link: '/git/foundations' },
      { text: 'GitHub & Platforms', link: '/github/platforms' },
      { text: 'Workflows', link: '/workflows/designing-workflows' },
      { text: 'Labs', link: '/labs/' }
    ],
    sidebar: {
      '/git/': [
        {
          text: 'Course Track',
          items: [
            { text: 'Foundations', link: '/git/foundations' },
            { text: 'Setup & Authentication', link: '/git/setup-and-authentication' },
            { text: 'Basic Commands', link: '/git/basic-commands' },
            { text: 'Branching', link: '/git/branching' },
            { text: 'History Manipulation', link: '/git/history-manipulation' },
            { text: 'Undo & Recovery', link: '/git/undo-and-recovery' },
            { text: 'Advanced Topics', link: '/git/advanced-topics' },
            { text: 'Conflict Resolution', link: '/git/conflict-resolution' }
          ]
        }
      ],
      '/github/': [
        {
          text: 'Platforms & Collaboration',
          items: [
            { text: 'GitHub, GitLab, Bitbucket', link: '/github/platforms' },
            { text: 'PRs, Releases, Actions & Jira', link: '/github/collaboration-and-automation' }
          ]
        }
      ],
      '/workflows/': [
        {
          text: 'Workflow Design',
          items: [
            { text: 'Designing a Workflow', link: '/workflows/designing-workflows' },
            { text: 'Parent and Subtask Branching', link: '/workflows/parent-subtask-branching' },
            { text: 'Git Flow', link: '/workflows/git-flow' },
            { text: 'Trunk-Based Development', link: '/workflows/trunk-based-development' },
            { text: 'Forking Workflow', link: '/workflows/forking-workflow' }
          ]
        }
      ],
      '/labs/': [
        {
          text: 'Hands-On Labs',
          items: [
            { text: 'Labs Overview', link: '/labs/' },
            { text: 'Fix a Broken Commit', link: '/labs/fix-broken-commit' },
            { text: 'Resolve a Conflict', link: '/labs/resolve-conflict' },
            { text: 'Move a Commit', link: '/labs/move-commit' },
            { text: 'Clean History', link: '/labs/clean-history' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/100rabhg/git-mastery' }],
    editLink: {
      pattern: 'https://github.com/100rabhg/git-mastery/edit/main/course/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Built by Sourabh Patware for real-world Git mastery.'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Last Updated'
    },
    docFooter: {
      prev: 'Previous lesson',
      next: 'Next lesson'
    }
  }
})

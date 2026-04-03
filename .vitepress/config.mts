import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "course",

  title: "Git Mastery: Real-World Workflows",
  description: "Real-world Git workflows, decision making, and advanced concepts",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#14532d' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Git course, GitHub course, git merge vs rebase, how to undo git commit, git branching strategy, trunk based development, Git workflows'
      }
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Git & GitHub Mastery'
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Learn Git from beginner to advanced with practical scenarios, workflow design, recovery strategies, and GitHub collaboration.'
      }
    ]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Git & GitHub Mastery',
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
      message: 'Built by Sourabh Patware for real-world Git mastery.',
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

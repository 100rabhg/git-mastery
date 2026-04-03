---
title: Pull Requests, Releases, GitHub Actions, and Jira Integration
description: Learn how pull requests work, how releases relate to tags, how GitHub Actions and GitLab CI support automation, and how Jira integrates with Git workflows.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/github/platforms">GitHub & Platforms</a> / Collaboration & Automation
</div>

# Pull Requests, Releases, GitHub Actions, and Jira Integration

This lesson connects Git to the daily team workflow around review, automation, and issue tracking.

## GitHub Project Board Example for Web Apps

Many teams need more than branches and PRs. They also need a visible flow that shows where work is blocked, under review, in testing, or ready to deploy.

**Problem:** Without a shared board workflow, developers, reviewers, testers, and release owners all see the same task differently.

**Explanation:** GitHub Projects can act as the operational layer around your Git workflow.

**Solution:** Define a small number of status columns with clear ownership and clear exit rules.

One practical example:

- `New`: newly created issues
- `To Do`: work that is ready to be picked up, or work sent back after review or testing comments
- `In Progress`: currently being developed
- `In Review`: PR is open and waiting for code review
- `Ready for Testing`: merged into the testing branch such as `staging`, waiting for QA pickup
- `In Testing`: QA is actively verifying
- `Ready for Production`: approved for release
- `Done`: deployed successfully

### When to use this?

When the team needs visibility across engineering, QA, and release management.

### Common mistakes

- creating many columns without clear ownership
- moving cards inconsistently
- using board status instead of checking the actual branch and PR state

### Pro tips

- Every status should answer one question: who owns the task now?
- Keep the board aligned with the real Git flow, not with idealized process diagrams

## Pull Requests and Merge Requests

**Problem:** Local work is finished, but the team still needs review, testing, and discussion before integration.

**Explanation:** A pull request on GitHub, or merge request on GitLab, compares two branches and creates a collaboration space around the proposed change.

**Solution:** Open a PR when the branch tells a clear story, the scope is reviewable, and CI can validate it.

### What a strong PR includes

- a focused branch
- clear title and summary
- screenshots or logs when behavior changes
- links to relevant issues or Jira tickets
- a branch diff that is not cluttered with unrelated commits

### When to use this?

For nearly every change entering a shared branch in a team setting.

### Common mistakes

- Opening a giant PR that mixes multiple features
- Rebasing or force pushing repeatedly during active review without warning

### Pro tips

- Review quality improves when commits and PR scope are both intentional
- Draft PRs are useful when you want early feedback before the branch is finished

## Parent Task PRs and Child Task PRs

This is especially useful for larger maintenance tasks in web projects.

**Problem:** A bigger task like a framework upgrade may contain several subtasks. If every subtask opens a PR directly to `main`, the team gets noisy reviews, partial merges, and too much context switching.

**Explanation:** GitHub lets you choose the base branch of the PR. That means you can review child branches against a parent task branch first.

**Solution:** Raise PRs from child branches into the parent branch, then raise one final PR from the parent branch into `main`, `staging`, or `dev`.

Example:

```text
450-ruby-upgrade -> parent branch
451-upgrade-user-module -> child branch

PR 1: 451-upgrade-user-module -> 450-ruby-upgrade
PR 2: 452-upgrade-payment-module -> 450-ruby-upgrade
PR 3: 450-ruby-upgrade -> main
```

This helps learners understand an important GitHub idea: the base branch is a workflow choice, not always `main`.

Read more: [Parent task and subtask branching](/workflows/parent-subtask-branching)

## Releases and Tags

**Problem:** A team merged code, but nobody knows what exact state was deployed.

**Explanation:** A Git tag marks the source state. A platform release adds release notes, assets, and visibility.

**Solution:** Tag immutable release points and publish release notes from those tags.

**Command:**

```bash
git tag -a v3.1.0 -m "Release v3.1.0"
git push origin v3.1.0
```

### When to use this?

At release boundaries, production deployments, hotfix milestones, and rollback checkpoints.

## Tags for Environment Promotion vs Tags for Libraries

Tags solve different problems in different project types.

### Web apps and server projects

**Problem:** The team may want `main` to contain the latest reviewed code, but production should deploy only approved snapshots.

**Explanation:** In this case, tags can represent deployment promotions.

**Solution:** Merge reviewed code, then tag the exact commit promoted to `dev`, `staging`, or `prod`.

Example:

```bash
git tag -a prod-2026-04-03.1 -m "Deploy approved main commit to production"
git push origin prod-2026-04-03.1
```

### SDKs and libraries

**Problem:** Consumers need a stable known version that remains compatible with their ecosystem.

**Explanation:** Library users do not want surprise upgrades. They want to install a precise version and know exactly what behavior they are getting.

**Solution:** Use versioned tags and releases such as `v1.4.2`, then document compatibility and changelog information clearly.

Example:

```bash
git tag -a v1.4.2 -m "Release library version 1.4.2"
git push origin v1.4.2
```

### When to use this?

Use deployment-style tags for applications. Use semantic version tags for SDKs and libraries.

### Common mistakes

- mixing environment tags and version tags without a naming policy
- treating all projects as if they need the same release model

### Pro tips

- Apps optimize for deployment control
- Libraries optimize for consumer stability

## GitHub Actions and GitLab CI/CD

**Problem:** Teams want every branch or pull request to be tested consistently before merge.

**Explanation:** CI/CD platforms run workflows from repository events such as pushes, pull requests, tags, or schedule triggers.

**Solution:** Start with simple automation: install dependencies, run tests, lint code, and validate pull requests automatically.

### GitHub Actions

Good for:

- repository-native automation on GitHub
- pull request checks
- release workflows
- publishing packages and docs

Read more: [GitHub Actions docs](https://docs.github.com/actions)

### GitLab CI/CD

Good for:

- integrated pipeline management on GitLab
- environment-based delivery flows
- teams already standardizing on GitLab as the central platform

Read more: [GitLab CI docs](https://docs.gitlab.com/ee/ci/)

## Jira Integration

**Problem:** Teams want code changes tied back to planned work, sprint reporting, and issue status.

**Explanation:** Many teams connect Jira issue keys to branches, commits, and PRs so development activity is traceable.

**Solution:** Standardize naming and message conventions.

### Branch naming with task ID

```text
feature/PROJ-142-add-login-rate-limit
bugfix/PROJ-201-fix-tax-rounding
hotfix/OPS-18-rollback-broken-flag
```

### Commit linking with Jira

```text
feat: add login rate limiting (PROJ-142)
fix: correct tax rounding for zero-value invoices (PROJ-201)
```

### When to use this?

In teams that rely on Jira reporting, audit trails, or cross-functional visibility.

### Common mistakes

- Inconsistent ticket formats across branches and commits
- Treating ticket references as a substitute for meaningful commit messages

### Pro tips

- Agree on a branch naming policy and document it in the repository
- Keep the Jira key near the front of the branch name so it is easily visible in PR lists

## Read More

- [Workflow design](/workflows/designing-workflows)
- [SSH setup for GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

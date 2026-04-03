---
title: Trunk-Based Development Guide
description: Learn how trunk-based development works, why it supports fast delivery, and what team habits are required to make it safe.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/workflows/designing-workflows">Workflows</a> / Trunk-Based Development
</div>

# Trunk-Based Development Guide

Trunk-based development keeps developers close to the mainline, usually through very short-lived branches or direct commits to a protected trunk with strong automation.

## Why teams choose trunk-based development

**Problem:** Long-lived branches create painful merges, delayed feedback, and uncertainty about integration quality.

**Explanation:** Trunk-based development reduces divergence by integrating small changes frequently.

**Solution:** Use it when CI is strong, changes can be kept small, and the team values fast integration over multi-branch ceremony.

### When to use this?

Good fit for:

- teams shipping daily or continuously
- mature CI pipelines
- feature flag adoption
- strong review discipline on small changes

### Common mistakes

- Trying trunk-based development without reliable automated tests
- Opening large branches and calling them "short-lived"

### Pro tips

- Feature flags help decouple deployment from release
- The smaller the branch, the less painful merge and rebase decisions become

## What makes it work

- small pull requests
- fast CI feedback
- clear ownership of failing builds
- branch protection on `main`
- willingness to integrate unfinished work behind safe toggles

## Merge to `main`, Deploy with Tags

This is one practical variation many teams use when they want `main` to always reflect the latest reviewed code, but they do not want every merge to deploy to every environment automatically.

**Problem:** Active development moves quickly, but development, staging, and production environments should not all advance at the same time.

**Explanation:** Integration and deployment are separate decisions. Git merges decide what code is accepted. Tags decide what code is promoted to a specific environment.

**Solution:** Merge reviewed work into `main`, then create environment tags or releases to promote known commits to `dev`, `staging`, or `prod`.

Example:

```bash
git switch main
git pull origin main
git tag -a dev-2026-04-03.1 -m "Deploy current main to dev"
git tag -a staging-2026-04-03.1 -m "Deploy current main to staging"
git push origin dev-2026-04-03.1 staging-2026-04-03.1
```

### When to use this?

When you want fast integration on `main` but still need explicit promotion control for environments.

### Common mistakes

- using tags without a clear naming convention
- assuming tag-based deployment removes the need for rollback planning
- forgetting to document which tag reached which environment

### Pro tips

- This approach works best when CI/CD is mature enough to deploy by tag
- Protected tags can be as important as protected branches

## Recommendation

If your team struggles with merge pain and can invest in automation, trunk-based development is often the highest-leverage improvement.

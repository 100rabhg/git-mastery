---
title: Forking Workflow Guide
description: Learn how the forking workflow works for open source and external contribution models, and how it differs from internal branch-based collaboration.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/workflows/designing-workflows">Workflows</a> / Forking Workflow
</div>

# Forking Workflow Guide

The forking workflow is common in open source and any environment where contributors should not push directly to the main repository.

## How it works

1. A contributor forks the main repository
2. They clone their fork locally
3. They create a branch in their fork
4. They push to their fork
5. They open a pull request back to the upstream repository

## Why teams choose it

**Problem:** You want contributions from many people without granting write access to the central repository.

**Explanation:** Forks separate contributor permissions from the authoritative repository while still preserving the standard Git pull request model.

**Solution:** Use the forking workflow when permission boundaries or public contribution patterns matter.

### When to use this?

Good fit for:

- open source repositories
- public contribution models
- organizations that want strict write access boundaries

### Common mistakes

- Forgetting to sync the fork with upstream
- Opening a PR from a stale base branch

### Pro tips

- Configure both `origin` and `upstream` remotes locally
- Document contributor setup so first-time contributors do not get stuck on auth and sync steps

## Key commands

```bash
git remote add upstream git@github.com:original-org/project.git
git fetch upstream
git switch main
git rebase upstream/main
```

## Recommendation

Forking workflows optimize for contribution safety, not for the fastest internal delivery path. For internal product teams, simpler branch-based collaboration is often enough.

---
title: Git Branching Strategy and Commands
description: Learn Git branching concepts, feature branch workflows, and how branch pointers map onto the commit graph so you can choose a safe branching strategy.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Branching
</div>

# Git Branching Strategy and Commands

Branches are one of Git's biggest strengths because they are lightweight labels, not expensive copies of the repository.

## What a Branch Really Is

**Problem:** New learners often imagine a branch as a separate folder or isolated environment.

**Explanation:** A branch is just a pointer to a commit. When you commit on that branch, the pointer moves forward.

**Solution:** Visualize branches as labels attached to the graph.

```text
A---B---C  main
         \
          D---E  feature/cart
```

If `feature/cart` gets another commit, the graph becomes:

```text
A---B---C  main
         \
          D---E---F  feature/cart
```

## `git branch`, `git switch`, and `git checkout`

**Problem:** You need a new branch for work, but Git offers multiple commands that seem to overlap.

**Explanation:** `git branch` creates or lists branches. `git switch` focuses on moving between branches. `git checkout` is older and more overloaded because it can switch branches and restore files.

**Solution:** Prefer `git switch` for branch movement in modern Git because it communicates intent clearly.

**Command:**

```bash
git switch -c feature/cart
```

```text
Switched to a new branch 'feature/cart'
```

List branches:

```bash
git branch
```

```text
* feature/cart
  main
```

### When to use this?

Create a branch before starting isolated work such as a feature, fix, experiment, or refactor.

### Common mistakes

- Doing feature work directly on `main`
- Creating a branch from an outdated base
- Using `checkout` for everything without knowing what it will affect

### Pro tips

- Fetch and update `main` before branching if your team uses `main` as the integration base
- Branch names should communicate purpose, not just task ownership

## Feature Branches

**Problem:** Multiple developers are changing the same codebase and need a safe way to work independently.

**Explanation:** A feature branch isolates a line of work until it is ready to merge into a shared branch like `main` or `develop`.

**Solution:** Branch from the correct base, keep the branch focused, sync with the mainline regularly, and open a pull request when ready.

**Command:**

```bash
git switch main
git pull origin main
git switch -c feature/payment-timeout
```

### When to use this?

Use feature branches for work that needs review, testing, or partial isolation before release.

### Common mistakes

- Letting a feature branch live so long that rebasing or merging becomes painful
- Mixing multiple unrelated tasks into one branch

### Pro tips

- Short-lived feature branches reduce conflict cost
- If your team ships continuously, trunk-based development may be a better fit than long-lived branches

## Visualizing the Git Graph

If a branch feels confusing, visualize it immediately.

**Command:**

```bash
git log --oneline --graph --decorate --all
```

```text
* 2cb5d19 (HEAD -> feature/payment-timeout) add timeout fallback
* bfa2f41 wire payment service retry config
| * e20bc88 (origin/main, main) update release notes
|/
* 8dd1129 bootstrap payments module
```

That output tells you:

- your current branch is `feature/payment-timeout`
- it has diverged from `main`
- `main` moved on the remote while you were working

## Choosing a Git Branching Strategy

There is no universal best strategy. Choose based on release cadence, team size, risk tolerance, and deployment style.

| Situation | Good default |
| --- | --- |
| Small team shipping often | Trunk-based development |
| Release trains and staged QA | Git Flow or a release-branch model |
| Open source with external contributors | Forking workflow |

Use the workflow section later in this course to decide intentionally instead of copying a team's process blindly.

## Read More

- [Workflow design guide](/workflows/designing-workflows)
- [git merge vs rebase](/git/history-manipulation)

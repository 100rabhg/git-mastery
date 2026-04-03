---
title: Git Foundations for Beginners
description: Understand what Git is, how the working directory and staging area behave, and why the commit graph is the key to confident Git decision-making.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Foundations
</div>

# Git Foundations for Beginners

Git becomes much easier once you stop thinking about it as a bag of commands and start thinking about it as a system for recording snapshots and relationships between those snapshots.

## What Is Git?

**Problem:** Many beginners think Git is a cloud backup tool or a GitHub feature.

**Explanation:** Git is a distributed version control system. Every clone contains the full repository history, which means your local machine can inspect, branch, compare, and recover history without constantly asking a server for permission.

**Solution:** Think of Git as a local database of commits plus a set of commands for moving between states, recording new states, and synchronizing with shared remotes.

**Command:**

```bash
git init
```

```text
Initialized empty Git repository in /home/developer/project/.git/
```

### When to use this?

Use this mental model every time you decide whether a change is local, staged, committed, rewritten, or shared.

### Common mistakes

- Treating GitHub as if it is Git itself
- Assuming a file is "saved in Git" just because it was edited locally
- Memorizing commands without understanding the state transition underneath

### Pro tips

- If you can answer "Where does this change exist right now?" you can usually choose the right command.
- Git is safest when you understand whether you are changing content, history, or remote state.

## The Three Places Your Change Can Live

Git work is easiest to reason about when you track three locations:

1. Working directory: your actual files
2. Staging area: the exact next snapshot you are preparing
3. Repository history: the commits already recorded

```text
working directory --> staging area --> repository history
 edited files         next commit        saved snapshots
```

**Problem:** "I changed a file, so why does `git commit` say nothing to commit?"

**Explanation:** Editing a file changes the working directory. It does not automatically change the staging area. Git makes you choose what belongs in the next commit.

**Solution:** Inspect with `git status`, stage intentionally with `git add`, then commit.

**Command:**

```bash
git status
```

```text
On branch main
Changes not staged for commit:
  modified:   src/app.js

no changes added to commit
```

::: tip
The staging area is not an annoying extra step. It is what allows you to build precise commits instead of dumping all edits together.
:::

## The Commit Graph Is the Real Model

This is the concept that unlocks Git.

Each commit points to a parent commit. Branches are just movable labels that point to commits. When you create new commits, the branch label moves forward.

```text
A---B---C  main
         \
          D---E  feature/login
```

In that graph:

- `main` points to commit `C`
- `feature/login` points to commit `E`
- `E` remembers `D` as its parent
- `D` remembers `C` as its parent

That means Git can answer questions like:

- What changed since `C`?
- Where did this branch diverge?
- Can these histories be merged?
- What commit should a pull request compare against?

### Why This Matters

**Problem:** Commands like merge, rebase, reset, and cherry-pick feel unrelated when learned separately.

**Explanation:** They all manipulate your relationship to the commit graph:

- `merge` combines lines of development
- `rebase` changes the base of a branch
- `reset` moves your current branch pointer
- `revert` creates a new commit that negates an old one
- `cherry-pick` copies one commit onto another branch

**Solution:** When stuck, sketch the graph before running commands.

**Command:**

```bash
git log --oneline --graph --decorate --all
```

```text
* e8b0d9f (HEAD -> feature/login) add validation copy
* 4a3ce2a build login form
| * 6c1fe21 (main) update landing page
|/
* b2db7d1 initial app shell
```

### When to use this?

Use graph thinking before merges, rebases, resets, and force pushes.

### Common mistakes

- Thinking a branch is a container of files instead of a pointer to a commit
- Rebasing shared history without realizing commit identities change
- Resetting without first confirming what `HEAD` currently points to

### Pro tips

- Run `git log --graph` until branch relationships feel obvious.
- If you can draw the graph, you can usually explain the safe move to a teammate.

## Git Is Local First, Remote Second

GitHub, GitLab, and Bitbucket add collaboration, review, permissions, and automation. Git itself still happens locally first.

```text
local repo <----sync----> remote repo
 commits                 shared collaboration point
```

That is why `git fetch` can update your view of the remote without changing your working files, and why you can create commits on a plane with no network at all.

## Read More

- [Git documentation](https://git-scm.com/docs)
- [Setup and first-time configuration](/git/setup-and-authentication)
- [Basic commands and daily Git usage](/git/basic-commands)

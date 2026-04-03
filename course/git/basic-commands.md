---
title: Basic Git Commands Explained
description: Learn core Git commands like status, add, commit, push, pull, fetch, and remote setup with real-world explanations and realistic terminal output.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Basic Commands
</div>

# Basic Git Commands Explained

The goal of basic Git commands is not speed. It is clarity. You want to know what changed, what is staged, what is committed, and what is shared.

## `git status`

**Problem:** You are not sure what state the repository is in.

**Explanation:** `git status` is your orientation command. It tells you the current branch, staged changes, unstaged changes, and untracked files.

**Solution:** Run it before and after meaningful Git actions. It is the fastest way to avoid accidental commits.

**Command:**

```bash
git status
```

```text
On branch feature/login
Your branch is ahead of 'origin/feature/login' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  modified:   src/auth/login.ts

Untracked files:
  tests/login.spec.ts
```

### When to use this?

Before commits, before pulls, before rebases, and whenever the repo feels confusing.

### Common mistakes

- Skipping `git status` and committing extra files
- Misreading "ahead" and "behind" as errors instead of sync information

### Pro tips

- If Git feels scary, start with `git status`
- Use it as your safe checkpoint between commands

## `git add` and `git commit`

**Problem:** You fixed several things, but not all of them belong in the same commit.

**Explanation:** `git add` selects what enters the next snapshot. `git commit` records that snapshot into history with a message explaining intent.

**Solution:** Stage only the related changes, then commit with a message that explains why the change exists.

**Command:**

```bash
git add src/auth/login.ts tests/login.spec.ts
git commit -m "fix: handle empty password validation"
```

```text
[feature/login a91a7f2] fix: handle empty password validation
 2 files changed, 28 insertions(+), 4 deletions(-)
```

### When to use this?

Whenever you have a coherent unit of work that another person could review or revert independently.

### Common mistakes

- Creating giant commits that mix refactor, bug fix, and formatting
- Writing commit messages that only say "changes" or "update"

### Pro tips

- Good commits reduce future debugging time
- Smaller commits make merge conflicts easier to reason about

Read more: [Conventional Commits](https://www.conventionalcommits.org/)

## `git fetch`

**Problem:** You want the latest remote information without changing your current branch.

**Explanation:** `git fetch` updates your remote-tracking branches like `origin/main` but does not merge anything into your local files.

**Solution:** Use `fetch` when you want to inspect what changed before deciding whether to merge, rebase, or reset.

**Command:**

```bash
git fetch origin
```

```text
From github.com:your-org/platform-api
   8dd1129..e20bc88  main       -> origin/main
```

### When to use this?

Before rebasing, before checking a pull request branch, or anytime you want fresh remote information without changing your worktree.

### Common mistakes

- Assuming `fetch` updates the current branch automatically
- Forgetting that `origin/main` may now differ from local `main`

### Pro tips

- `fetch` is a low-risk way to refresh context before making history decisions

## `git pull`

**Problem:** Your local branch is behind the remote branch and you want to catch up.

**Explanation:** `git pull` is typically `fetch` plus either `merge` or `rebase`, depending on configuration.

**Solution:** Use `pull` when you understand what integration style your team expects. If you do not, run `fetch` first and choose manually.

**Command:**

```bash
git pull origin main
```

```text
From github.com:your-org/platform-api
 * branch            main       -> FETCH_HEAD
Updating 8dd1129..e20bc88
Fast-forward
 README.md | 6 ++++++
 1 file changed, 6 insertions(+)
```

### When to use this?

For routine sync when the team standard is clear and your local branch has no risky uncommitted work.

### Common mistakes

- Pulling with dirty local changes
- Using `pull` without knowing whether it merges or rebases

### Pro tips

- If a branch matters, prefer `fetch` first when you need visibility

## `git push`

**Problem:** Your local commits exist only on your machine and must be shared.

**Explanation:** `git push` sends local commits to a remote branch. If the remote moved in the meantime, Git may reject the push to protect shared history.

**Solution:** Push when your history is ready to share. If rejected, fetch and integrate remote changes first.

**Command:**

```bash
git push origin feature/login
```

```text
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Writing objects: 100% (5/5), 612 bytes | 612.00 KiB/s, done.
To github.com:your-org/platform-api.git
   4a3ce2a..a91a7f2  feature/login -> feature/login
```

### When to use this?

After local work is committed and you are ready for backup, collaboration, or review.

### Common mistakes

- Force pushing without understanding who else depends on the branch
- Assuming push uploads uncommitted local files

### Pro tips

- Rejected pushes are often protection, not failure
- Use `--force-with-lease` instead of `--force` when you truly need to rewrite remote history

## Daily Safe Sequence

For most normal work, this sequence is a reliable baseline:

```bash
git status
git fetch origin
git add <files>
git commit -m "meaningful message"
git push origin <branch-name>
```

If you are unsure what comes next, ask:

1. Is my work only local?
2. Am I updating content or rewriting history?
3. Is this branch shared with other people?

## Read More

- [Git documentation](https://git-scm.com/docs)
- [Branching decisions](/git/branching)
- [Undoing mistakes safely](/git/undo-and-recovery)

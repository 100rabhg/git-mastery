---
title: Git Merge vs Rebase and History Manipulation
description: Learn when to use git merge, git rebase, interactive rebase, cherry-pick, revert, and reset by understanding how each changes the commit graph.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / History Manipulation
</div>

# Git Merge vs Rebase and History Manipulation

This lesson matters because advanced Git is mostly about changing history relationships safely.

## `git merge`

**Problem:** You have two lines of development that both matter and you want to combine them without rewriting existing commits.

**Explanation:** A merge preserves both histories and creates a merge commit when needed.

**Solution:** Use merge when you want an explicit record that two branches came together, especially on shared branches.

Before:

```text
A---B---C  main
         \
          D---E  feature/search
```

After `main` merges `feature/search`:

```text
A---B---C------M  main
         \    /
          D---E  feature/search
```

**Command:**

```bash
git switch main
git merge feature/search
```

### When to use this?

Use merge when the branch is already public, when you want audit-friendly history, or when your team values explicit integration commits.

### Common mistakes

- Assuming merge always creates conflicts
- Forgetting to update the target branch before merging

### Pro tips

- Fast-forward merges are simpler when no divergence happened
- Merge is often the safest default on shared history

## `git rebase`

**Problem:** Your feature branch started from an old base and now includes noisy divergence from `main`.

**Explanation:** Rebase replays your branch commits on top of a different base, creating new commit identities in the process.

**Solution:** Rebase local or privately owned branches to keep history linear before review or merge.

Before:

```text
A---B---C  main
     \
      D---E  feature/search
```

If `main` advances to `F`, rebasing `feature/search` onto `F` gives:

```text
A---B---C---F  main
             \
              D'---E'  feature/search
```

**Command:**

```bash
git switch feature/search
git fetch origin
git rebase origin/main
```

### When to use this?

Use rebase to clean up your own branch history before merging, especially when your team prefers a linear log.

### Common mistakes

- Rebasing commits other teammates already pulled
- Thinking rebase "moves" commits without changing identity

### Pro tips

- Rebase private history, merge shared history
- If you must rewrite a shared remote branch, use `--force-with-lease` and coordinate first

## Merge vs Rebase

This is one of the most searched Git topics because the right answer depends on context.

| Question | Merge | Rebase |
| --- | --- | --- |
| Preserves original commit identity | Yes | No |
| Produces linear history | Not always | Usually |
| Safer for shared branches | Yes | Usually no |
| Good for cleaning feature branch history | Sometimes | Yes |

::: info
Short rule: if other people already depend on the branch, prefer merge. If the branch is yours alone and you want a cleaner story, rebase is often a better tool.
:::

## `git rebase -i`

**Problem:** Your branch works, but the commit history is messy and hard to review.

**Explanation:** Interactive rebase lets you reorder, squash, reword, drop, or split commits before sharing them.

**Solution:** Use it on local commits to turn "work in progress" history into reviewable history.

**Command:**

```bash
git rebase -i HEAD~4
```

```text
pick 4c1fd31 add API client
pick 6e8f770 fix lint issue
pick 942a1f4 update tests
pick 0ac9e1a typo
```

You might change it to:

```text
pick 4c1fd31 add API client
squash 6e8f770 fix lint issue
squash 942a1f4 update tests
drop 0ac9e1a typo
```

### When to use this?

Before opening a pull request, before tagging a release branch, or when turning exploratory work into a clean narrative.

### Common mistakes

- Interactive rebasing commits that already exist on a shared branch
- Squashing away meaningful checkpoints that would help later debugging

### Pro tips

- Clean history should still tell the truth
- Do not optimize for elegance so much that you remove useful context

## `git cherry-pick`

**Problem:** One commit on another branch needs to come over, but the rest of that branch does not.

**Explanation:** Cherry-pick copies the effect of a specific commit onto your current branch as a new commit.

**Solution:** Use it for urgent backports, surgical fixes, or moving a commit that landed on the wrong branch.

**Command:**

```bash
git switch release/2.4
git cherry-pick a91a7f2
```

```text
[release/2.4 8cf4e11] fix: handle empty password validation
 Date: Thu Apr 3 14:22:10 2026 +0000
 2 files changed, 28 insertions(+), 4 deletions(-)
```

## `git revert`

**Problem:** A bad commit is already shared and you need to undo it without rewriting public history.

**Explanation:** Revert creates a new commit that applies the inverse of an earlier commit.

**Solution:** Use revert on shared branches when safety and traceability matter more than a perfectly clean graph.

**Command:**

```bash
git revert 8cf4e11
```

## `git reset`

**Problem:** Your branch pointer or staging area is wrong and you need to move backward.

**Explanation:** Reset moves the current branch reference and may also update the staging area or working directory depending on mode.

**Solution:** Use reset carefully, mostly on local work. The recovery section covers `soft`, `mixed`, and `hard` in detail.

**Command:**

```bash
git reset --soft HEAD~1
```

## Read More

- [How to undo git commit and recover safely](/git/undo-and-recovery)
- [Git documentation](https://git-scm.com/docs)

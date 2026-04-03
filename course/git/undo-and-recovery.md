---
title: How to Undo Git Commit and Recover Safely
description: Learn how to undo the last Git commit, use reset modes safely, recover with reflog, and fix force-push mistakes without making things worse.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/git/foundations">Git</a> / Undo & Recovery
</div>

# How to Undo Git Commit and Recover Safely

Recovery is where Git changes from stressful to empowering. The key question is always: has the history been shared yet?

## Undo the Last Commit Without Losing Work

**Problem:** Your last commit message is wrong or the commit should be split, but the changes themselves are still useful.

**Explanation:** `git reset --soft HEAD~1` moves the branch pointer back one commit while keeping the changes staged.

**Solution:** Use soft reset when you want to redo the commit cleanly.

**Command:**

```bash
git reset --soft HEAD~1
git status
```

```text
On branch feature/billing
Changes to be committed:
  modified:   src/billing/plan.ts
  modified:   tests/plan.spec.ts
```

### When to use this?

When the commit is local and you want to rewrite it immediately.

### Common mistakes

- Using reset on a commit that has already been pulled by others
- Forgetting that reset changes what your branch points to

### Pro tips

- If the work is already shared, revert is usually safer than reset

## Reset Modes: Soft, Mixed, Hard

| Mode | Branch pointer moves | Staging area changes | Working files change |
| --- | --- | --- | --- |
| `--soft` | Yes | No, stays staged | No |
| `--mixed` | Yes | Yes, unstages | No |
| `--hard` | Yes | Yes | Yes |

**Problem:** Developers run `git reset --hard` when they only meant "unstage" or "redo the commit."

**Explanation:** The more aggressive the reset mode, the more state it rewrites.

**Solution:** Choose the lightest mode that solves the problem.

**Command:**

```bash
git reset --mixed HEAD~1
```

```text
Unstaged changes after reset:
M	src/billing/plan.ts
M	tests/plan.spec.ts
```

::: warning
`git reset --hard` can permanently discard uncommitted working tree changes. Do not use it casually.
:::

## Recover with `git reflog`

**Problem:** You moved `HEAD`, reset too far, or rebased badly and now the commit seems gone.

**Explanation:** Reflog records where branch tips and `HEAD` pointed recently, even when normal history commands no longer show the commit.

**Solution:** Find the lost commit in reflog, then reset or branch back to it.

**Command:**

```bash
git reflog
```

```text
f0c8d11 HEAD@{0}: reset: moving to HEAD~2
a91a7f2 HEAD@{1}: commit: fix: handle empty password validation
4a3ce2a HEAD@{2}: commit: build login form
```

Recover it:

```bash
git switch -c recovery/a91a7f2 a91a7f2
```

### When to use this?

Use reflog any time you think "I lost a commit."

### Common mistakes

- Panicking before checking reflog
- Running more destructive commands before identifying the old commit ID

### Pro tips

- Recovery is easier if you pause and inspect before trying random commands
- A temporary recovery branch is often safer than resetting immediately

## Fixing a Force-Push Mistake

**Problem:** Someone force-pushed a branch and overwrote expected history.

**Explanation:** The commits may still exist in local clones or reflog, but the shared branch pointer moved.

**Solution:** First identify the last known good commit. Then coordinate with the team before restoring history.

**Command:**

```bash
git reflog show origin/main
```

If you confirm the correct commit:

```bash
git push --force-with-lease origin <good-commit>:main
```

### When to use this?

Only when you fully understand what branch history should be restored and who may be affected.

### Common mistakes

- Force pushing again without verifying the intended recovery point
- Using `--force` instead of `--force-with-lease`
- Restoring history while teammates are still actively pushing

### Pro tips

- Announce the recovery plan before changing a shared branch
- Protected branches are worth enabling precisely because these mistakes happen

## Safe Decision Rule

If the bad history is:

- local only: reset is usually fine
- already shared: revert is usually safer
- apparently lost: check reflog before anything else

## Read More

- [Conflict resolution after history changes](/git/conflict-resolution)
- [Git documentation](https://git-scm.com/docs)

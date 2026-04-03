---
title: Parent Task and Subtask Branching Strategy
description: Learn how to use a parent task branch with subtask branches in GitHub, when this workflow works well for maintenance projects, and how to avoid conflicts and blocked delivery.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/workflows/designing-workflows">Workflows</a> / Parent and Subtask Branching
</div>

# Parent Task and Subtask Branching Strategy

This is a very practical workflow for teams already using Git every day, especially when one larger business task contains several smaller implementation tasks.

## The Real Problem This Solves

**Problem:** A task like "Ruby upgrade" or "checkout redesign" often affects many modules. If every small branch goes directly to `main`, review becomes noisy, conflicts increase, and partial work can land before the whole parent task is coherent.

**Explanation:** Git works best when the branch structure matches the shape of the work. If the work has a parent task and several dependent subtasks, forcing every subtask to pretend it is independent creates review pain and integration pain.

**Solution:** Create one parent task branch, then create subtask branches from that parent branch. Raise PRs from each subtask branch into the parent branch. When the parent task is complete, raise one final PR from the parent branch into the real integration branch such as `main`, `staging`, or `dev`.

**Command:**

```bash
git switch main
git pull origin main
git switch -c 450-ruby-upgrade
git push -u origin 450-ruby-upgrade
```

Create a subtask branch from the parent branch:

```bash
git switch 450-ruby-upgrade
git switch -c 451-upgrade-user-module
git push -u origin 451-upgrade-user-module
```

## What the Branch Graph Looks Like

```text
main
  \
   450-ruby-upgrade
      \
       451-upgrade-user-module
      \
       452-upgrade-payment-module
      \
       453-upgrade-admin-module
```

Then the PR flow is:

```text
451-upgrade-user-module   -> 450-ruby-upgrade
452-upgrade-payment-module -> 450-ruby-upgrade
453-upgrade-admin-module  -> 450-ruby-upgrade

450-ruby-upgrade -> main
```

## Why This Works Well

**Problem:** Large changes create too many conflicts and too much review noise when merged directly one by one to `main`.

**Explanation:** A parent branch becomes a safe integration area for one larger task. Subtasks can move independently, but they still combine into one coherent feature stream before they touch the shared branch.

**Solution:** Use the parent branch as a task-level integration branch.

Benefits:

- PRs stay smaller and easier to review
- module-specific work is isolated
- subtask branches can use code already merged into the parent branch
- the final PR to `main` tells one bigger story instead of many disconnected ones
- conflicts are handled inside the task stream earlier, not all at the end

## When to Use This

### Good fit

- maintenance-phase web apps
- framework upgrades
- dependency upgrades across many modules
- refactors split across backend, frontend, and shared code
- parent tasks that should ship together

### Less ideal

- very fast-moving product development where many features depend on each other daily
- teams that already use trunk-based development with feature flags
- environments where parent branches stay open for a long time and drift badly from `main`

## Step-by-Step Workflow

## 1. Create the parent branch

**Problem:** The parent task needs one place where all related subtasks can come together.

**Explanation:** This branch represents the full business or technical task, not one individual code change.

**Solution:** Branch from the agreed base, usually `main` in a maintenance-style workflow.

**Command:**

```bash
git switch main
git pull origin main
git switch -c 450-ruby-upgrade
git push -u origin 450-ruby-upgrade
```

### When to use this?

When one issue contains many smaller implementation tasks that are still part of one releaseable unit.

### Common mistakes

- creating the parent branch from an outdated `main`
- naming the parent branch too vaguely
- using the parent branch for direct coding instead of mainly integration

### Pro tips

- Keep the parent branch name tied to the ticket ID
- Document the list of subtask branches in the parent issue or PR description

## 2. Create subtask branches from the parent

**Problem:** Each developer or module change still needs an isolated branch.

**Explanation:** Branching from the parent means each subtask already has the shared task context.

**Solution:** Create every child branch from the parent branch, not from `main`.

**Command:**

```bash
git switch 450-ruby-upgrade
git switch -c 451-upgrade-user-module
git push -u origin 451-upgrade-user-module
```

### When to use this?

When the subtask logically depends on the parent task and should not be reviewed as a standalone change against `main`.

### Common mistakes

- branching subtasks from `main` by habit
- mixing more than one module or concern into a single subtask branch

### Pro tips

- Use one subtask branch per module, component, or clear unit of work
- If a subtask becomes too broad, split it again instead of forcing a huge PR

## 3. Raise PRs from subtask branches into the parent branch

**Problem:** Reviewers should inspect one slice of work at a time, not the whole parent task at once.

**Explanation:** A PR from a child branch to the parent branch shows only that child branch's changes.

**Solution:** Set the PR base to the parent branch, not `main`.

**Command:**

```bash
git push origin 451-upgrade-user-module
```

Then open a PR:

```text
base: 450-ruby-upgrade
compare: 451-upgrade-user-module
```

### When to use this?

When you want clean review boundaries but still need all work to collect under one bigger task.

### Common mistakes

- accidentally opening the PR against `main`
- merging to the parent branch without review because "it is not production yet"

### Pro tips

- Treat parent-branch PRs as real review steps, not informal placeholders
- Add links from child PRs back to the parent task

## 4. Merge the parent branch into the real integration branch

**Problem:** The task is complete, but the real project history should only receive the whole validated task.

**Explanation:** The parent branch now contains the reviewed subtask work in one branch.

**Solution:** Raise one final PR from the parent branch into the branch your team uses for integration.

**Command:**

```text
base: main
compare: 450-ruby-upgrade
```

## What Problems Learners Usually Face

## "My child branch is behind the parent branch now"

**Problem:** Another child branch merged into the parent, and now your branch is missing that new context.

**Explanation:** This is normal. The parent branch moved.

**Solution:** Rebase or merge the parent branch into your child branch.

**Command:**

```bash
git switch 451-upgrade-user-module
git fetch origin
git rebase origin/450-ruby-upgrade
```

If your team prefers merge:

```bash
git merge origin/450-ruby-upgrade
```

## "My PR suddenly shows too many commits"

**Problem:** The PR base branch is wrong, or the branch history was created from the wrong starting point.

**Explanation:** GitHub compares the current branch against the chosen base branch.

**Solution:** Verify the PR base is the parent branch. If the branch was created from `main` by mistake, recreate it correctly or rebase it onto the parent branch.

## "We are getting many conflicts near the end"

**Problem:** The parent branch stayed alive too long and drifted away from the real integration branch.

**Explanation:** Parent branches reduce conflict inside the task, but they do not remove drift from the rest of the repository.

**Solution:** Sync the parent branch with `main` regularly.

**Command:**

```bash
git switch 450-ruby-upgrade
git fetch origin
git merge origin/main
```

## Why This Works Well in Maintenance Projects

Maintenance work often has these traits:

- many related changes
- lower pressure for every task to reach `main` immediately
- larger upgrade efforts that should be released together
- need for safer review during refactors or dependency upgrades

That makes the parent-task model especially effective.

## Why This Can Break Down in Active Development

**Problem:** In a fast-moving product phase, one new task often depends on code from another unfinished task. If nothing reaches `main` until the whole parent task is approved and tested, other branches can get blocked.

**Explanation:** The parent-task workflow optimizes task grouping, but active product development often optimizes integration speed.

**Solution:** When dependency chains between unfinished tasks are common, consider one of these alternatives:

1. Use a `dev` branch as the shared integration branch for active development
2. Use `main` as the integration branch and separate deployment from merge using tags or releases
3. Use trunk-based development with feature flags when the team can keep changes small

## Alternative 1: Parent tasks on top of `dev`

**Problem:** Developers need access to not-yet-production code while the team is still building related work.

**Explanation:** A `dev` branch acts as the shared integration branch. Feature branches or parent branches can target `dev` first, while `staging` and `main` remain more controlled.

**Solution:** Branch from `dev`, merge into `dev`, then promote through `staging` and `main`.

**Command:**

```bash
git switch dev
git pull origin dev
git switch -c 450-ruby-upgrade
git switch -c 451-upgrade-user-module
```

Then the promotion flow becomes:

```text
child branch -> parent branch -> dev -> staging -> main
```

### When to use this?

When the product is in active development and many new tasks depend on other unfinished but reviewed code.

### Common mistakes

- treating `dev` like an unreviewed dumping ground
- letting `dev`, `staging`, and `main` drift with unclear promotion rules

### Pro tips

- Define exactly who promotes code from `dev` to `staging` and from `staging` to `main`
- Keep environment responsibilities explicit

## Alternative 2: Merge to `main`, deploy with tags

**Problem:** The team wants `main` to always contain the latest reviewed code, but different environments should still deploy different states.

**Explanation:** In this model, merge approval decides code integration, while deployment is controlled separately by tags or releases.

**Solution:** Merge reviewed work to `main`, then create tags for dev, staging, or production deployment targets.

**Command:**

```bash
git switch main
git pull origin main
git tag -a staging-2026-04-03.1 -m "Promote current main to staging"
git push origin staging-2026-04-03.1
```

Production example:

```bash
git tag -a prod-2026-04-03.1 -m "Promote current main to production"
git push origin prod-2026-04-03.1
```

### When to use this?

When review and integration should happen quickly, but deployments to each environment must remain controlled and traceable.

### Common mistakes

- assuming tags replace testing discipline
- creating tags with inconsistent naming
- forgetting that deployment automation must clearly know which tags map to which environment

### Pro tips

- This model is much easier when CI/CD already supports tag-based deployments
- Protect production tags and document who can create them

## Final Decision Rule

Use the parent-task and child-task branch model when:

- the work is large
- the subtasks belong together
- review clarity matters
- the project is in maintenance or controlled release mode

Switch to `dev` integration, tags, or trunk-based patterns when:

- tasks frequently depend on unfinished tasks
- waiting for `main` slows the team down
- the real problem is integration speed, not task grouping

## Read More

- [How to design a workflow](/workflows/designing-workflows)
- [GitHub collaboration, PRs, releases, and tags](/github/collaboration-and-automation)
- [Trunk-based development](/workflows/trunk-based-development)

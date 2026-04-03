---
title: How to Design a Git Workflow
description: Learn how to design a Git workflow based on release cadence, team size, branch protection, and deployment risk instead of copying a process blindly.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/workflows/designing-workflows">Workflows</a> / Designing a Workflow
</div>

# How to Design a Git Workflow

The best Git workflow is the one that matches how your team ships software, reviews change, and handles recovery.

## Start with Team Questions

Before choosing Git Flow, trunk-based development, or a forking workflow, answer these questions:

1. How often do you deploy?
2. Do you need release branches?
3. Are most contributors internal or external?
4. How large are changes typically?
5. How strict is your review and QA process?
6. How risky is rollback in production?

## Decision Framework

**Problem:** Teams often inherit a workflow from another company without checking whether the underlying constraints match.

**Explanation:** Workflow design is really a tradeoff between speed, coordination cost, auditability, and release control.

**Solution:** Choose the simplest workflow that still protects the team from real risk.

| If your reality is... | Lean toward... |
| --- | --- |
| Frequent deployment, small changes, heavy automation | Trunk-based development |
| Scheduled releases, staged environments, explicit release hardening | Git Flow or release branches |
| Large maintenance tasks with many related subtasks | Parent task and subtask branching |
| Open source or external contributions | Forking workflow |

## A More Practical Selection Guide

Many teams do not fail because they chose the wrong command. They fail because they chose the wrong integration model for the shape of their work.

| Project situation | Why it happens | Usually works well |
| --- | --- | --- |
| Maintenance-phase web app | big upgrades, grouped refactors, lower need to merge each small task to `main` immediately | parent task branch with subtask branches |
| Active product development | new tasks often depend on code from other unfinished tasks | `dev` integration branch, trunk-based development, or fast merge-to-main with controlled deployment |
| SDK or library product | consumers need stable, repeatable versions | tags and versioned releases |

## Maintenance vs Active Development

**Problem:** Teams often use one workflow forever even after the project stage changes.

**Explanation:** A workflow that feels excellent during maintenance can feel painfully slow during active feature development.

**Solution:** Match the workflow to the project phase, not to habit.

### Maintenance-phase web apps

This is where parent-task branching often shines:

- one bigger task contains many module updates
- the whole task should usually move together
- code review benefits from smaller child PRs
- shipping slightly later is acceptable if history and testing stay cleaner

### Active development-phase web apps

This is where parent-task branching can create friction:

- task B needs code from task A before task A is production-ready
- many branches depend on other unfinished branches
- waiting for a parent branch to fully complete can block the rest of the team

In that case, a `dev` branch or trunk-based model often fits better.

### SDKs and libraries

Libraries are different because the consumer cares deeply about version stability:

- they want a known compatible version
- they do not want surprise behavioral changes
- they often pin an exact version in their dependency file

That is why tags and semantic releases matter so much more for libraries than for many internal apps.

## Workflow Design Principles

- Optimize for short-lived branches when possible
- Protect shared branches with reviews and CI
- Prefer reversible changes over heroic recovery plans
- Standardize naming, commit style, and merge policy
- Keep the workflow legible to new team members

## When to use this?

Use this page when defining team standards, improving an existing process, or explaining why a workflow should change.

## Common mistakes

- Copying a popular workflow instead of solving the actual team problem
- Using long-lived branches when the real issue is missing CI confidence
- Mixing contradictory practices, such as rebasing shared release branches

## Pro tips

- Every workflow should include a recovery story, not just a happy path
- The commit graph your workflow produces should be understandable by the team that maintains it

## Next Steps

- [Parent task and subtask branching](/workflows/parent-subtask-branching)
- [Git Flow](/workflows/git-flow)
- [Trunk-based development](/workflows/trunk-based-development)
- [Forking workflow](/workflows/forking-workflow)

---
title: Git Flow Explained
description: Learn when Git Flow works well, where it adds overhead, and how to think about feature, release, hotfix, and main branches in real teams.
---

<div class="crumbs">
  <a href="/">Home</a> / <a href="/workflows/designing-workflows">Workflows</a> / Git Flow
</div>

# Git Flow Explained

Git Flow is a structured branching model often used when teams have formal release cycles.

## Core Branches

- `main`: production-ready history
- `develop`: integration branch for upcoming work
- `feature/*`: short-lived branches from `develop`
- `release/*`: stabilization branches for a planned release
- `hotfix/*`: urgent fixes from `main`

## Why teams choose Git Flow

**Problem:** Teams need a stable release preparation area while new feature work continues separately.

**Explanation:** Git Flow separates integration from production and gives release hardening its own space.

**Solution:** Use Git Flow when release cadence is structured and the extra branching overhead solves a real process need.

### When to use this?

Good fit for:

- scheduled releases
- explicit QA hardening periods
- teams that maintain release branches deliberately

### Common mistakes

- Adopting Git Flow in fast-moving products where `develop` becomes a bottleneck
- Letting feature branches stay open too long before they integrate into `develop`

### Pro tips

- Git Flow works best when release management is a genuine workflow requirement, not just habit

## Tradeoffs

Benefits:

- clear release preparation path
- explicit hotfix flow
- strong separation between in-progress and production history

Costs:

- more branch management
- more merge coordination
- slower feedback if teams wait too long to integrate

## Where a `dev` Branch Helps

**Problem:** Parent-task workflows or direct-to-main review workflows can become too slow when active development tasks depend on each other constantly.

**Explanation:** A `dev` branch gives the team a shared integration point for reviewed work that is not yet ready for production.

**Solution:** Use `dev` when your real need is faster integration between unfinished but approved features, while `staging` and `main` stay more controlled.

Typical promotion flow:

```text
feature branch -> dev -> staging -> main
```

This works especially well when:

- frontend and backend tasks depend on each other
- QA happens on `staging`
- production should receive only curated releases

Be careful though: if `dev` becomes a dumping ground with weak review, it creates confusion instead of clarity.

## Recommendation

If your team deploys multiple times a day, Git Flow is often heavier than necessary. In that case, compare it with [trunk-based development](/workflows/trunk-based-development).

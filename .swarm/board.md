# Swarm Orchestration Board

This is the single source of truth (SSoT) for all agents in the swarm. The GSD plugin acts as the primary "writer" to this board, appending tasks that can be parallelized. Sub-agents act as "readers/executors".

**Rule: Append-Only.** Wiping the board is forbidden to preserve history and prevent blocking dependencies.
**Rule: File Locking.** Agents must "check out" files by adding them to the `Locked Files Registry` section under their assigned Agent ID. If a file is locked by another agent, the current agent must wait or leave a message in `handoff.log`.

## Backlog
*Tasks waiting to be picked up.*

- [ ] **Task 1:** System Transformation (Meta-Task)
  - Files: `.agent/skills/planner/SKILL.md`, `.agent/workflows/plan.md`
  - Action: Update planner and workflow logic to write to `board.md` instead of separate PLAN.md files. Ensure file locking checks are enforced before making edits.

## In Progress (Locked)
*Tasks currently being executed. Include Agent ID and locked files.*

## Verification
*Tasks completed by a Coder, waiting for a Verifier.*

## Done
*Completed tasks.*

---
## Locked Files Registry
*Format: `- @AgentID: [comma-separated file paths]`*

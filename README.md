# Overview
Frontend for Imposter blockchain game
# Versions
## v0.1
- [x] scaffolding
- [x] join game page
  - [x] check supplied contract address configs
  - [x] display errors
  - [x] join by selecting game from list
- [ ] game lobby
  - [ ] leave game
  - [ ] player list - updates
  - [ ] start game
- [ ] active game screen
  - [ ] leave game
  - [ ] show team membership
  - [ ] show alive/dead state - updates
  - [ ] show player stats (total, alive, dead, left - updates)
  - [ ] action panel - imposters
    - [ ] fake start task
    - [ ] fake finish task
    - [ ] kill player button -> modal
      - [ ] show list of alive players
      - [ ] kill action
  - [ ] action panel - real ones
    - [ ] show list of completed tasks
    - [ ] start task -> modal
      - [ ] show list of incomplete tasks
      - [ ] start task action
    - [ ] show task in progress
    - [ ] finish task action
  - [ ] call vote -> modal
    - [ ] show list of alive players
    - [ ] vote on player
  - [ ] message box
    - [ ] show game states
    - [ ] show anonymized actions
    - [ ] show player death
    - [ ] show vote outcome
- [ ] win screen
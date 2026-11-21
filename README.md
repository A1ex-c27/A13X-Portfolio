# WONDERLAND.EXE — ARG website

## Publish once, update forever
1. Create a GitHub repo (e.g. `wonderland-exe`) and upload every file, keeping the folder structure.
2. **Settings → Pages → Deploy from a branch → `main` `/ (root)` → Save.**
3. Use that one URL for every update.

Test locally with `python -m http.server` (opening the file directly breaks `fetch`).

## Content lives in `updates.json`
- `notices`: list of `{from, text}`. The newest notice whose `from` date has passed is shown.
- `documents`: `{name, date, path, releaseAt}`. A doc appears in `open archive` once `releaseAt` passes.
- `hidden`: the `.WELCOME.TXT` file (reads from the same `documents/welcome.txt`, so no duplicates).
- `vault`: a locked doc. Its `sha256` is the hash of the lowercase passphrase.
- Bump `revision` when you publish.

Preview a future date: `yoursite/?now=2026-12-05`

## Changing the password
```
printf 'yourpassword' | sha256sum
```
Paste the result into `vault.sha256`. Also re-encode the clue in `documents/service.txt` (it is ROT13 of the current password, CAINE).

## The puzzle chain (current)
1. Breadcrumbs for `dir /a`: footer "(/A)", or double-clicking the logo 3 times.
2. `type .welcome.txt` reads the hidden file.
3. Breadcrumbs for the service record: HTML comment in source, `robots.txt`, or running `disconnect` 3 times, then `open service`.
4. Service record has a ROT13 name. `unlock caine` adds MEMO_03.TXT to the archive.
5. Also: the Disk Utilities card hints that the System Utility accepts index requests (`open archive`).

Replace the DM line in `memo_03.txt` with your real hook once you decide CAINE's role.

## Notes
- Hidden URLs and client-side puzzles are discoverable, not secure. Don't put DM notes, real credentials, or player data here.
- `localStorage` tracks "NEW" markers and the unlocked vault per browser only.
- Avoid deleting old documents once found; archive or rewrite them instead.
- Keep the mystery in-world and collect no visitor data.

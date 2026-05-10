# Backups

## `hero-images-originals/`

Each time you run `npm run optimize:hero`, full-resolution copies of everything in `public/images/hero/` are copied into a new timestamped folder here **before** files are overwritten.

This directory is **gitignored** so large originals are not pushed to the remote. Keep archives elsewhere if you need them off this machine.

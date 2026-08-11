# Security

## Reporting

If you find a security issue in this repository (e.g. accidental secret commit,
XSS in the tuner page, unsafe dependency usage), open a private report to the
maintainer via GitHub Security Advisories when the repo is published, or contact
the repository owner directly.

## What this project is not

- Not a tile proxy or API key vault.  
- Do not commit real map provider keys into `map-tiles.config.js` if that file
  is public — prefer local overrides that stay gitignored.  
- The HTTP tuner is a **local design tool**, not a hardened production host.

## Secrets policy

This repository should never contain:

- Map / cloud API keys or tokens  
- Private production storyboards or unreleased media under marketing source trees  
- Credentials for HyperFrames / render farms  

If you fork and add keys, keep them in an untracked `map-tiles.config.local.js`
(see `.gitignore`).

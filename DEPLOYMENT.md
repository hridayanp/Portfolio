# Deploying this portfolio to GitHub Pages

A complete walkthrough — from "I have a folder on my laptop" to "my site is live
on a domain I own." Written against the actual state of this project, so the
commands and config below are the ones you need, not generic examples.

**What you're deploying:** a Vite + React static site. No server, no database,
no API routes. `npm run build` produces a `dist/` folder of plain HTML, CSS, JS
and images, and GitHub Pages serves that folder. This is exactly what Pages is
good at, and it's free.

---

## Table of contents

1. [What you need before you start](#1-what-you-need-before-you-start)
2. [Step 0 — accounts](#2-step-0--accounts)
3. [Step 1 — get the code onto GitHub](#3-step-1--get-the-code-onto-github)
4. [Step 2 — choose your URL shape (this decides a config value)](#4-step-2--choose-your-url-shape-this-decides-a-config-value)
5. [Step 3 — set `base` in `vite.config.ts`](#5-step-3--set-base-in-viteconfigts)
6. [Step 4 — add the deploy workflow](#6-step-4--add-the-deploy-workflow)
7. [Step 5 — turn Pages on](#7-step-5--turn-pages-on)
8. [Step 6 — first deploy](#8-step-6--first-deploy)
9. [Step 7 — buying a domain](#9-step-7--buying-a-domain)
10. [Step 8 — pointing the domain at GitHub](#10-step-8--pointing-the-domain-at-github)
11. [Step 9 — connecting the domain in GitHub](#11-step-9--connecting-the-domain-in-github)
12. [Step 10 — HTTPS](#12-step-10--https)
13. [Everyday workflow after launch](#13-everyday-workflow-after-launch)
14. [Troubleshooting](#14-troubleshooting)
15. [Limits, costs and gotchas specific to this project](#15-limits-costs-and-gotchas-specific-to-this-project)

---

## 1. What you need before you start

| Thing | Status in this project |
| --- | --- |
| Node.js 20+ | You're on v22 — fine |
| Git installed | Yes, repo is already initialised |
| A GitHub account | **Needed — see Step 0** |
| A GitHub remote | **Not set yet — see Step 1** |
| A domain | Optional, ~$10–15/year — see Step 7 |

Two things about this project worth knowing up front, because they make your
life easier:

- **There is no client-side router.** Navigation is anchor links (`#about`,
  `#work`). That means you do **not** need the `404.html` SPA-fallback hack that
  most React-on-Pages guides tell you to add. Skip it.
- **`dist/` is about 13 MB**, almost all of it project screenshots. Well under
  every limit, but see [section 15](#15-limits-costs-and-gotchas-specific-to-this-project).

---

## 2. Step 0 — accounts

### GitHub account

Go to [github.com/signup](https://github.com/signup). You need:

- an email address
- a username — **this becomes part of your URL**, so pick deliberately.
  `github.com/hridayanphukan` gives you `hridayanphukan.github.io`.

**Which plan?** **GitHub Free is enough.** You do not need to pay for anything
to host this site.

The one catch: on the Free plan, Pages only works from **public** repositories.
Your source code will be visible to anyone. For a portfolio that's normally fine
— it's a showcase of your work. If you specifically need the source private,
GitHub Pro (~$4/month) allows Pages from private repos.

> Your `docs/` case studies would be public too. They're your own written work
> about projects you've shipped, so that's usually the point — but read them
> once with "a stranger can see this" in mind before you push. If any client
> details shouldn't be public, that's the moment to catch it.

### Enable 2FA

GitHub requires two-factor authentication. Set it up when prompted —
Settings → Password and authentication. Use an authenticator app.

### Git identity on your machine

```bash
git config --global user.name "Hridayan Phukan"
git config --global user.email "your@email.com"
```

### GitHub CLI (optional but makes Step 1 one command)

```bash
brew install gh     # macOS
gh auth login       # follow the browser prompt
```

---

## 3. Step 1 — get the code onto GitHub

Your project is already a git repo on branch `new-design`, with no remote.

### 3.1 Check what you're about to publish

```bash
cd ~/Developer/Projects/portfolio
cat .gitignore          # confirm node_modules and dist are ignored
git status
```

`dist/` should be ignored — it's a build output and the workflow rebuilds it.
If it isn't listed, add it:

```bash
echo "dist" >> .gitignore
```

### 3.2 Decide your branch

You're on `new-design`. Deploy from `main` — it's the convention and every
guide assumes it.

```bash
git branch -m new-design main
```

### 3.3 Commit everything

```bash
git add -A
git commit -m "Portfolio site"
```

### 3.4 Create the GitHub repo and push

**With the CLI:**

```bash
gh repo create portfolio --public --source=. --remote=origin --push
```

**Or through the website:** go to [github.com/new](https://github.com/new),
name it `portfolio`, set **Public**, and create it **without** a README,
`.gitignore` or licence (you already have files — those would conflict). Then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

Refresh the repo page; your files should be there.

---

## 4. Step 2 — choose your URL shape (this decides a config value)

This is the one decision that trips people up, so make it now.

| You want | Name the repo | Site lives at | `base` must be |
| --- | --- | --- | --- |
| **A** — a project page | `portfolio` | `USERNAME.github.io/portfolio/` | `"/portfolio/"` |
| **B** — your user site | `USERNAME.github.io` | `USERNAME.github.io` | `"/"` |
| **C** — your own domain | anything | `yourdomain.com` | `"/"` |

**If you're buying a domain (Step 7), you're option C — use `base: "/"`.**

If you're not sure yet, option A is the safe start; you can switch to C later
by changing `base` back to `"/"` and redeploying.

> **Why this matters:** Vite writes absolute asset paths into `index.html`. With
> the wrong `base`, your page loads but the CSS and JS 404 — you get unstyled
> text on a white background. That specific symptom almost always means `base`
> is wrong.

---

## 5. Step 3 — set `base` in `vite.config.ts`

Your current config has no `base`, which is correct for options **B** and
**C**. If you chose **A** (repo named `portfolio`, no custom domain), add it:

```ts
export default defineConfig({
  base: "/portfolio/",          // ← add this line, keep everything else
  plugins: [react(), tailwindcss()],
  // ...
})
```

Then verify locally — `vite preview` serves the real build at the real base:

```bash
npm run build
npm run preview
```

Open the URL it prints. If the styling is intact, `base` is right.

---

## 6. Step 4 — add the deploy workflow

You have no `.github/workflows/` folder yet. This file makes GitHub rebuild and
republish the site on every push to `main`.

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:        # lets you trigger a deploy by hand from the Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

# If you push twice quickly, let the second run finish and cancel the first.
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      # `npm ci` installs exactly what package-lock.json specifies.
      # It needs that lockfile committed — see the note below.
      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**`package-lock.json` must be committed** or `npm ci` fails. Check:

```bash
git ls-files package-lock.json     # should print the filename
```

If it prints nothing, `git add package-lock.json` and commit it.

Note `npm run build` runs `tsc -b && vite build` — a TypeScript error fails the
deploy. That's a feature: it stops a broken build reaching production. Run
`npm run build` locally before pushing and you'll never be surprised.

Commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deploy workflow"
git push
```

---

## 7. Step 5 — turn Pages on

In your repo on github.com: **Settings → Pages**.

Under **Build and deployment → Source**, choose **GitHub Actions**.

That's the whole step. Do **not** pick "Deploy from a branch" — that's the older
method and it doesn't run your build.

---

## 8. Step 6 — first deploy

Open the **Actions** tab. You should see your workflow running.

- Green tick → open **Settings → Pages**, your URL is at the top. Click it.
- Red X → click the run, open the failed step, read the error. Most first-run
  failures are a missing lockfile or a TypeScript error. See
  [Troubleshooting](#14-troubleshooting).

The very first deploy can take a few minutes longer than later ones. If you get
a 404 immediately after a green tick, wait two minutes and hard-refresh
(`Cmd+Shift+R`).

**Check the browser console** on the live site. If you see 404s for
`/assets/index-*.js`, your `base` is wrong — back to [Step 3](#5-step-3--set-base-in-viteconfigts).

---

## 9. Step 7 — buying a domain

### What kind of account do you need?

**None beyond a domain registrar account.** You do not need:

- ❌ a paid GitHub plan — Free hosts custom domains on public repos
- ❌ a web host — GitHub serves the files
- ❌ an SSL certificate — GitHub issues one free via Let's Encrypt
- ❌ a CDN — Pages is already behind one

You need exactly one thing: **a domain, from a registrar, ~$10–15/year.**

### Where to buy

Any registrar works. What matters is that it gives you **full DNS record
control** (the ability to add A, AAAA and CNAME records) — they all do, but
check you're not on some locked-down "website builder" bundle.

Reasonable options: **Cloudflare Registrar** (sells at wholesale cost, no
markup), **Namecheap**, **Porkbun**, **Google Domains → now Squarespace
Domains**. Avoid registrars that charge extra for DNS management or WHOIS
privacy — the good ones include both.

### Choosing the name

For a portfolio, `firstnamelastname.com` is the safe, professional choice.
`.dev` and `.io` are common for engineers. `.dev` is worth knowing about: it's
on the HSTS preload list, meaning browsers refuse to load it over plain HTTP —
which is fine here, because GitHub gives you HTTPS anyway.

### At checkout

- **Turn on WHOIS / domain privacy.** Without it, your name, address, email and
  phone number are in a public database that spammers scrape. Most registrars
  include it free; if one charges, that alone is a reason to go elsewhere.
- **Turn on auto-renew.** Letting a portfolio domain lapse is a genuinely bad
  day — they get bought within minutes by squatters.
- Ignore every upsell. You don't need hosting, email, SSL, "SEO tools" or a
  site builder.

---

## 10. Step 8 — pointing the domain at GitHub

Two decisions: apex or www, and then the DNS records.

### 10.1 Apex or www?

- **Apex** — `yourdomain.com`. Cleaner. Needs four A records.
- **`www`** — `www.yourdomain.com`. Needs one CNAME, and is slightly more robust.

Either is fine. Set up **both** so whichever someone types works: configure the
one you want as primary, and GitHub will redirect the other to it.

### 10.2 Verify your domain first (recommended)

Before connecting it, verify ownership: **GitHub → your profile Settings →
Pages → Add a domain**. GitHub gives you a `TXT` record to add at your
registrar. This stops anyone else from claiming your domain on their Pages site
if you ever remove it from yours. Takes two minutes; worth doing.

### 10.3 The DNS records

Go to your registrar's DNS settings and add:

**For the apex domain** — four A records, all with host/name `@`:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

Four records for redundancy — add all four, not one.

**IPv6 (optional but recommended)** — four AAAA records, host `@`:

```
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
```

**For www** — one CNAME:

```
CNAME   www   YOUR-USERNAME.github.io.
```

Note: the target is `YOUR-USERNAME.github.io` — **your username, not the repo
name.** No `/portfolio` on the end. The trailing dot is required by some
registrars and ignored by others.

> If your registrar supports **ALIAS** or **ANAME** records, you can use one of
> those pointing at `YOUR-USERNAME.github.io` instead of the four A records.
> Cloudflare's "CNAME flattening" does the same thing.

### 10.4 Check it propagated

DNS changes can take up to 24 hours, though in practice it's often minutes.

```bash
dig yourdomain.com +noall +answer          # expect the four 185.199.x.153 IPs
dig www.yourdomain.com +noall +answer      # expect your USERNAME.github.io
```

Don't move on until `dig` shows the right values — GitHub's checks will fail
against stale DNS.

---

## 11. Step 9 — connecting the domain in GitHub

**Settings → Pages → Custom domain.** Type the domain, hit **Save**.

GitHub runs a DNS check. Green tick means it worked. This writes a file called
`CNAME` into your repo containing your domain.

> **Important for this project:** that `CNAME` file lives at the repository
> root, but your deploy workflow publishes `dist/` — so the file gets lost on
> the next deploy and your domain setting silently reverts.
>
> **The fix:** put the file in `public/` instead, where Vite copies it into
> `dist/` on every build:
>
> ```bash
> echo "yourdomain.com" > public/CNAME
> git add public/CNAME
> git commit -m "Add CNAME for custom domain"
> git push
> ```
>
> One line, and your domain survives every future deploy. This is the single
> most common reason a custom domain on Pages "randomly stops working."

### Set `base` back to `/`

With a custom domain the site is served from the root, so if you added
`base: "/portfolio/"` in Step 3, remove it now and push.

---

## 12. Step 10 — HTTPS

**Settings → Pages → Enforce HTTPS.** Tick it.

The checkbox may be greyed out for up to 24 hours after you add the domain
while GitHub provisions a Let's Encrypt certificate. This is normal. Come back
later; once it's available, enable it. It renews automatically forever.

Until then your site is reachable over plain HTTP, which is fine short-term but
don't leave it that way.

---

## 13. Everyday workflow after launch

```bash
# make your changes, then:
npm run build          # catch TypeScript errors before CI does
git add -A
git commit -m "Update hero copy"
git push
```

Push to `main` → Actions rebuilds → site updates in a couple of minutes. That's
the whole loop. Watch progress in the Actions tab.

To roll back, revert the commit and push:

```bash
git revert HEAD
git push
```

---

## 14. Troubleshooting

**Site loads but has no styling; console shows 404s for `/assets/...`**
`base` is wrong. See [Step 3](#5-step-3--set-base-in-viteconfigts).

**404 on the whole site**
Source isn't set to GitHub Actions (Step 5), or the workflow hasn't succeeded
yet, or you're on a Free plan with a private repo.

**Workflow fails at `npm ci`**
`package-lock.json` isn't committed, or it's out of sync with `package.json`.
Run `npm install`, commit the updated lockfile, push.

**Workflow fails at `npm run build` with TS errors**
Reproduce locally with `npm run build` and fix. CI runs the same command.

**Custom domain worked, then broke after a deploy**
The `CNAME` file was lost. Put it in `public/CNAME` — see
[Step 9](#11-step-9--connecting-the-domain-in-github).

**"Domain does not resolve to the GitHub Pages server"**
DNS hasn't propagated or a record is wrong. Check with `dig`. Also make sure
you removed any old A records or parking-page records your registrar added by
default — leftover records from a registrar's default parking page are a
frequent culprit.

**Fonts don't load**
This site loads Manrope, Cormorant Garamond and JetBrains Mono from Google
Fonts. If you're behind a network that blocks `fonts.googleapis.com` you'll see
fallback faces. To remove that dependency entirely, self-host the fonts with
`@fontsource` packages — the project already does this for JetBrains Mono.

**Changes don't appear**
Hard-refresh (`Cmd+Shift+R`). Pages sets a short cache, and browsers are eager.

---

## 15. Limits, costs and gotchas specific to this project

### The limits (you're nowhere near them)

| Limit | Value | This project |
| --- | --- | --- |
| Source repo | 1 GB recommended | ~15 MB |
| Published site | 1 GB max | ~13 MB |
| Bandwidth | 100 GB/month (soft) | Fine |
| Builds | 10/hour (soft) | Doesn't apply — custom Actions workflow |
| Deploy timeout | 10 minutes | Build takes ~5 seconds |

### Total cost

| Item | Cost |
| --- | --- |
| GitHub account | $0 |
| GitHub Pages hosting | $0 |
| HTTPS certificate | $0 |
| Actions minutes (public repo) | $0 |
| Domain | ~$10–15/year |

**Total: the price of a domain.**

### Worth doing before launch

**Compress the images.** `src/assets/images/projects/` is 12 MB of PNGs — the
whole rest of the site is under 1 MB. They'll still load, but on a phone
connection the project cards will be slow. Converting to WebP typically cuts
80–90% off with no visible difference:

```bash
# macOS, via Homebrew
brew install webp
cd src/assets/images/projects
for f in *.png; do cwebp -q 82 "$f" -o "${f%.png}.webp"; done
```

Then update the imports in `src/content/projects.ts` to `.webp`. Worth twenty
minutes before you put the link on a CV.

**Also consider:** adding `<meta>` description and Open Graph tags to
`index.html` so the link shows a proper preview card when you share it, and a
`public/favicon.svg` to replace the default Vite icon.

### What GitHub Pages can't do

It serves static files only. If you later want a working contact form, the
site itself can't process it — use a service like Formspree or Netlify Forms,
or switch to a host with functions (Vercel, Netlify, Cloudflare Pages). Worth
knowing now, since `contact.email` is currently `null` in `src/content/site.ts`
and the UI omits the link rather than rendering a dead one.

---

## Quick reference

```bash
# One-time setup
git branch -m new-design main
gh repo create portfolio --public --source=. --remote=origin --push
# → Settings → Pages → Source: GitHub Actions

# Custom domain
echo "yourdomain.com" > public/CNAME && git add public/CNAME && git commit -m "CNAME" && git push
# → registrar: four A records to 185.199.{108,109,110,111}.153
# → Settings → Pages → Custom domain → Enforce HTTPS

# Every change after that
npm run build && git add -A && git commit -m "..." && git push
```

**Sources:** [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) ·
[Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) ·
[What is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

# byjohnandmaria.com

The wedding of John Rolly Gumbi and Ma. Rhea Gabas.
2 February 2027, Timmy in the Woods, Antipolo, Rizal.

Plain HTML, CSS and JavaScript. There is no framework and no build step:
edit a file, upload it, and it is live. GitHub Pages serves it, and `CNAME`
is what points the domain here.

```
index.html     the invitation
photos.html    where guests send their photos and see what everyone sent
robots.txt     keeps the entourage and the venue out of search
assets/css     reset.css, then style.css
assets/js      main.js
assets/img     the art, the photographs and the script titles
assets/fonts   Lato, self hosted (see LICENSE in that folder)
assets/audio   the music, off until the guest turns it on
```

The replies and the uploads go to a Google Apps Script bound to the couple's
own sheet. That script is not in this repository and must not be put here:
this repository is public and the guest list is not. The address it posts to
is near the top of `assets/js/main.js`.

The links to `style.css` and `main.js` carry a `?v=` number. Browsers and
GitHub Pages both hold on to those files, so raise the number whenever
either one changes.

# byjohnandmaria.com

Wedding site for John & Maria. 02.02.27, Timmy in the Woods, Antipolo.

Plain HTML, CSS and JS. No framework, no build step, nothing to compile.
GitHub Pages serves it, CNAME points the domain here.

```
index.html     the invitation
photos.html    guest uploads + the gallery
assets/        css, js, img, fonts, audio
```

RSVP and the uploads talk to a Google Apps Script on the couple's own
sheet. That script is NOT in this repo and never will be: this repo is
public, the guest list is not. Endpoint is near the top of main.js.

style.css and main.js are linked with ?v= numbers. Bump them after an
edit or the browser keeps serving the old file. Learned that one the
hard way.

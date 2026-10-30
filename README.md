# byjohnandmaria.com

The wedding of John Rolly Gumbi and Ma. Rhea Gabas.
2 February 2027, 3:00 PM, Timmy in the Woods, Antipolo, Rizal.

A static site: plain HTML, CSS and JavaScript, no framework and no build
step. Put the files on any web host and it runs. It is served from GitHub
Pages, and `CNAME` is what points the domain at it.

## What is here

```
index.html              the whole site, one page, in the order of the deck
CNAME                   the domain, read by GitHub Pages
robots.txt              keeps the entourage and the venue out of search
assets/
  css/
    reset.css           box sizing, safe-area insets, defaults
    base.css            the faces, the colours, the type scale
    envelope.css        the opening: the sobre, the seal, the card
    layout.css          the nav and every page from the landing down
    rsvp.css            the reply form and the uploader
    footer.css          the black bar at the end and the music button
    paper.css           the one paper the whole sheet is laid on
  js/
    main.js             the opening, the countdown, the RSVP, the music
  img/                  the art, the photographs and the script titles
  fonts/                Lato, self-hosted (see LICENSE in that folder)
  audio/                the music that plays when it is turned on
```

The stylesheets are linked in exactly the order above, and that order
matters: `paper.css` sets the paper that runs behind the whole site, and it
has to come after the pages that set a colour of their own.

## The RSVP

The form talks to a Google Apps Script bound to the couple's own sheet. That
script is **not** in this repository and must not be put here, because the
repository is public and the guest list is not. It lives only in the Apps
Script editor and in the couple's own Drive.

The address the form posts to is set near the top of `assets/js/main.js`.
Changing the script means redeploying it in the Apps Script editor
(Deploy → Manage deployments → edit → New version → Deploy) and pasting the
new `/exec` address in.

## Changing something

Edit the file, save, and upload. There is nothing to compile.

The links to the stylesheets and to `main.js` carry a `?v=` on the end.
GitHub Pages and browsers both hold onto these files, so an edit can appear
to do nothing until that number is changed. Bump it in `index.html` whenever
a stylesheet or the script changes, and everyone gets the new file.

## Music

`assets/audio/score.mp3` is off until the guest presses the small round
button at the bottom right. Browsers do not allow sound to start on its own,
and a wedding invitation is not the place to argue with that.

# Refreex Desktop

Refreex is an torrent-client based entirely on [webtorrent](http://webtorrent.io/) .
The mission is bring to the people the advantages of a descentralized network for media like music.

It can read every torrent in the network (at the moment just the ones that are in an hybrid client, we need to create a standalone electron process and communicate to it for changes to allow TCP connections :) ) and it will show you the albums in such a way where every is there where you know, the interface is based on the design of the most famous application of music in the world. Why almost the same? Because the people know how to use it so we don't need to re-do thinks that work, the template was obtained from [https://github.com/alowenthal](https://github.com/alowenthal) and designers are more than welcome to give it some style/customisation.

Thinks in a technical spec:

  * Create API to allow the integrations of trackers/searchers.
  * Create playlists based on selective files from differentes torrents using JSON format.
  * The playlists should be created using DAT protocol to allow mutation of the playlist (torrents are immutables).
  * Create API bringing the possibility of install plugins.

  
Any kind help is more than welcome.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd refreex-desktop`
* `npm install`

## Running / Development

* `ember electron`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
  
License MIT

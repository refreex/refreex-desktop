import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import { computed  } from '@ember/object'

export default Route.extend({
    webtorrentService: service(),
    init() {
        this._super(...arguments);
        this.addObserver('webtorrentService.torrentsLength', this, 'setAlbums');
        this.get('webtorrentService').torrentsLength;
    },

    setAlbums() {
        console.log(1)
        if (this.get('webtorrentService').ready && this.get('webtorrentService').torrentsLength >= 1) {
            const albumsArray = [];
            this.get('webtorrentService').torrents.forEach((torrent) => {
                albumsArray.push({
                    name: torrent.dn,
                    files: torrent.files,
                })
            });

            this.set('jaja', 'asas');
        }
    },

    model() {
        return [{
            name: 'jaja',
        }]
    },

});

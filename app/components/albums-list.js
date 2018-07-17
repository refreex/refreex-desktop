import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import torrentPoster from '../utils/torrent-poster';

export default Component.extend(FileSaverMixin, {
    webtorrentService: service(),

    albums: computed('webtorrentService.torrents.[]', function() {
        const webtorrent = this.get('webtorrentService');
        if (webtorrent.ready && webtorrent.torrents.length >= 1) {

            return this.get('webtorrentService').torrents.map((val) => {
                return {
                    name: val.name,
                    files: val.files,
                    downloadSpeed: val.downloadSpeed,
                    magnetURI: val.magnetURI,
                    image: image,
                }
            });

        }
    }),

    actions: {
        playSong(file) {
            const opts = {autoplay: true};
            file.renderTo('audio#main-player', opts, function(err, elem){
                console.log(1234, err, elem);
            });
        },
    },
});

import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

// import torrentPoster from '../utils/torrent-poster';

export default Component.extend(FileSaverMixin, {
    webtorrentService: service(),
    playlistsService: service(),
    tagName: 'div',
    classNames: ['content__middle'],
    isOpen: true,

    albums: computed('webtorrentService.torrents.[]', function() {
        const webtorrent = this.get('webtorrentService');
        if (webtorrent.ready && webtorrent.torrents.length >= 1) {

            return this.get('webtorrentService').torrents.map((torrent) => {
                // const posterFile = this.filterOnExtension(torrent, mediaExtensions.image);
                return {
                    name: torrent.name,
                    // files,
                    // downloadSpeed: torrent.downloadSpeed,
                    // posterFile: posterFile[0] || null,
                    infoHash: torrent.infoHash,
                }
            });

        }
    }),


    // //TODO: Implement solution like the one used in webtorrent-desktop, torrent-poster.
    // displayCovers: observer('albums', function() {
    //     if (this.albums) {
    //         this.get('albums').forEach(function(el) {
    //             if (el.posterFile) {
    //                 let imgElement = document.getElementById(`poster${el.infoHash}`);
    //
    //                 if (!imgElement) {
    //                     let imgElement = document.createElement('img');
    //                     imgElement.id = `poster${el.infoHash}`;
    //                     imgElement.width = 200;
    //                     imgElement.height = 200;
    //                     document.getElementById('albums').appendChild(imgElement);
    //                 }
    //
    //                 el.posterFile.renderTo(`img#poster${el.infoHash}`)
    //             }
    //         })
    //     }
    // }),


});
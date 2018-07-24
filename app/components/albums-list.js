import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

// import torrentPoster from '../utils/torrent-poster';

const mediaExtensions = {
    audio: ['.aac', '.asf', '.flac', '.m2a', '.m4a', '.mp2', '.mp4', '.mp3', '.oga', '.ogg', '.opus',
        '.wma', '.wav', '.wv', '.wvp'],
    image: ['.gif', '.jpg', '.jpeg', '.png']
};

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
                const files = this.filterOnExtension(torrent, mediaExtensions.audio);
                const posterFile = this.filterOnExtension(torrent, mediaExtensions.image);
                return {
                    name: torrent.name,
                    files,
                    // downloadSpeed: torrent.downloadSpeed,
                    posterFile: posterFile[0] || null,
                    infoHash: torrent.infoHash,
                }
            });

        }
    }),

    /**
     * Filter file on a list extension, can be used to find al image files
     * @param torrent Torrent to filter files from
     * @param extensions File extensions to filter on
     * @returns {number} Array of torrent file objects matching one of the given extensions
     */
    filterOnExtension(torrent, extensions) {
        return torrent.files.filter(file => {
            const extname = file.name.toLowerCase().split('.').pop();
            return extensions.indexOf(`.${extname}`) !== -1
        })
    },

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

    addSongToPlaylist(torrent, file) {
        this.get('playlistsService').addSongToPlaylist(torrent, file);
    },

    removeSongFromPlaylist(torrent, file) {
        this.get('playlistsService').removeSongFromPlaylist(torrent, file);
    },


    actions: {

        playSong(file) {
            const opts = {autoplay: true};
            file.renderTo('audio#main-player', opts, function(err, elem){
                console.log('Reproducir', err, elem);
            });
        },

        toggleAlbum() {
            this.toggleProperty('isOpen');
        },

        toggleCheckboxValue(album, file) {
            if (file.checked) {
                this.removeSongFromPlaylist(album, file);
                file.checked = false;
                return;
            }

            this.addSongToPlaylist(album, file);
            file.checked = true;
        },

    },
});
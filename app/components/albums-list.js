import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

// import torrentPoster from '../utils/torrent-poster';

export default Component.extend(FileSaverMixin, {
    webtorrentService: service(),
    playlistsService: service(),
    isOpen: true,
    isChecked: false,

    albums: computed('webtorrentService.torrents.[]', function() {
        const webtorrent = this.get('webtorrentService');
        if (webtorrent.ready && webtorrent.torrents.length >= 1) {

            return this.get('webtorrentService').torrents.map((torrent) => {

                //TODO: find the reason of creating a function with torrent as a param is returning undefined.
                const posterFile = torrent.files.find(function (file) {
                    if(file.name.endsWith('.jpg')) {
                        return file.name.endsWith('.jpg');
                    }

                    if(file.name.endsWith('.png')) {
                        return file.name.endsWith('.png');
                    }

                    if(file.name.endsWith('.gif')) {
                        return file.name.endsWith('.gif');
                    }
                });

                return {
                    name: torrent.name,
                    files: torrent.files,
                    downloadSpeed: torrent.downloadSpeed,
                    magnetURI: torrent.magnetURI,
                    posterFile: posterFile ? posterFile : null,
                    infoHash: torrent.infoHash,
                }
            });

        }
    }),

    //TODO: Implement solution like the one used in webtorrent-desktop, torrent-poster.
    displayCovers: observer('albums', function() {
        if (this.albums) {
            this.get('albums').forEach(function(el) {
                if (el.posterFile) {
                    let imgElement = document.getElementById(`poster${el.infoHash}`);

                    if (!imgElement) {
                        let imgElement = document.createElement('img');
                        imgElement.id = `poster${el.infoHash}`;
                        imgElement.width = 200;
                        imgElement.height = 200;
                        document.getElementById('albums').appendChild(imgElement);
                    }

                    el.posterFile.renderTo(`img#poster${el.infoHash}`)
                }
            })
        }
    }),


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

        addSongToPlaylist(torrent, file) {
            let album = this.get('playlistsService').getAlbumFromPlaylist(torrent);

            if (!album) {
                this.get('playlistsService').addAlbumToPlaylist(torrent);
                album = this.get('playlistsService').getAlbumFromPlaylist(torrent);
            }

            this.get('playlistsService').addFileToPlaylist(album, file.name);
        },

        removeSongFromPlaylist(torrent, fileName) {
            let album = this.get('playlistsService').getAlbumFromPlaylist(torrent);
            this.get('playlistsService').removeFileFromPlaylist(album, fileName);
        },

    },
});

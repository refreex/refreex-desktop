import Service from '@ember/service';
import { computed } from '@ember/object';

// const playlists = [];

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('playlists', []);
        this.set('activePlaylistName', null);
        this.createPlaylist('default');
        // this.get('playlistSelected');
    },

    playlistSelected: computed('activePlaylistName,playlists.[]', function() {
        console.log(234)
        return this.get('playlists').find((el) => el.name === this.get('activePlaylistName'));
    }),

    createPlaylist(name) {
        let playlist = this.get('playlists').find((el) => el.name === name);
        if (playlist) {
            name = `${name}Copy${this.get('playlists').length}`
        }

        this.get('playlists').pushObject(
            {
                name,
                albums: [],
            }
        );

        this.setActivePlaylist(name);
    },

    setActivePlaylist(name) {
        this.set('activePlaylistName', name);
    },

    getAlbumFromPlaylist(torrent) {
        return this.get('playlistSelected.albums').find((el) => el.infoHash === torrent.infoHash);
    },

    addAlbumToPlaylist(torrent) {
        this.get('playlistSelected.albums').push(
            {
                "infoHash": torrent.infoHash,
                "name": torrent.name,
                "magnetURI": torrent.magnetURI,
                "files": []
            }
        );
    },

    removeFileFromPlaylist(album, fileName) {
        const index = album.files.indexOf(fileName);
        if (index > -1) {
            album.splice(index, 1);
        }
    },

    addFileToPlaylist(album, fileName) {
        album.files.push(fileName);
    },


    savePlaylist(name) {
        let playlist = this.get('playlists').find((el) => el.name === name);
        return JSON.stringify(playlist, null, "\t");
    },
});

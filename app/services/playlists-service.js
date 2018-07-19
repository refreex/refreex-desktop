import Service from '@ember/service';
import { computed } from '@ember/object';

// const playlists = [];

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('playlists', []);
        this.set('activePlaylistName', 'default');
        this.createPlaylist('default');
    },

    getPlaylistSelected( ) {
        return this.get('playlists').find((el) => el.name === this.get('activePlaylistName'));
    },

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

    getAlbumFromPlaylist(album) {
        const playlist = this.getPlaylistSelected();
        if (playlist.albums.length > 0) {
            return playlist.albums.find((el) => el.infoHash === album.infoHash);
        }
    },

    addAlbumToPlaylist(torrent) {
        const playlist = this.getPlaylistSelected();
        playlist.albums.push(
            {
                "infoHash": torrent.infoHash,
                "name": torrent.name,
                // "magnetURI": torrent.magnetURI,
                "files": []
            }
        );
    },

    removeSongFromPlaylist(torrent, file) {
        let album = this.getAlbumFromPlaylist(torrent);
        const index = album.files.indexOf(file.name);
        if (index > -1) {
            album.files.splice(index, 1);
        }
    },

    addSongToPlaylist(torrent, file) {
        let album = this.getAlbumFromPlaylist(torrent);

        if (!album) {
            this.addAlbumToPlaylist(torrent)
            album = this.getAlbumFromPlaylist(torrent);
        }

        album.files.push(file.name);
    },


    savePlaylist(name) {
        let playlist = this.get('playlists').find((el) => el.name === name);
        console.log(playlist, name);
        console.log(JSON.stringify(playlist, null, "\t"));
        // return JSON.stringify(playlist, null, "\t");
    },
});

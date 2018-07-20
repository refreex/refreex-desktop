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

    removeAlbumFromPlaylist(album){
        const playlist = this.getPlaylistSelected();
        const index = playlist.albums.findIndex((el) => el.name === album.name);

        if (index > -1) {
            playlist.albums.splice(index, 1);
        }
    },

    removeSongFromPlaylist(torrent, file) {
        let album = this.getAlbumFromPlaylist(torrent);

        const index = album.files.indexOf(file.name);
        if (index > -1) {
            album.files.splice(index, 1);
        }

        //If there is no more songs in the album remove album from playlist
        if (album.files.length === 0) {
            this.removeAlbumFromPlaylist(album);
        }
    },

    addSongToPlaylist(torrent, file) {
        let album = this.getAlbumFromPlaylist(torrent);

        //If album not exist on playlist add it.
        if (!album) {
            this.addAlbumToPlaylist(torrent)
            album = this.getAlbumFromPlaylist(torrent);
        }

        album.files.push(file.name);
    },


    savePlaylist(name) {
        let playlist = this.get('playlists').find((el) => el.name === name);
        console.log(JSON.stringify(playlist, null, "\t"));
        // return JSON.stringify(playlist, null, "\t");
    },
});
// magnet:?xt=urn:btih:ba7e0ba8e40981e71f7cdd87336c7eb99dd530e3&dn=Imagine+Dragons+-+Night+Visions+%28Deluxe+Version%29+2013+Indie+Rock&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969
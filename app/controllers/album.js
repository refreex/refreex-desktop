import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
    webtorrentService: service(),
    playlistsService: service(),
    album: alias('model'),

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

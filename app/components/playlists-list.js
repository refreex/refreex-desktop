import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin, {
    playlistsService: service(),

    playlists: computed('playlistsService.playlists.[]', function(){
        return this.get('playlistsService.playlists');
    }),

    actions: {

        createPlaylist(value) {
            this.get('playlistsService').createPlaylist(value);
        },

        selectPlaylist(value) {
            this.get('playlistsService').setActivePlaylist(value);
        },

        downloadPlaylist(value) {
            let content = this.get('playlistsService').savePlaylist(value);
            this.saveFileAs(value, content, "text/plain, application/json");
        },

    },
});

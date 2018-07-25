import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin, {
    playlistsService: service(),
    tagName: 'div',
    classNames: ['content__left'],

    init() {
        this._super(...arguments);
    },


    playlists: computed('playlistsService.playlists.[]', function(){
        return this.get('playlistsService.playlists');
    }),

    isOpen: true,
    isFormAddPlaylistOpen: false,

    actions: {
        togglePlaylistList() {
            this.toggleProperty('isOpen');
        },

        toggleAddPlaylistsForm() {
            this.toggleProperty('isFormAddPlaylistOpen');
        },

        createPlaylist(value) {
            if (value) {
                this.get('playlistsService').createPlaylist(value);
                this.set('formPlaylistName', '');
                this.send('toggleAddPlaylistsForm');
            }
        },

        removePlaylist(value) {
            this.get('playlistsService').removePlaylist(value)
        },

        selectPlaylist(value) {
            this.get('playlistsService').setActivePlaylist(value);
        },

        downloadPlaylist(value) {
            let content = this.get('playlistsService').savePlaylist(value);
            // this.saveFileAs(value, content, "text/plain, application/json");
        },

    },

});

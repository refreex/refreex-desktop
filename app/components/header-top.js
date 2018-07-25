import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin, {
    tagName: 'section',
    classNames: ['header'],

    webtorrentService: service(),

    init() {
        this._super(...arguments);
        // this.set('torrentMagnetLink', 'magnet:?xt=urn:btih:a88fda5954e89178c372716a6a78b8180ed4dad3&dn=The+WIRED+CD+-+Rip.+Sample.+Mash.+Share&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F');
        this.set('torrentMagnetLink', 'magnet:?xt=urn:btih:488e92705ff269cf6a422c02deaf04573d4ead28&dn=Carlos+Gardel+-+The+Best+of+Carlos+Gardel+(Big+Papi)+Argentina+Tango+1930s&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com');
    },

    ratio: computed('webtorrentService.ratio', function() {
        return this.get('webtorrentService').ratio;
    }),

    downloadSpeed: computed('webtorrentService.downloadSpeed', function() {
        return this.get('webtorrentService').downloadSpeed;
    }),

    uploadSpeed: computed('webtorrentService.uploadSpeed', function() {
        return this.get('webtorrentService').uploadSpeed;
    }),

    progress: computed('webtorrentService.progress', function() {
        return this.get('webtorrentService').progress;
    }),

    actions: {

        addTorrent(torrentMagnetLink){
            this.get('webtorrentService').addTorrent(torrentMagnetLink);
        },

        saveAllTorrents(){
            let content = this.get('webtorrentService').saveAllTorrentsMagnetLink();
            this.saveFileAs('nameFile', content, "text/plain, application/json");
        },

    },
});

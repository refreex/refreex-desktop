import Route from '@ember/routing/route';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const mediaExtensions = {
    audio: ['.aac', '.asf', '.flac', '.m2a', '.m4a', '.mp2', '.mp4', '.mp3', '.oga', '.ogg', '.opus',
        '.wma', '.wav', '.wv', '.wvp'],
    image: ['.gif', '.jpg', '.jpeg', '.png']
};

export default Route.extend({
    webtorrentService: service(),

    beforeModel(transition){
        const album = this.get('webtorrentService').getTorrent(transition.params.album.info_hash);
        if (!album) {
            this.transitionTo('/');
        }

    },

    model(params) {
        const album = this.get('webtorrentService').getTorrent(params.info_hash);
        const files = this.filterOnExtension(album, mediaExtensions.audio);

        return {
            name: album.name,
            files: files,
            // downloadSpeed: torrent.downloadSpeed,
            // posterFile: posterFile[0] || null,
            infoHash: album.infoHash,
        }
    },

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

});

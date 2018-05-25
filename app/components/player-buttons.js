import Component from '@ember/component';


export default Component.extend({
    init() {
        this._super(...arguments);
        console.log(1);
        var client = new WebTorrent(); // eslint-disable-line no-undef
        //VIDEO:
        // var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

        //Music
        var torrentId = 'magnet:?xt=urn:btih:3f3ebfba71081257f9ffb5fd2a63e58679551da9&dn=The+Doors+-+The+Best+Of+The+Doors&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'

        client.add(torrentId, function (torrent) {
            // console.log(torrent.files);
            // // Torrents can contain many files. Let's use the .mp4 file
            // var file = torrent.files.find(function (file) {
            //     console.log(file)
            //     return file.name.endsWith('.mp3')
            // })

            this.set('example', torrent.files);

            // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
            // file.appendTo('body')
        })
        console.log(2,2 ,this.get('example'));
    }
});

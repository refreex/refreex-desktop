import Service from '@ember/service';
import EmberObject from '@ember/object';
import $ from 'jquery';

export default Service.extend({
    torrents: [],
    init() {
        this._super(...arguments);
        const client = new WebTorrent(); // eslint-disable-line no-undef
        console.log(client)
        this.set('client', client);
        this.loadTorrentsFromFile();

        const getSet = () => {
            this.setProperties({
                ready: client.ready,
                downloadSpeed: client.downloadSpeed,
                uploadSpeed: client.uploadSpeed,
                ratio: client.ratio,
                progress: client.progress,
                enableWebSeeds: client.enableWebSeeds,
                maxConns: client.maxConns,
            });
            setTimeout(getSet, 1000);
        };
        setTimeout(getSet, 1000);
    },

    getClient() {
        return this.get("client");
    },

    addTorrent(magnetURI) {

        let torrentInfo = EmberObject.create({
            magnetURI: magnetURI,
            files: []
        });

        this.get('client').add(magnetURI, (torrent) => {
            console.log('Client is downloading:', torrent.infoHash);

            torrent.files.forEach(function (file) {
                file.appendTo('body');
            });

            this.get('torrents').push(torrentInfo);
        })
    },

    loadTorrentsFromFile() {
        $.getJSON("database.json")
        .then((response) => {
            response.forEach((torrent) => {
                this.addTorrent(torrent.magnetURI)
            });
        });
    },

    saveAllTorrentsMagnetLink() {
        let magnetLinks = [];
        this.get('client').torrents.forEach((torrent) => {
            magnetLinks.pushObject({
                hash: torrent.infoHash,
                name: torrent.name,
                magnetURI: torrent.magnetURI
            });
        });

        return JSON.stringify(magnetLinks, null, "\t"); 
    },

});

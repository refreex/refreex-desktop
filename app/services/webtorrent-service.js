import Service from '@ember/service';
import WebTorrent from 'npm:webtorrent-hybrid';
const fs = requireNode("fs");
// const crypto = requireNode('crypto');
// const zeroFill = requireNode('zero-fill');
// const defaultAnnounceList = requireNode('create-torrent');

let client = new WebTorrent();


export default Service.extend({

    init() {
        this._super(...arguments);
        this.addObserver('ready', this, 'isClientReady');
        this.getPropertiesClientEverySecond();
    },

    isClientReady() {
        if (client && client.ready === true) {
            this.set('torrents', []);
            this.loadTorrentsFromDatabase();
        }
    },

    getPropertiesClientEverySecond() {
        //TODO: Create something accurate..
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

    addTorrent(magnetURI) {
        client.add(magnetURI, (torrent) => {
            // Got torrent metadata!
            console.log('Client is downloading:', torrent.infoHash);
        });

        const torrent = client.get(magnetURI);
        torrent.on('ready', () => {
            this.get('torrents').pushObject(torrent);
        });
    },

    addTorrentToDatabase(torrentInfo) {
        fetch('database.json')
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.push(torrentInfo))
        // .then(JsonToSaveOnFile => console.log(234, JsonToSaveOnFile))
    },

    loadTorrentsFromDatabase() {
        const database = JSON.parse(fs.readFileSync(`${__dirname}/database.json`, 'utf8'));
        database.forEach((object) => {
            this.addTorrent(object.magnetURI);
        });
    },

    saveAllTorrentsMagnetLink() {
        let magnetLinks = [];
        client.torrents.forEach((torrent) => {
            magnetLinks.pushObject({
                name: torrent.name,
                hash: torrent.infoHash,
                magnetURI: torrent.magnetURI
            });
        });

        return JSON.stringify(magnetLinks, null, "\t"); 
    },

});

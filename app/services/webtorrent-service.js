import Service from '@ember/service';
import WebTorrent from 'npm:webtorrent-hybrid';
const fs = requireNode("fs");
const prettyBytes = requireNode('prettier-bytes');

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
                downloadSpeed: prettyBytes(client.downloadSpeed),
                uploadSpeed: prettyBytes(client.uploadSpeed),
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

        // torrent.on('done', () => {
        //
        //     const torrent = this.get('torrents').find(x => x.infoHash === torrent.infoHash);
        //
        // });
    },

    addTorrentToDatabase(torrentInfo) {
        const database = JSON.parse(fs.readFileSync(`${__dirname}/database.json`, 'utf8'));
        database.push(torrentInfo);

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

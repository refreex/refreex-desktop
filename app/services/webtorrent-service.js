import Service from '@ember/service';
import { computed  } from '@ember/object'

const client = new WebTorrent(); // eslint-disable-line no-undef

export default Service.extend({
    init() {
        this._super(...arguments);
        this.getPropertiesClientEverySecond();
        this.addObserver('ready', this, 'isClientReady');
    },

    isClientReady() {
        if (client && client.ready === true) {
            this.loadTorrentsFromDatabase();
            this.get('albums');
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
                torrents: client.torrents,
                torrentsLength: client.torrents.length,
            });
            setTimeout(getSet, 1000);
        };
        setTimeout(getSet, 1000);
    },

    addTorrent(magnetURI) {
        client.add(magnetURI, (torrent) => {
            // Got torrent metadata!
            console.log('Client is downloading:', torrent.infoHash)
        });

        const torrent = client.get(magnetURI);
        torrent.on('ready', function(){
            return torrent;
        });
    },

    addTorrentToDatabase(torrentInfo) {
        fetch('database.json')
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.push(torrentInfo))
        .then(JsonToSaveOnFile => console.log(234, JsonToSaveOnFile))
    },

    loadTorrentsFromDatabase() {
        fetch("database.json")
        .then((response) => {

            if (response.status !== 200) {
                console.error('Problem Reading the Database. Status Code: ' + response.status);
                return;
            }

            response.json().then((data) => {
                data.forEach((object) => {
                    this.addTorrent(object.magnetURI);
                });
            });

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

import Service from '@ember/service';

const client = new WebTorrent(); // eslint-disable-line no-undef

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('torrents', []);
        this.set('client', client);
        this.loadTorrentsFromDatabase();

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
        return client;
    },

    async addTorrent(magnetURI) {
        let filesIncludedInTorrent = [];
        let nameTorrent, infoHash;

        await client.add(magnetURI, (torrent) => {
            console.log('Client is downloading:', torrent.infoHash, torrent.name);
            torrent.on('infoHash', function(){
                console.log('why')
            });

            nameTorrent = torrent.name;
            infoHash = torrent.infoHash;

            torrent.files.forEach((file) => {
                filesIncludedInTorrent.push(file);
            });

            torrent.on('metadata', () => {
                console.log('metada.')
            })

            torrent.on('ready', () => {
                console.log(2, nameTorrent, infoHash)
                this.get('torrents').push({
                    name: nameTorrent,
                    infoHash: infoHash,
                    magnetURI: magnetURI,
                    files: filesIncludedInTorrent,
                });
            })

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
                data.forEach((torrent) => {
                    this.addTorrent(torrent.magnetURI)
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

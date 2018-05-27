import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import $ from 'jquery';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('client', new WebTorrent()); // eslint-disable-line no-undef
        this.set('torrents', []);
        this.loadTorrentsFromFile();
    },

    downloadSpeed: computed('client.downloadSpeed', function(){
        return this.get("client").downloadSpeed;
    }),

    ratio: computed('client.ratio', function(){
        return this.get("client").ratio;
    }),

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
            torrentInfo.name = torrent.name;

            torrent.files.forEach(function (file) {

                torrentInfo.files.push({
                    name: file.name,
                    path: file.path,
                });

                file.appendTo('body');

                // let element = document.createElement('div');
                // element.setAttribute("class", file.name);
                // document.body.appendChild(element);
                // console.log(document.getElementsByClassName(`${file.name}`))
                //
                // file.appendTo(`${file.name}`, function (err, elem) {
                //     if (err) throw err // file failed to download or display in the DOM
                //     console.log('New DOM node with the content', elem)
                // })

            });

            this.get('torrents').push(torrentInfo);
        })
    },

    //
    // getDownloadSpeed(){
    //     return this.get('client').downloadSpeed;
    // },
    //
    // getUploadSpeed(){
    //     return this.get('client').uploadSpeed;
    // },

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

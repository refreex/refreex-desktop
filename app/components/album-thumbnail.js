import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.set('11', this.get('torrent').files);

    },

    didRender() {
        document.createElement("b").innerHTML = "jQuery!";
    },

    // cover: computed('11', function () {
    //     console.log( this.get('11'))
    //     this.get('11').files.forEach((file) => {
    //         // console.log(file.name)
    //         // let fileNameToCompare = file.name;
    //         // fileNameToCompare = fileNameToCompare.toString();
    //         // console.log(fileNameToCompare);
    //         //
    //         //
    //         // let extension = fileNameToCompare.split('.').pop();
    //         // if (extension === 'jpg') {
    //         //     console.log(fileNameToCompare)
    //         // }r
    //
    //     });
    // })

});

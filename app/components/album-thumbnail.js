import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    init() {
        this._super(...arguments);
    },

    didRender() {
      this.get('cover');
    },

    le: 'lala',
    lala: computed('le', function(){
        return this.get('le') + 1;
    }),

    cover: computed('torrent.files', function () {
        let filename;
        this.get('torrent').files.forEach((file) => {
            let fileNameToCompare = file.name;
            fileNameToCompare = fileNameToCompare.toString();

            let extension = fileNameToCompare.split('.').pop();
            if (extension === 'jpg') {
                console.log(document)
                document.createElement("b").innerHTML = "jQuery!";
                // file.appendTo('234');
            }


        });
        return filename;
    }).readOnly()

});

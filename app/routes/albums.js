import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    webtorrentService: service(),


    model() {
        return [{
            name: 'jaja',
        }]
    },

});

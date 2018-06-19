import { searchAlbums } from '../src/search';

global.fetch = require('node-fetch');

const albums = searchAlbums('Muse');
albums.then(data => data.albums.items.map(item => console.log(item.name)));

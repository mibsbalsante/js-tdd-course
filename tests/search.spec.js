/* eslint-disable no-unused-expressions, no-unused-vars */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Spotify Wrapper', () => {
  let stubbedFetch;

  beforeEach(() => {
    stubbedFetch = sinon
      .stub(global, 'fetch')
      .returns(new Promise(() => {}));
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke tests', () => {
    // search (generic)
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Muse', 'artist');
        expect(stubbedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

        const albums = search('Muse', 'album');
        expect(stubbedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
      });

      context('passing more than one type', () => {
        const artistAndAlbums = search('Muse', ['artist', 'album']);
        expect(stubbedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist,album');
      });
    });

    it('should return the JSON Data from the promise', () => {
      stubbedFetch.resolves({ json: () => ({ body: 'json' }) });

      const artists = search('Muse', 'artist');
      artists.then(resolveValue => (
        expect(resolveValue).to.be.eql({ body: 'json' })
      ));
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = searchAlbums('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      const albums2 = searchAlbums('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=album');
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchArtists('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = searchArtists('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=artist');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = searchTracks('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');

      const tracks2 = searchTracks('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const playlists = searchPlaylists('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');

      const playlists2 = searchPlaylists('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=playlist');
    });
  });
});

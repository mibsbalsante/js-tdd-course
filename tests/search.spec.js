/* eslint-disable no-unused-expressions, no-unused-vars */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Search', () => {
  let spotify;
  let stubbedFetch;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'token' });
    stubbedFetch = sinon
      .stub(global, 'fetch')
      .returns(new Promise(() => {}));
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(spotify.search).to.exist;
    });

    it('should exist the spotify.search.method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = spotify.search.albums('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      const albums2 = spotify.search.albums('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=album');
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = spotify.search.artists('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = spotify.search.artists('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=artist');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = spotify.search.tracks('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');

      const tracks2 = spotify.search.tracks('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Muse');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const playlists = spotify.search.playlists('Muse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');

      const playlists2 = spotify.search.playlists('Radiohead');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Radiohead&type=playlist');
    });
  });
});

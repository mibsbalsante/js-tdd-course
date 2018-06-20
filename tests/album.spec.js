/* eslint-disable no-unused-expressions, no-unused-vars */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
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

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbum('6orek0p1f4UT2bPXH1GUcu');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6orek0p1f4UT2bPXH1GUcu');

      const album2 = spotify.album.getAlbum('36s31NvhzEC7SiUgmhYtY3');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/36s31NvhzEC7SiUgmhYtY3');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const album = spotify.album.getAlbum('6orek0p1f4UT2bPXH1GUcu');
      album.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = spotify.album.getAlbums(['6orek0p1f4UT2bPXH1GUcu', '36s31NvhzEC7SiUgmhYtY3']);
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=6orek0p1f4UT2bPXH1GUcu,36s31NvhzEC7SiUgmhYtY3');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const albums = spotify.album.getAlbums(['6orek0p1f4UT2bPXH1GUcu', '36s31NvhzEC7SiUgmhYtY3']);
      albums.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getTracks();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = spotify.album.getTracks('6orek0p1f4UT2bPXH1GUcu');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6orek0p1f4UT2bPXH1GUcu/tracks');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const tracks = spotify.album.getTracks('6orek0p1f4UT2bPXH1GUcu');
      tracks.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });
});

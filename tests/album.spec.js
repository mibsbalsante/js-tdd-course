/* eslint-disable no-unused-expressions, no-unused-vars */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubbedFetch;

  beforeEach(() => {
    stubbedFetch = sinon
      .stub(global, 'fetch')
      .returns(new Promise(() => {}));
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbuum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const album = getAlbum('6orek0p1f4UT2bPXH1GUcu');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6orek0p1f4UT2bPXH1GUcu');

      const album2 = getAlbum('36s31NvhzEC7SiUgmhYtY3');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/36s31NvhzEC7SiUgmhYtY3');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const album = getAlbum('6orek0p1f4UT2bPXH1GUcu');
      album.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const albums = getAlbums(['6orek0p1f4UT2bPXH1GUcu', '36s31NvhzEC7SiUgmhYtY3']);
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=6orek0p1f4UT2bPXH1GUcu,36s31NvhzEC7SiUgmhYtY3');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const albums = getAlbums(['6orek0p1f4UT2bPXH1GUcu', '36s31NvhzEC7SiUgmhYtY3']);
      albums.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const tracks = getAlbumTracks('6orek0p1f4UT2bPXH1GUcu');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/6orek0p1f4UT2bPXH1GUcu/tracks');
    });

    it('should return the correct data from the Promise', () => {
      stubbedFetch.resolves({ json: () => ({ album: 'name' }) });

      const tracks = getAlbumTracks('6orek0p1f4UT2bPXH1GUcu');
      tracks.then(resolvedValue => (
        expect(resolvedValue).to.be.eql({ album: 'name' })
      ));
    });
  });
});

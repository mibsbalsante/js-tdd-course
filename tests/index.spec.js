/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({ apiURL: 'url' });
    expect(spotify.apiURL).to.be.equal('url');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({ token: 'mytoken' });
    expect(spotify.token).to.be.equal('mytoken');
  });

  describe('request method', () => {
    let stubbedFetch;

    beforeEach(() => {
      stubbedFetch = sinon
        .stub(global, 'fetch')
        .returns(new Promise(() => {}));
    });

    afterEach(() => {
      stubbedFetch.restore();
    });

    it('it should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({ token: 'mytoken' });

      spotify.request('url');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed', () => {
      const spotify = new SpotifyWrapper({ token: 'mytoken' });

      spotify.request('url');
      expect(stubbedFetch).to.have.been.calledWith('url');
    });

    it('should call fetch with right headers passed', () => {
      const spotify = new SpotifyWrapper({ token: 'mytoken' });
      const headers = {
        headers: {
          Authorization: 'Bearer mytoken',
        },
      };

      spotify.request('url');
      expect(stubbedFetch).to.have.been.calledWith('url', headers);
    });
  });
});

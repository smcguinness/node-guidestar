var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;

var Guidestar = require("../");
var config = require("./config");

chai.use(chaiAsPromised);

describe('Guidestar', function(){
  describe('Instantiate Guidestar', function(){
    before(function(done){
      this.guidestar = new Guidestar(config);
      done();
    });
    describe('Charity Check', function(){
      it('should take an EIN of type string', function(){
        var ein = '54-1774039';
        return expect(this.guidestar.charityCheck(ein)).to.be.a('promise');
      });
      it('should allow for an API Key to be passed in for authentication', function(){
        var ein = '54-1774039';
        return expect(this.guidestar.charityCheck(ein, { charityCheckAPIKey: config.charityCheckAPIKey })).to.be.a('promise');
      });
      it('should eventually return an object', function(){
        var ein = '54-1774039';
        return expect(this.guidestar.charityCheck(ein)).to.eventually.be.an('object');
      });
    })
    describe('Detail', function(){
      it('should take an Organization ID of type string', function(){
        var orgId = '7831216';
        return expect(this.guidestar.detail(orgId)).to.eventually.be.an('object');
      });
      it('should allow for an API Key to be passed in for authentication', function(){
        var orgId = '7831216';
        return expect(this.guidestar.detail(orgId, { detailAPIKey: config.detailAPIKey })).to.be.a('promise');
      });
      it('should eventually return an object', function(){
        var orgId = '7831216';
        return expect(this.guidestar.detail(orgId)).to.eventually.be.an('object');
      });
    })
    describe('Exchange', function(){
      it('should take an Organization ID of type string', function(){
        var orgId = '7831216';
        return expect(this.guidestar.exchange(orgId)).to.be.a('promise');
      });
      it('should allow for an API Key to be passed in for authentication', function(){
        var orgId = '7831216';
        return expect(this.guidestar.exchange(orgId, { exchangeAPIKey: config.exchangeAPIKey })).to.be.a('promise');
      });
      it('should eventually return an object', function(){
        var orgId = '7831216';
        return expect(this.guidestar.exchange(orgId)).to.eventually.be.an('object');
      });
    })
    describe('Search', function(){
      it('should take an array', function(){
        var query = [{ organization_name: 'dallas' }];
        return expect(this.guidestar.search(query)).to.be.a('promise');
      });
      it('should take an object', function(){
        var query = { organization_name: 'dallas' };
        return expect(this.guidestar.search(query)).to.be.a('promise');
      });
      it('should take a string', function(){
        var query = 'dallas';
        return expect(this.guidestar.search(query)).to.be.a('promise');
      });
      it('should perform AND operations', function(){
        var query = [{ organization_name: 'dallas' }, { city: 'dallas' }];
        return expect(this.guidestar.search(query)).to.be.a('promise');
      });
      it('should perform OR operations', function(){
        var query = [{ city: ['dallas', 'ft. worth'] }];
        return expect(this.guidestar.search(query)).to.be.a('promise');
      });
      it('should allow for an API Key to be passed in for authentication', function(){
        var query = [{ organization_name: 'dallas' }];
        return expect(this.guidestar.search(query, { searchAPIKey: config.searchAPIKey })).to.be.a('promise');
      });
      it('should eventually return an object', function(){
        var query = [{ organization_name: 'dallas' }];
        return expect(this.guidestar.search(query)).to.eventually.be.an('object');
      });
    })
  });
})

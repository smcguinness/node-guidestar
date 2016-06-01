var fetch = require('node-fetch'),
    luceneQuery = require('lucene-query-generator');

function get(url, apiKey){
  return fetch(url, {
    method: 'GET',
    'headers': {
      'Authorization': 'Basic '+ new Buffer(apiKey + ':x').toString('base64'),
    },
  })
  .then(function(res) {    
    if (!res.ok) {
      throw new Error("It is broken");
    }
    return res.json();
  });
}

function Guidestar(/*username, password,*/options){
    this.defaults = {
      environment: process.env.NODE_ENV || 'development',
      prodUrl: 'https://data.guidestar.org',
      sandboxUrl: 'https://Sandboxdata.guidestar.org',
      charityCheckAPIKey: null,
      charityCheckVersion: 'v1',
      charityCheckEndpoint: '/charitycheck',
      detailAPIKey: null,
      detailVersion: 'v1',
      detailEndpoint: '/detail',
      exchangeAPIKey: null,
      exchangeVersion: 'v3',
      exchangeEndpoint: '/exchange',
      searchAPIKey: null,
      searchVersion: 'v1_1',
      searchEndpoint: '/search',
    }

    /*
      Logic for hanlding username and password. Can't decide if I want to offer the option.
      Commented out for now. Still needs work.
    */
    /*if(typeof username === 'object' && !password && !options){
      options = username;
    }
    else if(!password && !options && typeof password === 'object') {
      options = password
    } else if(typeof username === 'string' && typeof password === 'string' && password){
      this.defaults.auth = new Buffer(username + ':' + (typeof password !== 'object' ? password: 'x')).toString('base64');
      warn(
        'While username and password are still accepted, Guidestar' +
        'is moving to API keys. For more information, please go to' +
        'http://learn.guidestar.org/products/business-solutions/guidestar-apis.');
    }*/

    this.options = Object.assign({}, this.defaults, options);
    this.options.rootUrl = this.options.environment !== 'development' ? this.options.prodUrl : this.options.sandboxUrl;
}


Guidestar.prototype.charityCheck = function(EIN, opts){
  var apiKey = this.options.charityCheckAPIKey || opts.key;

  if(!apiKey)
    throw new Error('Guidestar was not instantiated with credentials and no credentials were passed in to Search.');

  return get(this.options.rootUrl+'/'+this.options.charityCheckVersion+this.options.charityCheckEndpoint+'/'+EIN, apiKey)
  .then(function(json){
    return json;
  });
};

Guidestar.prototype.detail = function(orgID, opts){
  var apiKey = this.options.detailAPIKey || opts.key;

  if(!apiKey)
    throw new Error('Guidestar was not instantiated with credentials and no credentials were passed in to Search.');

  return get(this.options.rootUrl+'/'+this.options.detailVersion+this.options.detailEndpoint+'/'+orgID, apiKey)
  .then(function(json){
    return json;
  });
};

Guidestar.prototype.exchange = function(orgID, opts){
  var apiKey = this.options.exchangeAPIKey || opts.key;

  if(!apiKey)
    throw new Error('Guidestar was not instantiated with credentials and no credentials were passed in to Search.');

  return get(this.options.rootUrl+'/'+this.options.exchangeVersion+this.options.exchangeEndpoint+'/'+orgID, apiKey)
  .then(function(json){
    return json;
  });
};

Guidestar.prototype.search = function(query, opts){
  var fields = [
    'organization_id',
    'ein',
    'organization_name',
    'mission',
    'city',
    'state',
    'zip',
    'nteecode',
    'participation',
    'public_report',
    'irs_subsection',
    'irs_foundation_code',
    'msa',
    'logo_url',
    'national_hq',
    'website',
    'parents',
    'bmf',
    'pub78',
    'revocation',
    'online_giving_flag',
  ];

  opts = opts || {};
  var results = opts.results || 25;
  var page = opts.page || 1;

  var apiKey = this.options.searchAPIKey || opts.key;

  if(!apiKey)
    throw new Error('Guidestar was not instantiated with credentials and no credentials were passed in to Search.');

  // Handle query if passed in as a string or object
  if(!Array.isArray(query))
    query = [ query, ];

  // Validate fields if query isn't a string
  if(typeof query[0] !== 'string'){
    query.forEach(function(q){
      Object.keys(q).forEach(function(key) {
        if(fields.indexOf(key) < 0)
          throw new Error(key +' is not an allowed search field');
      });
    });
  }

  var operands = { 
    $operands: query, 
  };
  
  var q = luceneQuery.convert(operands);
  
  return get(this.options.rootUrl+'/'+this.options.searchVersion+this.options.searchEndpoint+'/?q='+q+'&r='+results+'&p='+page, apiKey)
  .then(function(json){
    return json;
  });
};




module.exports = Guidestar;

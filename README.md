# node-guidestar
An API wrapper for the Guidestar API. More information on the Guidestar API can be found at https://community.guidestar.org/groups/developer.

# Get Started
```javascript
npm install --save node-guidestar
```
# Usage
```javascript
var Guidestar = require('node-guidestar');
var options = {...}
var guidestar = new Guidestar(options);
```

# Authentication
At this time, Guidestar requires each service to have a separate API key. There are two ways to pass authentication.

### At initialization (recommended)
```javascript
var guidestar = new Guidestar({ searchAPIKey: 'api-key' });
```
### On method call
```javascript
var guidestar = new Guidestar();
guidestar.search('dallas', { key: 'api-key' });
```
__**Note:**__ Guidestar allows authentication via username and password, however, the decision was made not to support this at this time as it is not guaranteed to be supported in the future.

# Available Options [defaults]
* `environment`: process.env.NODE_ENV || 'development'
* `prodUrl`: https://data.guidestar.org
* `sandboxUrl`: https://Sandboxdata.guidestar.org
* `charityCheckAPIKey`: null
* `charityCheckVersion`: v1
* `charityCheckEndpoint`: /charitycheck
* `detailAPIKey`: null
* `detailVersion`: v1
* `detailEndpoint`: /detail
* `exchangeAPIKey`: null
* `exchangeVersion`: v3
* `exchangeEndpoint`: /exchange
* `searchAPIKey`: null
* `searchVersion`: v1_1
* `searchEndpoint`: /search

# API
**Important** - All methods return a promise containing json. You'll need to catch and handle any errors.

## Charity Check
Search by string value representing EIN number.
```javascript
var ein = '54-1774039';
guidestar.charityCheck(ein).then(function(json){ res.json(json) });
```

## Search
Guidestar search is powered by Lucene, which allows for robust querys to be written. At this time full text, parameterized, and AND/OR queries are supported.

### Basic Search (full-text) [string]
```javascript
var query = 'dallas';
guidestar.search(query).then(function(json){ res.json(json) });
```
### Search By field name [object(key:value)]
```javascript
var query = { organization_name: 'dallas' };
guidestar.search(query).then(function(json){ res.json(json) });
```
#### Available Fields
* organization_id
* ein
* organization_name
* mission
* city
* state
* zip
* nteecode
* participation
* public_report
* irs_subsection
* irs_foundation_code
* msa
* logo_url
* national_hq
* website
* parents
* bmf
* pub78
* revocation
* online_giving_flag

**Note** - An error is thrown on any field not in the above list.

### And Operator Search [array(object(key:value),object(key:value)...)]
```javascript
var query = [{ organization_name: 'dallas' }, { city: 'dallas' }];
guidestar.search(query).then(function(json){ res.json(json) });
```
### Or Operator Search [object(array(string,string...)]
```javascript
var query = { city: ['dallas', 'ft. worth'] };
guidestar.search(query).then(function(json){ res.json(json) });
```

# Details
Search by string value representing the Guide Star organization_id.
```javascript
var orgId = '54-1774039';
guidestar.details(orgId).then(function(json){ res.json(json) });
```

# Exchange
Search by string value representing the Guide Star organization_id.
```javascript
var orgId = '54-1774039';
guidestar.exchange(orgId).then(function(json){ res.json(json) });
```

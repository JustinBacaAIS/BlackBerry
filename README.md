# BlackBerry
BlackBerry

## Variables
The follow variables need to be modified according to organizational requirements

```javascript
    var proxyPortHTTP;
    var proxyPortHTTPS;
    var proxyPortDefault;

    var proxyHostNameHTTP;
    var proxyHostNameHTTPS;
    var proxyHostNameDefault;

    var exemptLocalHostNames;
    var exemptDomainNames;
    var exemptHostWildCards;
    var exemptUrlWildCard;
    var exemptHostIPAddresses;
    var exemptSrcIPAddresses;

    var proxyToNetworkMap;
```

### Variable Specifics
* proxyPort*
  1. The declared variables are for HTTP & HTTPS, if support for other protocols is needed declare additional variables and assign them accordingly in the section labeled
**Set the Proxy Port based on Protocol**
* proxyHostName*
  1. Declare a variable for each proxy by protocol or geographic location.  These variables are then used in the mapping of proxy to network in the variable **proxyToNetworkMap**.
* proxyToNetworkMap
  1. This is an array of objects.  
    1. Each object has two elements (proxies and networks).
      1. proxies is an array of strings so more than one proxyHostName* can be assigned to an array of networks.
      2. custom proxy strings can also be added to the proxies array element.

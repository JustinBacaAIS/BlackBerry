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
*proxyPort*
  1. The declared variables are for HTTP & HTTPS, if support for other protocols is needed declare additional variables and assign them accordingly in the section labeled
**Set the Proxy Port based on Protocol**
*proxyHostName*

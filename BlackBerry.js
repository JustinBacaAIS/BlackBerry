/* 
 * Organization:
 * Contributor: Justin Baca
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function FindProxyForURL(url, host){
    /* Get Host IP */
    var hostIP = dnsResolve(host);
    
    /* Normalize the URL for pattern matching */
    url = url.toLowerCase();
    host = host.toLowerCase();
    
    /* Default PROXY port numbers */
    // EDIT ME
    var proxyPortHTTP = '8080';
    var proxyPortHTTPS = '8443';
    var proxyPortDefault = '8080';
    var proxyPortFinal = '';
    
    /* Declare PROXY hostname variables
     * Assign them accordingly in variable proxyToNetworkMap
     */    
    // EDIT ME
    var proxyHostNameHTTP = 'change.me.domain';
    var proxyHostNameHTTPS = 'change.me.domain';
    var proxyHostNameDefault = 'change.me.domain';
    //Declare additional proxyHostName* variables to support all proxies; one (var) for one (proxy)
    //Assign them accordingly in variable proxyToNetworkMap
    //var proxyHostNameSOME_LOCATION = 'CHANGE.ME.DOMAIN';
    //var proxyHostNameSOME_PROTOCOL = 'CHANGE.ME.DOMAIN';
    
    /* By pass proxy by destination
     * List of allowed local hostnames not using proxy; as an array of lowercase strings
     * hostnames in format 'myhostname' 
     */
    // EDIT ME
    var exemptLocalHostNames = [
        //Add Internal CAS Array Names Here
        //Add Any other Local Host Names Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        'changme',
        'homeport',
        'portal',
        'cas-name-array'
    ];
    
    /* By pass proxy by destination
     * List of allowed domains and domain names not using proxy; as an array of lowercase strings
     * domains in format '.domain.com'
     * domain names in format 'my.domain.com'
     */
    // EDIT ME
    var exemptDomainNames = [
        //Add Internal CAS Array Names Here
        //Add Any other Local Host Names Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        '.change.me.domain',
        'internal-cas-name-array.change.me.domain',
        'external-cas-name-array.change.me.domain'
    ];
    
    /* By pass proxy by destination
     * List of allowed domains and domain names not using proxy; as an array of lowercase strings
     * domains in format '.domain.com'
     * domain names in format 'my.domain.com'
     */
    // EDIT ME
    var exemptHostWildCards = [
        //Add Wild Card Host and Domain Names Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        '*.change.me.domain',
        '*.internal-cas-name-array.change.me.domain'
    ];
    
    /* By pass proxy by destination
     * List of allowed domains and domain names not using proxy; as an array of lowercase strings
     * domains in format '.domain.com'
     * domain names in format 'my.domain.com'
     */
    // EDIT ME
    var exemptUrlWildCard = [
        //Add Wild Card URL Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        'http://change.me.domain/*',
        'https://internal-cas-name-array.change.me.domain/folder/*'
    ];
    
    /* By pass proxy by destination
     * List of allowed IP Addresses and Subnets not using proxy; as an array of objects with string values
     * IP Addresses in format:
     * {
     *      'address': '1.1.1.1',
     *      'network': '255.0.0.0'
     * }
     */
    // EDIT ME
    var exemptHostIPAddresses = [
        //Add CAS Array IP Addresses Here
        //Add Any other IP Addresses Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        {
            'address': '0.0.0.0',
            'network': '255.0.0.0'
        },
        {
            'address': '10.0.0.0',
            'network': '255.0.0.0'
        },
        {
            'address': '127.0.0.0',
            'network': '255.0.0.0'
        },
        {
            'address': '169.254.0.0',
            'network': '255.255.0.0'
        },
        {
            'address': '172.16.0.0',
            'network': '255.240.0.0'
        },
        {
            'address': '192.0.2.0',
            'network': '255.255.255.0'
        },
        {
            'address': '192.88.99.0',
            'network': '255.255.255.0'
        },
        {
            'address': '192.168.0.0',
            'network': '255.255.0.0'
        },
        {
            'address': '198.18.0.0',
            'network': '255.254.0.0'
        },
        {
            'address': '224.0.0.0',
            'network': '240.0.0.0'
        },
        {
            'address': '240.0.0.0',
            'network': '240.0.0.0'
        }
    ];

    /* By pass proxy by source device
     * List of allowed IP Addresses not using proxy; as an array of string values
     * IP Addresses in format:
     * '1.1.1.1',
     * '2.2.2.2'
     */
    // EDIT ME
    var exemptSrcIPAddresses = [
        //Add CAS Array Source IP Addresses Here
        //Add Any other Source IP Addresses Here
        //Remove all to force a Proxy selection
        //EXAMPLES
        '1.1.1.1',
        '2.2.2.2'
    ];

    /* Don't proxy local hostnames */    
    if (isPlainHostName(host)){
        if(exemptLocalHostNames.length > 0){
            if(exemptLocalHostNames.indexOf(host) >= 0){
                return 'DIRECT';
            } //end if
        } //end if
    } //end if
    
    /* Don't proxy specific domains and domain names */
    if(exemptDomainNames.length > 0){
        for(var i =0;i < exemptDomainNames.length;i++){
            if(exemptDomainNames[i][0] == '.'){
                if(dnsDomainIs(host, exemptDomainNames[i])){
                    return 'DIRECT';
                } //end if
            } //end if
            else{
                if(host == exemptDomainNames[i]){
                    return 'DIRECT';
                } //end if
            } //end else
        } //end for
    } //end if

    /* Don't proxy specific non-routable addresses (RFC 3330) */
    if(exemptHostIPAddresses.length > 0){
        for(var i =0;i < exemptHostIPAddresses.length;i++){
            if(isInNet(hostIP, exemptHostIPAddresses[i].address, exemptHostIPAddresses[i].network)){
                return 'DIRECT';
            } //end if
        } //end for
    } //end if

    /* Don't proxy specific wild card host and domain names */
    if(exemptHostWildCards.length > 0){
        for(var i =0;i < exemptHostWildCards.length;i++){
            if(shExpMatch(host, exemptHostWildCards[i])){
                return 'DIRECT';
            } //end if
        } //end for
    } //end if

    /* Don't proxy specific wild card urls */
    if(exemptUrlWildCard.length > 0){
        for(var i =0;i < exemptUrlWildCard.length;i++){
            if(shExpMatch(host, exemptUrlWildCard[i])){
                return 'DIRECT';
            } //end if
        } //end for
    } //end if
    
    /* Don't proxy specific source device IP Address */
    if(exemptSrcIPAddresses.length > 0){
        for(var i =0;i < exemptSrcIPAddresses.length;i++){
            if(isInNet(myIPAddress(), exemptSrcIPAddresses[i].address, exemptSrcIPAddresses[i].network)){
                return 'DIRECT';
            } //end if
        } //end for
    } //end if
    
    
    /* Don't proxy local addresses.*/
    //Not used at this time
    /*if (false)
    {
        return 'DIRECT';
    }*/
    
    /* Proxy by source device
     * Map Proxy(ies) to IP Address Networks; as an array of objects
     * Objects in format:
     * {
     *      'proxies': [proxyPortHTTP],
     *      'networks': [
     *           {
     *               'address': '1.0.0.0',
     *               'network': '255.0.0.0'
     *           }
     *       ]
     * }
     */
    // EDIT ME
    var proxyToNetworkMap = [
        //Add CAS Array IP Addresses Here
        //Add Any other Source Device IP Addresses Here
        //Remove all to force Default Proxy selection
        //EXAMPLES
        {
            'proxies': [proxyPortHTTP],
            'networks': [
                {
                    'address': '1.0.0.0',
                    'network': '255.0.0.0'
                }
            ]
        },
        {
            'proxies': [proxyPortHTTP, proxyPortHTTPS, 'my.custom.tertiary.proxy'],
            'networks': [
                {
                    'address': '2.0.0.0',
                    'network': '255.0.0.0'
                },
                {
                    'address': '2.0.0.0',
                    'network': '255.0.0.0'
                }
            ]
        }
    ];
    
    /* Set the Proxy Port based on Protocol */
    if(url.substring(0,5) == 'http:'){
        proxyPortFinal = proxyPortHTTP;
    }
    else if(url.substring(0,6) == 'https:'){
        proxyPortFinal = proxyPortHTTPS;
    }
    else{
        proxyPortFinal = proxyPortDefault;
    }
    
    /* Proxy specific source device IP Address */
    if(proxyToNetworkMap.length > 0){
        for(var i = 0;i < proxyToNetworkMap.length;i++){
            for(var j = 0;j < proxyToNetworkMap[i].networks.length;j++){
                if(isInNet(myIpAddress(), proxyToNetworkMap[i].networks[j].address, proxyToNetworkMap[i].networks[j].network)){
                    if(proxyToNetworkMap[i].proxies.length > 1){
                        var allProxies = ''
                        for(var k = 0;k < proxyToNetworkMap[i].proxies.length;k++){
                            if(k == (proxyToNetworkMap[i].proxies.length - 1)){
                                allProxies += "Proxy " + proxyToNetworkMap[i].proxies[0] + ":" + proxyPortFinal;
                            } //end if
                            else{allProxies += "Proxy " + proxyToNetworkMap[i].proxies[0] + ":" + proxyPortFinal + "; ";}
                        } //end for k
                        return allProxies;
                    } //end if
                    else{return "Proxy " + proxyToNetworkMap[i].proxies[0] + ":" + proxyPortFinal;}
                } //end if
            } //end for j
        } //end for i
    } //end if
    
    /* Set Default Proxy */
    return "PROXY " + proxyHostNameDefault + ":" + proxyPortFinal;
}
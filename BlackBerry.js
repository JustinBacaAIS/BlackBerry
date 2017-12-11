/* 
 * Organization:
 * Contributor: Justin Baca
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function FindProxyForURL(url, host){
    /* Default PROXY port numbers */
    var proxyPortHTTP = "8080";
    var proxyPortHTTPS = "8443";
    var proxyPortDefault = "8080";
    var proxyPortFinal = "";
    
    /* List of allowed local hostnames not using proxy as an array of lowercase strings
     * hostnames in format 'MyHostName' 
     */
    // EDIT ME
    var exemptLocalHostNames = []
    
    /* List of allowed domains and domain names not using proxy as an array of lowercase strings
     * domains in format '.domain.com'
     * domain names in format 'my.domain.com'
     */
    // EDIT ME
    var exemptDomainNames = []
    
    /* List of allowed IP Addresses and Subnets not using proxy as an array of objects with string values
     * IP Addresses in format:
     * {
     *      'address': '1.1.1.1',
     *      'network': '255.0.0.0'
     * }
     */
    // EDIT ME
    var exemptIPAddresses = [
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
        },
    ]
    
    
    /* Normalize the URL for pattern matching */
    url = url.toLowerCase();
    host = host.toLowerCase();

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
    if(exemptIPAddresses.length > 0){
        for(var i =0;i < exemptIPAddresses.length;i++){
            if(isInNet(hostIP, exemptIPAddresses[i].address,exemptIPAddresses[i].network)){
                return 'DIRECT';
            } //end if
        } //end for
    } //end if

    /* Don't proxy local addresses.*/
    /*if (false)
    {
        return 'DIRECT';
    }*/
    
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
}
/*
if (url.substring(0, 5) == 'http:' ||
        url.substring(0, 6) == 'https:' ||
        url.substring(0, 4) == 'ftp:')
{
return 'PROXY xyz1.example.com:8080';
}

return 'DIRECT';
}
{
if (isInNet(myIpAddress(), "10.1.0.0", "255.255.0.0"))
        { return "PROXY xyz1.example.com:8080; " +
                "PROXY xyz2.example.com:8080";
                }

if (isInNet(myIpAddress(), "10.2.0.0", "255.255.0.0"))
        { return "PROXY xyz1.example.com:8080; " +
                "PROXY xyz2.example.com:8080";
                }
if (isInNet(myIpAddress(), "10.3.0.0", "255.255.0.0"))
        { return "PROXY xyz2.example.com:8080; " +
                "PROXY xyz1.example.com:8080";
                }
if (isInNet(myIpAddress(), "10.4.0.0", "255.255.0.0"))
        { return "PROXY xyz2.example.com:8080; " +
                "PROXY xyz1.example.com:8080";
                }
else return "DIRECT";
        }
*/
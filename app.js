const DB_TOOLS = [
    { name: "Nmap", link: "https://nmap.org", desc: "Network Mapper per l'esplorazione di rete.", detailed: "Esegue la scansione dei pacchetti raw.", diag: "[Nmap Engine]" },
    { name: "Wireshark", link: "https://www.wireshark.org", desc: "Analizzatore di protocolli di rete.", detailed: "Cattura i pacchetti di rete.", diag: "[Wireshark Engine]" }
];

const Modules = {
    cryptoTransform: function(isEncode) {
        try {
            const schema = document.getElementById('crypto-schema').value;
            const input = document.getElementById('crypto-input').value;
            const out = document.getElementById('crypto-output');
            
            if(!input) throw new Error("Inserire una stringa di input.");

            let result = "";
            if(schema === 'base64') result = isEncode ? btoa(input) : atob(input);
            else if(schema === 'url') result = isEncode ? encodeURIComponent(input) : decodeURIComponent(input);
            else result = "Not implemented in simplified refactor";

            out.textContent = result; // Protezione DOM-XSS: uso di textContent
            out.className = "console-output";
        } catch(e) {
            const out = document.getElementById('crypto-output');
            out.textContent = "ERRORE: " + e.message;
            out.className = "console-output error";
        }
    },
    filterTools: function() {
        const q = document.getElementById('tool-search').value.toLowerCase();
        document.querySelectorAll('.tool-card').forEach(c => {
            c.classList.toggle('hidden', !c.getAttribute('data-name').includes(q));
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Navigazione
    document.getElementById('sidebar-nav').addEventListener('click', (e) => {
        if(!e.target.classList.contains('nav-btn')) return;
        document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(e.target.dataset.target).classList.add('active');
        e.target.classList.add('active');
    });

    // Event Listeners (Sostituzione onclick inline)
    document.getElementById('btn-crypto-encode').addEventListener('click', () => Modules.cryptoTransform(true));
    document.getElementById('btn-crypto-decode').addEventListener('click', () => Modules.cryptoTransform(false));
    document.getElementById('tool-search').addEventListener('keyup', Modules.filterTools);

    // Canvas Nebula Engine (semplificato)
    const canvas = document.getElementById('nebula-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
});

let state = 'cript';

function switchState()
{
    if(state === 'cript') state = 'decript';
    else if(state === 'decript') state = 'cript';
}

function ceasarCriptDecript(input)
{
    let output = '';
    // Funcție pentru criptare
    function encrypt(text, shift) {
        let result = "";

        // Parcugem fiecare caracter din text
        for (let i = 0; i < text.length; i++) {
            let char = text[i];

            // Criptăm doar literele mari și mici
            if (char >= 'A' && char <= 'Z') {
                // Pentru litere mari (A-Z)
                result += String.fromCharCode((char.charCodeAt(0) + shift - 65) % 26 + 65);
            } else if (char >= 'a' && char <= 'z') {
                // Pentru litere mici (a-z)
                result += String.fromCharCode((char.charCodeAt(0) + shift - 97) % 26 + 97);
            } else {
                // Orice alt caracter rămâne neschimbat
                result += char;
            }
        }

        return result;
    }

    // Funcție pentru decriptare (opusul criptării)
    function decrypt(text, shift) {
        return encrypt(text, 26 - shift); // Deplasăm invers
    }

    // Exemplu de utilizare
    let text = input; // Textul de criptat
    let shift = 4; // Cheia de criptare (deplasarea)

    let encrypted = encrypt(text, shift);
    let decrypted = decrypt(encrypted, shift);

    if(state === 'cript') output = encrypted;
    else if(state === 'decript') output = decrypted;

    document.getElementById('ceasarOutput').value = output;
}

function rsaCriptDecript(input)
{
    let output=''
    // Funcție pentru a calcula cel mai mare divizor comun (GCD)
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Funcție pentru a calcula (a^b) % c
    function modExp(a, b, c) {
        let result = 1;
        a = a % c;
        while (b > 0) {
            if (b % 2 === 1) {
                result = (result * a) % c;
            }
            b = Math.floor(b / 2);
            a = (a * a) % c;
        }
        return result;
    }

    // Funcție pentru a găsi inversul modular al lui e mod phi(n) folosind metoda extinsă Euclid
    function modInverse(e, phi) {
        let t = 0, newT = 1;
        let r = phi, newR = e;

        while (newR !== 0) {
            let quotient = Math.floor(r / newR);
            [t, newT] = [newT, t - quotient * newT];
            [r, newR] = [newR, r - quotient * newR];
        }

        if (t < 0) {
            t += phi;
        }

        return t;
    }

    // Funcție principală (simulează ce făcea main în C++)
    function rsa() {
        // Alegerea a două numere prime (pentru simplificare, sunt numere mici)
        const p = 61;
        const q = 53;

        // Calcularea lui n = p * q
        const n = p * q;

        // Calcularea funcției Euler φ(n) = (p-1) * (q-1)
        const phi = (p - 1) * (q - 1);

        // Alegerea cheii publice e, unde 1 < e < φ(n) și gcd(e, φ(n)) = 1
        let e;
        do {
            e = Math.floor(Math.random() * (phi - 2)) + 2; // e este ales aleator între 2 și phi - 1
        } while (gcd(e, phi) !== 1);

        // Calcularea cheii private d, astfel încât (d * e) % φ(n) = 1
        const d = modInverse(e, phi);

        // Afișarea cheilor publice și private
        console.log("Cheia publică: (" + e + ", " + n + ")");
        console.log("Cheia privată: (" + d + ", " + n + ")");

        // Mesajul de criptat (un număr mai mic decât n)
        // const mesaj = prompt("Introdu un mesaj numeric (mai mic decât " + n + "):");
        const mesaj = input;

        // Criptarea mesajului: C = M^e % n
        const criptat = modExp(Number(mesaj), e, n);

        // Decriptarea mesajului: M = C^d % n
        const decriptat = modExp(criptat, d, n);

        if(state === 'cript') output = criptat;
        else if(state === 'decript') output = decriptat;
    }

    // Apelarea funcției principale
    rsa();
    document.getElementById('rsaOutput').value = output;
}

function blowfishCriptDecript(input)
{
    let output = [];
    // Dimensiunea unui bloc în Blowfish (în octeți)
    const BLOCK_SIZE = 8;

    // S-Box-uri pentru Blowfish (inițializate cu valori fictive, trebuie înlocuite cu valori reale conform specificațiilor)
    let S = [
        new Array(256).fill(0), // S-Box 1
        new Array(256).fill(0), // S-Box 2
        new Array(256).fill(0), // S-Box 3
        new Array(256).fill(0)  // S-Box 4
    ];

    // P-array pentru Blowfish (valori inițiale care vor fi modificate de cheie)
    let P = [
        0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344,
        0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89,
        0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C,
        0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917,
        0x9216D5D9, 0x8979FB1B
    ];

    // Funcția F a algoritmului Blowfish
    function F(x) {
        let a = (x >>> 24) & 0xFF;
        let b = (x >>> 16) & 0xFF;
        let c = (x >>> 8) & 0xFF;
        let d = x & 0xFF;

        return (((S[0][a] + S[1][b]) ^ S[2][c]) + S[3][d]) >>> 0;
    }

    // Cifrul Blowfish - rotirea blocurilor de date
    function BlowfishEncrypt(left, right) {
        for (let i = 0; i < 16; i++) {
            left ^= P[i];
            right ^= F(left);
            [left, right] = [right, left]; // Swap
        }
        [left, right] = [right, left]; // Inversare finală
        right ^= P[16];
        left ^= P[17];

        return { left: left >>> 0, right: right >>> 0 };
    }

    // Decifrarea Blowfish - operația inversă cifrării
    function BlowfishDecrypt(left, right) {
        for (let i = 17; i > 1; i--) {
            left ^= P[i];
            right ^= F(left);
            [left, right] = [right, left]; // Swap
        }
        [left, right] = [right, left]; // Inversare finală
        right ^= P[1];
        left ^= P[0];

        return { left: left >>> 0, right: right >>> 0 };
    }

    // Inițializarea cheii în Blowfish
    function BlowfishKeyExpansion(key) {
        let keyIndex = 0;

        // XOR fiecare valoare din P-array cu cheia
        for (let i = 0; i < 18; i++) {
            let data = 0x00000000;
            for (let j = 0; j < 4; j++) {
                data = (data << 8) | key[keyIndex];
                keyIndex = (keyIndex + 1) % key.length;
            }
            P[i] ^= data >>> 0;
        }

        // Criptarea blocurilor nule pentru a finaliza inițializarea
        let left = 0x00000000;
        let right = 0x00000000;
        for (let i = 0; i < 18; i += 2) {
            ({ left, right } = BlowfishEncrypt(left, right));
            P[i] = left;
            P[i + 1] = right;
        }

        // Inițializarea S-box-urilor
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 256; j += 2) {
                ({ left, right } = BlowfishEncrypt(left, right));
                S[i][j] = left;
                S[i][j + 1] = right;
            }
        }
    }

    // Funcție pentru a cripta un bloc de 64 de biți (8 octeți)
    function EncryptBlock(block) {
        let left = (block[0] << 24) | (block[1] << 16) | (block[2] << 8) | block[3];
        let right = (block[4] << 24) | (block[5] << 16) | (block[6] << 8) | block[7];

        ({ left, right } = BlowfishEncrypt(left >>> 0, right >>> 0));

        block[0] = (left >>> 24) & 0xFF;
        block[1] = (left >>> 16) & 0xFF;
        block[2] = (left >>> 8) & 0xFF;
        block[3] = left & 0xFF;

        block[4] = (right >>> 24) & 0xFF;
        block[5] = (right >>> 16) & 0xFF;
        block[6] = (right >>> 8) & 0xFF;
        block[7] = right & 0xFF;
    }

    // Funcție pentru a decripta un bloc de 64 de biți (8 octeți)
    function DecryptBlock(block) {
        let left = (block[0] << 24) | (block[1] << 16) | (block[2] << 8) | block[3];
        let right = (block[4] << 24) | (block[5] << 16) | (block[6] << 8) | block[7];

        ({ left, right } = BlowfishDecrypt(left >>> 0, right >>> 0));

        block[0] = (left >>> 24) & 0xFF;
        block[1] = (left >>> 16) & 0xFF;
        block[2] = (left >>> 8) & 0xFF;
        block[3] = left & 0xFF;

        block[4] = (right >>> 24) & 0xFF;
        block[5] = (right >>> 16) & 0xFF;
        block[6] = (right >>> 8) & 0xFF;
        block[7] = right & 0xFF;
    }

    // Exemplu de utilizare
    function main() {
        // Cheia de criptare
        let key = [75, 101, 121, 83, 101, 99, 114, 101, 116]; // "KeySecret" în ASCII

        // Expansiunea cheii Blowfish
        BlowfishKeyExpansion(key);

        // Exemplu de bloc de 8 octeți (64 de biți) de criptat
        let block = input; // "TestBloc" în ASCII

        // Criptarea blocului
        EncryptBlock(block);
        //console.log("Bloc după criptare:", block.map(b => b.toString(16).toUpperCase()).join(' '));

        // Decriptarea blocului
        DecryptBlock(block);
        //console.log("Bloc după decriptare:", block.map(b => String.fromCharCode(b)).join(''));

        if(state === 'cript') output = block.map(b => b.toString(16).toUpperCase()).join(' ');
        else if(state === 'decript') output = block.map(b => String.fromCharCode(b)).join('');
    }

    // Apelare funcție principală
    main();

    document.getElementById('blowfishOutput').value = output;
}

function eccCriptDecript(input)
{
    let output='';
    // Structură pentru a reprezenta punctele pe curba eliptică
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    // Parametrii curbei eliptice
    class CurveParams {
        constructor(a, b, p) {
            this.a = a;
            this.b = b;
            this.p = p;
        }
    }

    // Funcție pentru a calcula inversul modular folosind Algoritmul Euclidian Extins
    function modInverse(k, p) {
        let t = 0, newT = 1;
        let r = p, newR = k;

        while (newR !== 0) {
            let quotient = Math.floor(r / newR);

            let tempT = newT;
            newT = t - quotient * newT;
            t = tempT;

            let tempR = newR;
            newR = r - quotient * newR;
            r = tempR;
        }

        if (r > 1) return -1;  // Inversă nu există
        if (t < 0) t += p;     // Ajustăm valoarea t dacă este negativă

        return t;
    }

    // Funcția pentru adunarea a două puncte pe o curbă eliptică
    function addPoints(P, Q, curve) {
        if (P.x === Q.x && P.y === Q.y) {
            let s = ((3 * P.x * P.x + curve.a) * modInverse(2 * P.y, curve.p)) % curve.p;
            let x_r = (s * s - 2 * P.x) % curve.p;
            let y_r = (s * (P.x - x_r) - P.y) % curve.p;

            if (x_r < 0) x_r += curve.p;
            if (y_r < 0) y_r += curve.p;

            return new Point(x_r, y_r);
        } else {
            let s = ((Q.y - P.y) * modInverse(Q.x - P.x, curve.p)) % curve.p;
            let x_r = (s * s - P.x - Q.x) % curve.p;
            let y_r = (s * (P.x - x_r) - P.y) % curve.p;

            if (x_r < 0) x_r += curve.p;
            if (y_r < 0) y_r += curve.p;

            return new Point(x_r, y_r);
        }
    }

    // Funcția pentru înmulțirea unui punct cu un scalar pe o curbă eliptică
    function scalarMult(P, k, curve) {
        let result = P;
        k = k - 1; // Deja avem un punct, deci repetăm k-1 ori adunarea
        while (k > 0) {
            result = addPoints(result, P, curve);
            k--;
        }
        return result;
    }

    // Funcția principală
    function main() {
        // Definim o curbă eliptică simplă: y^2 = x^3 + ax + b (mod p)
        const curve = new CurveParams(2, 3, 97); // Exemplu: y^2 = x^3 + 2x + 3 (mod 97)

        // Punctul generator G de pe curbă
        const G = new Point(3, 6); // Exemplu de punct de pe curbă

        // Cheia privată a destinatarului
        const privateKey = 7; // Exemplu de cheie privată

        // Cheia publică a destinatarului: PublicKey = privateKey * G
        const publicKey = scalarMult(G, privateKey, curve);

        // Expeditorul alege o cheie aleatorie k pentru criptare
        const k = 5; // Cheie aleatorie

        // Calcularea punctului R = k * G
        const R = scalarMult(G, k, curve);

        // Mesajul de criptat (reprezentat ca punct pe curba eliptică)
        const M = new Point(10, 22); // Exemplu de mesaj ca punct de pe curbă

        // Criptarea mesajului: C1 = R, C2 = M + k * publicKey
        const C1 = R;
        const C2 = addPoints(M, scalarMult(publicKey, k, curve), curve);

        // Decriptarea mesajului: M = C2 - privateKey * C1
        const decryptedMessage = addPoints(C2, scalarMult(C1, privateKey, curve), curve);

        if(state === 'cript') output = "C1: (" + C1.x + ", " + C1.y + "), C2: (" + C2.x + ", " + C2.y + ")";
        else if(state === 'decript') output = decryptedMessage.x + ", " + decryptedMessage.y;
    }

    // Executăm funcția principală
    main();

    document.getElementById('eccOutput').value = output;
}
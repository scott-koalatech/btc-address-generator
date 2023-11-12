import bitcoin from 'bitcoinjs-lib';
import bip39 from 'bip39';
import {BIP32Factory} from 'bip32';
import * as ecc from 'tiny-secp256k1';
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

export function generateAddress() {
    
    // Generate a random mnemonic (uses bip39)
    const mnemonic = bip39.generateMnemonic();
    
    // Create a seed from the mnemonic
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    
    // Create HD wallet from seed
    const root = bip32.fromSeed(seed);
    
    // Derive the Taproot address path
    const path = "m/86'/0'/0'/0/0";
    const child = root.derivePath(path);
    
    // Taproot public key requires only the x-coordinate, which is 32 bytes long
    const taprootPubKey = child.publicKey.slice(1, 33);
    
    
    // Create Taproot address
    const { address } = bitcoin.payments.p2tr({ internalPubkey: taprootPubKey});

    return {
        address,
        mnemonic
    }
}

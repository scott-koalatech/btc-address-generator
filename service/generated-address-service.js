import { generateAddress } from "../utils/generated-taproot-address.js";
import {checkFileExists, excelExport} from "../utils/file-utils.js";
import { numberRange } from "../utils/number-range.js";

export function generateAddressService (n=10, path='./') {
    try {
        const num = isNaN(n) ? n : 10;
        const file_path = checkFileExists(path) ? path : './'

        const date = numberRange(num).map((id) => {
            const {address, mnemonic} = generateAddress();

            return [id, address, mnemonic];
        })

        excelExport(date, file_path);
    } catch (error) {
        console.error(error)
    }

}
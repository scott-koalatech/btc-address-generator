import XLSX from 'xlsx';
import fs from 'fs';

export function excelExport(data, path='.') {

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Create some sample data
    const table = [
      ['id', 'Address', 'Mnemonic'],
      ...data,
    ];
    
    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(table);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UniSat-Taproot-Address');
    
    // Write the workbook to a file
    XLSX.writeFile(workbook, `${path}/${new Date()}.xlsx`);
    
    console.log('Excel file is written.');
}



export function checkFileExists(filePath) {
    if (! fs.existsSync(filePath)) {
        console.error(`The file path '${filePath}' does not exist. The file will be saved in the current directory.`);
        return false;
    }
    return true;
}

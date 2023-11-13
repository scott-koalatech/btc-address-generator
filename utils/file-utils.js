import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

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
    
    // Get the current working directory
    const currentWorkingDirectory = process.cwd();

    // Specify the file name you want to save
    const fileName = `${new Date().toDateString()}.xlsx`; // Change this to your desired file name


    // Create the full file path by joining the current working directory and the file name
    const filePath = `${currentWorkingDirectory}\\${fileName}`



    // Write the workbook to a file
    XLSX.writeFile(workbook, filePath);
    
    console.log('Excel file is written.');
}



export function checkFileExists(filePath) {
    if (! fs.existsSync(filePath)) {
        console.error(`The file path '${filePath}' does not exist. The file will be saved in the current directory.`);
        return false;
    }
    return true;
}

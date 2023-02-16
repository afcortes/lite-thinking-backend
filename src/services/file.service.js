const pdf = require('html-pdf');
const fs = require("fs");

class FileService {
  async createPdfFromTable(data) {
    const pdfTemplatePath = require.resolve('./../templates/pdf.html');
    const HTMLTable = this.generateHTMLTable(data);
    let pdfTemplate = fs.readFileSync(pdfTemplatePath, 'utf8');
    pdfTemplate = pdfTemplate.replace('{{data}}', HTMLTable);
    const pdfFile = await this.createPDFToPromise(pdfTemplate);
    return pdfFile;
  }

  generateHTMLTable(data) {
    console.log(data)
    const HTMLTable = data.map(product => `<tr>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.description}</td>
    </tr>`);
    return HTMLTable.join('');
  }

  createPDFToPromise(pdfTemplate) {
    return new Promise((resolve, reject) => {
      pdf.create(pdfTemplate).toStream((err, res) => {
        if (err) {
            reject(err);
        }
        resolve(res);
      })
    })
  }
}

module.exports = FileService

const pdfService = require("../service/pdf.service")

exports.sendPdf = (req, res) => {
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content_Disposition": "attachment;filename=output.pdf"
    });

    pdfService.buildPDF(
        (c) => stream.write(c),
        () => stream.end()
    );
}
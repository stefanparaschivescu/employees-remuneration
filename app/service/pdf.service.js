const PDFDocument = require("pdfkit");

function buildPDF(dataCallback, endCallback, user, date, days, values) {
    // Create a document
    const doc = new PDFDocument();

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

// Embed a font, set the font size, and render some text
    doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("Internal number:   " + user.internalNumber, 240, 30)
        .text("First and Last name:   " + user.firstName + " " + user.lastName, 220, 45)
        .text("Company name:   " + user.companyId.name, 240, 60)
        .text("Address:   " + user.companyId.address, 275, 75);

    doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(date, 110, 150)
        .text("Hours", 300, 150)
        .text("Days", 350, 150)
        .text("Values (RON)", 450, 150)

    doc
        .font("Helvetica")
        .fontSize(9)
        .text(days, 360, 190)

    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .text("Salariu brut incadrare", 110, 175)
        .text(values.grossSalary, 470, 175);

    doc
        .font("Helvetica")
        .fontSize(9)
        .text("Salariu brut efectiv lucrat", 110, 190)
        .text(values.grossSalary, 470, 190)
        .text("Prima evaluare", 110, 205)
        .text(0, 470, 205)
        .text("Brut tichete de masa", 110, 220)
        .text(values.ticketsValue, 470, 220);

    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .text("Total brut", 110, 238)
        .text(values.grossSalary, 470, 238);

    doc
        .font("Helvetica")
        .fontSize(9)
        .text("Asigurare de sanatate (CASS) - 10%", 110, 255)
        .text(values.cass, 470, 255)
        .text("CAS - 25%", 110, 270)
        .text(values.cas, 470, 270)
        .text("Baza pentru impozitare", 110, 285)
        .text(values.taxBases, 470, 285)
        .text("Impozit", 110, 300)
        .text(values.taxes, 470, 300);

    doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .text("Salariu net realizat", 110, 315)
        .text(values.netSalary, 470, 315);



// Finalize PDF file
    doc.end();
}

module.exports = {buildPDF};
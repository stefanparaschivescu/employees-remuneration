const pdfService = require("../service/pdf.service");
const actualSalary = require("../service/actualSalary.service");
const db = require("../models");
const Request = db.request;
const User = db.user;

function getMonthYear(monthYear) {
    const month = parseInt(monthYear.split("-")[1]);
    const year = parseInt(monthYear.split("-")[0]);

    switch (month) {
        case 1:
            return "JANUARY " + year;
        case 2:
            return "FEBRUARY " + year;
        case 3:
            return "MARCH " + year;
        case 4:
            return "APRIL " + year;
        case 5:
            return "MAY " + year;
        case 6:
            return "JUNE " + year;
        case 7:
            return "JULY " + year;
        case 8:
            return "AUGUST " + year;
        case 9:
            return "SEPTEMBER " + year;
        case 10:
            return "OCTOBER " + year;
        case 11:
            return "NOVEMBER " + year;
        case 12:
            return "DECEMBER " + year;
        default:
            return "DATE WAS INCORRECT";
    }
}

function handleData(stream, monthYear, user, vacations) {
    const year = monthYear.split("-")[0];
    const month = monthYear.split("-")[1];

    const object =  actualSalary.calculateActualSalary(month, year, user, vacations);

    pdfService.buildPDF(
        (c) => stream.write(c),
        () => stream.end(),
        user,
        getMonthYear(monthYear),
        object.totalWorkedDays,
        object.values
    );
}

exports.sendPdf = (req, res) => {
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content_Disposition": "attachment;filename=output.pdf"
    });

    const id = req.params.employeeId;
    const monthYear = req.params.date;

    Request.where("vacationId").ne(null)
        .where("employeeId").equals(id)
        .populate("vacationId", "--v")
        .then(data => {
            User.findById(id)
                .populate("companyId", "--v")
                .then(user => {
                    if (data.length) {
                        let vacations = [];
                        for (let i = 0; i < data.length; i++) {
                            vacations.push(data[i].vacationId);
                        }
                        handleData(stream, monthYear, user, vacations);
                    } else {
                        handleData(stream, monthYear, user);
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving users."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vacations."
            });
        });
}
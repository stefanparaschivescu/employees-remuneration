const csvService = require("../service/csv.service");
const db = require("../models");
const actualSalary = require("../service/actualSalary.service");
const pdfService = require("../service/pdf.service");
const User = db.user;
const Request = db.request;

exports.download = (req, res) => {
    const fields = [
        {
            label: 'OrderNumber',
            value: 'orderNumber'
        },
        {
            label: 'SourceAccountNumber',
            value: 'sourceAccountNumber'
        },
        {
            label: 'TargetAccountNumber',
            value: 'targetAccountNumber'
        },
        {
            label: 'BeneficiaryName',
            value: 'beneficiaryName'
        },
        {
            label: 'BeneficiaryBankBIC',
            value: 'beneficiaryBankBIC'
        },
        {
            label: 'BeneficiaryFiscalCode',
            value: 'beneficiaryFiscalCode'
        },
        {
            label: 'Amount',
            value: 'amount'
        },
        {
            label: 'PaymentRef1',
            value: 'paymentRef1'
        },
        {
            label: 'PaymentRef2',
            value: 'paymentRef2'
        },
        {
            label: 'ValueDate',
            value: 'valueDate'
        },
        {
            label: 'Urgent',
            value: 'urgent'
        }
    ];

    function handleData(monthYear, user, vacations) {
        const year = monthYear.split("-")[0];
        const month = monthYear.split("-")[1];

        return actualSalary.calculateActualSalary(month, year, user, vacations);
    }

    const monthYear = req.params.date;
    const dateString = monthYear.split("-");
    const date = dateString.map(function (x) {
        return parseInt(x);
    });

    User.find()
        .then(async data => {
            const employees = data;
            let payments = [];
            for (let i = 0; i < employees.length; i++) {
                let result;

                result = await Request.where("vacationId").ne(null)
                    .where("employeeId").equals(employees[i].id)
                    .populate("vacationId", "--v")
                    .then(data => {
                        if (data.length) {
                            let vacations = [];
                            for (let i = 0; i < data.length; i++) {
                                vacations.push(data[i].vacationId);
                            }
                            return handleData(monthYear, employees[i], vacations);
                        } else {
                            return handleData(monthYear, employees[i]);
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving vacations."
                        });
                    });

                payments.push(
                    {
                        orderNumber: i + 1,
                        sourceAccountNumber: req.params.sourceAccountNumber,
                        targetAccountNumber: employees[i].IBAN,
                        beneficiaryName: employees[i].lastName + " " + employees[i].firstName,
                        beneficiaryBankBIC: employees[i].BIC,
                        beneficiaryFiscalCode: undefined,
                        amount: result.values.netSalary,
                        paymentRef1: req.params.paymentRef1,
                        paymentRef2: req.query.hasOwnProperty("paymentRef2") ? req.query.paymentRef2 : "-",
                        valueDate: new Date(date[0], date[1], date[2]).toLocaleDateString(),
                        urgent: req.params.urgent === "true" ? "T" : "F"
                    }
                );
            }

            csvService.downloadResource(res, 'users.csv', fields, payments);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}
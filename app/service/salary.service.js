function calculateNetSalary (salary, type, ticketsNumber, ticketValue, taxExempt) {
    salary = parseInt(salary);
    ticketsNumber = parseInt(ticketsNumber !== "" ? ticketsNumber : "0");
    ticketValue = parseInt(ticketValue !== "" ? ticketValue : "0");

    const ticketsValue = Math.round(ticketValue * ticketsNumber);
    let employerTax = 0;

    if (type === "total") {
        let gross = (0.0225 * (salary - ticketsValue)) / 1.0225;
        employerTax = Math.round(0.0225 * (salary - ticketsValue - gross));
        salary = Math.round(salary - employerTax - ticketsValue);
    }

    const cas = Math.round(0.25 * salary);
    const cass = Math.round(0.1 * salary);
    let taxes = Math.round(0.1 * (salary + ticketsValue - cas - cass));

    if (taxExempt) {
        taxes = 0;
    }

    const taxBases = salary + ticketsValue - cas - cass;
    const netSalary = taxBases - taxes;

    return {
        netSalary: netSalary,
        cas: cas,
        cass: cass,
        taxes: taxes,
        ticketsValue: ticketsValue,
        grossSalary: salary,
        taxBases: taxBases
    };
}

module.exports = {calculateNetSalary};
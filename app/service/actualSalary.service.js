const salaryCalculatorService = require("./salary.service");
const moment = require("moment");

function daysInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
}

function isWeekday(year, month, day) {
    let currentDay = new Date(year, month, day).getDay();
    return currentDay !== 0 && currentDay !== 6;
}

function getWeekdaysInMonth(month, year) {
    let days = daysInMonth(month - 1, year);
    let weekdays = 0;
    for (let i = 0; i < days; i++) {
        if (isWeekday(year, month - 1, i + 1)) weekdays++;
    }
    return weekdays;
}

function calculateActualSalary(month, year, user, vacations) {
    let totalWorkedDays = getWeekdaysInMonth(parseInt(month), parseInt(year));
    const totalWorkingDays = totalWorkedDays;

    if (vacations) {
        for (let i = 0; i < vacations.length; i++) {
            if (vacations[i].vacationType === "unpaid") {
                let daysCount = vacations[i].days;
                let startDate = new Date(vacations[i].startingDate);
                startDate.setHours(0, 0, 0, 0);
                let finishDate = new Date(vacations[i].startingDate);
                finishDate.setHours(0, 0, 0, 0);
                while (daysCount) {
                    finishDate.setDate(finishDate.getDate() + 1);
                    if (isWeekday(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate())) {
                        daysCount--;
                    }
                }

                let actualMonthVacationDays = 0;
                let firstDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
                let lastDayOfMonth = new Date(parseInt(year), parseInt(month), 0, 24);

                if (startDate.getMonth() === firstDayOfMonth.getMonth()
                    || finishDate.getMonth() === firstDayOfMonth.getMonth()) {
                    if (finishDate > lastDayOfMonth) {
                        finishDate = lastDayOfMonth
                    } else if (startDate < firstDayOfMonth) {
                        startDate = firstDayOfMonth;
                    }

                    for (let date = startDate; date < finishDate; date.setDate(date.getDate() + 1)) {
                        if (isWeekday(date.getFullYear(), date.getMonth(), date.getDate())) {
                            actualMonthVacationDays++;
                        }
                    }
                }

                totalWorkedDays = totalWorkedDays - actualMonthVacationDays;
            }
        }
    }

    return {
        values: (salaryCalculatorService.calculateNetSalary(
            user.grossSalary * (totalWorkedDays / totalWorkingDays),
            "gross",
            totalWorkedDays,
            user.mealTicketValue,
            user.taxExempt)),
        totalWorkedDays: totalWorkedDays
    };
}

module.exports = {calculateActualSalary};
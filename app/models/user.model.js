const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            companyId: {type: ObjectId, ref: "company"},
            firstName: String,
            lastName: String,
            dateOfBirth: Date,
            phoneNumber: String,
            gender: Boolean,
            address: String,
            married: Boolean,
            internalNumber: Number,
            emailAddress: String,
            passwordToken: String,
            role: {type: ObjectId, ref: "role"},
            grossSalary: Number,
            netSalary: Number,
            mealTicketValue: Number,
            taxExempt: Boolean,
            IBAN: String,
            BIC: String,
            vacationDays: Number,
            functionId: {type: ObjectId, ref: "function"}
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("user", schema);
};

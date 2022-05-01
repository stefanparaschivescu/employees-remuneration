const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            administratorId: ObjectId,
            employeeId: ObjectId,
            vacationId: ObjectId,
            benefitId: ObjectId
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("request", schema);
};

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            administratorId: {type: ObjectId, ref: "user"},
            employeeId: {type: ObjectId, ref: "user"},
            vacationId: {type: ObjectId, ref: "vacation"},
            benefitId: {type: ObjectId, ref: "benefit"},
            accepted: Boolean,
            message: String
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

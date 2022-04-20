const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            AdministratorId: ObjectId,
            EmployeeId: ObjectId,
            VacationId: ObjectId,
            BenefitId: ObjectId
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("requests", schema);
};

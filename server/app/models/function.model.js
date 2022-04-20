const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            EmployeeId: ObjectId,
            Name: String,
            MinimumSalary: Number,
            MaximumSalary: Number
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("functions", schema);
};

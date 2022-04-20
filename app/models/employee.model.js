const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            CompanyId: ObjectId,
            FirstName: String,
            LastName: String,
            Salary: Number,
            EmailAddress: String,
            EncryptedPassword: String,
            FunctionId: ObjectId
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("employees", schema);
};

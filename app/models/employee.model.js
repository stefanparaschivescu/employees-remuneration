const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            CompanyId: ObjectId,
            FirstName: String,
            LastName: String,
            DateOfBirth: Date,
            PhoneNumber: String,
            Gender: Boolean,
            Address: String,
            Married: Boolean,
            InternalNumber: Number,
            EmailAddress: String,
            EncryptedPassword: String,
            roles: [
                {
                    type: ObjectId,
                    ref: "role"
                }
            ],
            Salary: Number,
            FunctionId: ObjectId
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("employee", schema);
};

const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            CompanyId: ObjectId,
            FirstName: String,
            LastName: String,
            EmailAddress: String,
            EncryptedPassword: String,

        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("administrators", schema);
};

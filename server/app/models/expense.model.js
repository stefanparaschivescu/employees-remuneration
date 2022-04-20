const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            PaymentId: ObjectId,
            CompanyId: ObjectId,
            Description: String,
            Amount: Number
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("expenses", schema);
};

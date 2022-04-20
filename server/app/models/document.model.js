const {ObjectId} = require("mongodb");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            RequestId: ObjectId,
            Name: String,
            SignatureReference: String
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("documents", schema);
};

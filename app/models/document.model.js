const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            requestId: ObjectId,
            name: String,
            signatureReference: String
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("document", schema);
};

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            bankName: String,
            IBAN: String,
            receiptNo: Number
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("payment", schema);
};

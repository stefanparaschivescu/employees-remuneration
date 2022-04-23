module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            BankName: String,
            IBAN: String,
            ReceiptNo: Number
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

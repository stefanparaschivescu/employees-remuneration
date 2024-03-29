module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            CUI: Number,
            name: String,
            address: String
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("company", schema);
};

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            days: Number,
            startingDate: Date,
            vacationType: String
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("vacation", schema);
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    key: String,
    value: Schema.Types.Mixed,
});

const SettingsModel = mongoose.model('settings', SettingsSchema);
module.exports.SettingsModel = SettingsModel;

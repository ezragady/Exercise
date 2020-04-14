const SettingsModel = require('./settingsModel').SettingsModel;

async function getAllSettings(req,res) {
    const settings = await SettingsModel.find({});
    res.send({settings})
}

async function addNewSetting(req,res) {
    const newSetting = req.body;
    const settingToSave = new SettingsModel({key: newSetting.key, value: newSetting.value});
    const savedSetting = await SettingsModel.save(settingToSave);
    res.send({setting: savedSetting})
}

async function editSetting(req,res) {
    const settingId = req.body.settingId;
    const setting = await SettingsModel.findOneAndUpdate({'_id': settingId},{value: req.body.newValue});
    res.send({setting});
}

async function deleteSetting(req,res) {
    const settingId = req.body.settingId;
    const setting = await SettingsModel.deleteOne({'_id': settingId});
    res.send({setting});
}

module.exports = {getAllSettings,addNewSetting,editSetting,deleteSetting}

const express = require('express');
const settingsController = express.Router();
const settingsService = require('./settingsService');

settingsController.get('/', settingsService.getAllSettings);
settingsController.post('/', settingsService.addNewSetting);
settingsController.put('/', settingsService.editSetting);
settingsController.delete('/', settingsService.deleteSetting);

module.exports = settingsController;

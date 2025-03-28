const Model = require('../models/model');

/**
 * Sample Controller - You should replace this with controllers based on your schema design
 */
const controller = {
  /**
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getData: async (req, res, next) => {
    try {
      const data = await Model.getData();

      res.json({
        success: true,
        count: data.length,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controller;

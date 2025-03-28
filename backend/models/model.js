const { query } = require('../db');

/**
 * Sample Model - You should replace this with models based on yout schema design
 */
class Model {
  /**
   * @returns {Promise<Array>} Array of records
   */
  static async getData({ limit = 20, offset = 0 } = {}) {
    // Simple parameterized query example

    const result = await query(
      'SELECT * FROM chartmetric.artists ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return result.rows;
  }
}

module.exports = Model;

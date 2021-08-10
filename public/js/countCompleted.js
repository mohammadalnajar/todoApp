const { ObjectId } = require('mongodb');

module.exports = {
  countCompleted: function (array) {
    const total = array.length;
    const result = array.filter((obj) => obj.done === 'true');
    return {
      total,
      done: result.length,
      left: total - result.length,
    };
  },
};

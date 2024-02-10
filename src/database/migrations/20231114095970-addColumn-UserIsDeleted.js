'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'isDeleted',
      {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
    );
  },
};
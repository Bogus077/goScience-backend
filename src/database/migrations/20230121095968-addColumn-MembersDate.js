'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Member', 'dob',
      {
        allowNull: true,
        type: Sequelize.DATE
      },
    );
  },
};
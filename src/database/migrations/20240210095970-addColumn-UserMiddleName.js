'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'middleName',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
};
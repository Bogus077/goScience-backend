'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Member', 'password',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
};
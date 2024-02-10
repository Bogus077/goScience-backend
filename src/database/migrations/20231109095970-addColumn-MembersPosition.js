'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Member', 'position',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Member', 'email',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
};
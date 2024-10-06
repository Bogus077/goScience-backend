'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Member', 'allergy',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Event', 'orderNumber',
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.addColumn('Event', 'orderDate',
      {
        type: Sequelize.DATE,
      },
    );
  },
};
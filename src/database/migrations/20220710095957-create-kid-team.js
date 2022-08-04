'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KidTeam', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      KidId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kid',
          key: 'id',
        },
        unique: false,
      },
      TeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Team',
          key: 'id',
        },
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KidTeam');
  }
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectTask', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Project',
          key: 'id',
        },
        unique: false,
      },
      label: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('ProjectTask');
  }
};
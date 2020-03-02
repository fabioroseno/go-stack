'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
         type: Sequelize.STRING,
         allowNull: false,
        },
        email: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true,
        },
        passaword_hash: {
         type: Sequelize.STRING,
         allowNull: false,
        },
        provider: {
         type: Sequelize.BOOLEAN,
        },
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('users');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', 'permissao', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'estudante'
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('usuarios', 'permissao');

  }
};

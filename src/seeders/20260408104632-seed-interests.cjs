'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Interests', [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Full-Stack Development',
        category: 'Development',
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'AI',
        category: 'Technology',
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Interests', null, {});
  },
};
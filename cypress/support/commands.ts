/// <reference types="cypress" />

// Кастомные команды
Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.contains(ingredientName).click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('#modals')
    .find('svg')
    .first()
    .click({ force: true });
});

Cypress.Commands.add('addIngredient', (ingredientName: string) => {
  cy.contains(ingredientName)
    .parents('li')
    .find('button')
    .contains('Добавить')
    .click({ force: true });
});

//  типизация для TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      openIngredientModal(ingredientName: string): Chainable;
      closeModal(): Chainable;
      addIngredient(ingredientName: string): Chainable;
    }
  }
}

//  экспорт для преобразования файла в модуль
export {};
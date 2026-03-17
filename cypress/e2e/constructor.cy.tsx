/// <reference types="cypress" />

describe('Stellar Burgers — конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  // модалка ингредиента
  it('открытие и закрытие модалки ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('#modals').find('h3').should('contain', 'Краторная булка N-200i');

    cy.get('#modals')
      .find('svg')
      .first()
      .click({ force: true });

    cy.get('#modals').should('be.empty');
  });

  // добавление ингредиентов
  it('добавление булки и начинки через кнопку "Добавить"', () => {
    // кнопка "Добавить" привязана к ингредиенту через родительский li
    // булка
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Выберите булки').should('not.exist');

    // начинка
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Выберите начинку').should('not.exist');
  });

  // создание заказа
  it('создание заказа и очистка конструктора', () => {
    // булка
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // начинка
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click({ force: true });

    // оформить заказ
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('#modals').find('h2').should('contain', '12345');

    // закрыть модалку
    cy.get('#modals')
      .find('svg')
      .first()
      .click({ force: true });

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});

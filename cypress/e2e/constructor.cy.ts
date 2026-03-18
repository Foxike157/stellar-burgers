/// <reference types="cypress" />

const MODALS_SELECTOR = '#modals';
const MODAL_CLOSE_BUTTON = 'svg';
const BUN_NAME = 'Краторная булка N-200i';
const FILLING_NAME = 'Биокотлета из марсианской Магнолии';
const ADD_BUTTON_TEXT = 'Добавить';
const ORDER_BUTTON_TEXT = 'Оформить заказ';
const SELECT_BUNS_TEXT = 'Выберите булки';
const SELECT_FILLING_TEXT = 'Выберите начинку';
const ORDER_NUMBER = '12345';

describe('Stellar Burgers — конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Установка состояния в beforeEach 
    localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  //  очистка состояния в afterEach 
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // модалка ингредиента
  it('открытие и закрытие модалки ингредиента', () => {
    cy.contains(BUN_NAME).click();

    cy.get(MODALS_SELECTOR).find('h3').should('contain', BUN_NAME);

    cy.get(MODALS_SELECTOR)
      .find(MODAL_CLOSE_BUTTON)
      .first()
      .click({ force: true });

    cy.get(MODALS_SELECTOR).should('be.empty');
  });

  // добавление ингредиентов
  it('добавление булки и начинки через кнопку "Добавить"', () => {
    // булка
    cy.contains(BUN_NAME)
      .parents('li')
      .find('button')
      .contains(ADD_BUTTON_TEXT)
      .click({ force: true });

    cy.contains(SELECT_BUNS_TEXT).should('not.exist');

    // начинка
    cy.contains(FILLING_NAME)
      .parents('li')
      .find('button')
      .contains(ADD_BUTTON_TEXT)
      .click({ force: true });

    cy.contains(SELECT_FILLING_TEXT).should('not.exist');
  });

  // создание заказа
  it('создание заказа и очистка конструктора', () => {
    // булка
    cy.contains(BUN_NAME)
      .parents('li')
      .find('button')
      .contains(ADD_BUTTON_TEXT)
      .click({ force: true });

    // начинка
    cy.contains(FILLING_NAME)
      .parents('li')
      .find('button')
      .contains(ADD_BUTTON_TEXT)
      .click({ force: true });

    // оформить заказ
    cy.contains(ORDER_BUTTON_TEXT).click();
    cy.wait('@createOrder');

    cy.get(MODALS_SELECTOR).find('h2').should('contain', ORDER_NUMBER);

    // закрыть модалку
    cy.get(MODALS_SELECTOR)
      .find(MODAL_CLOSE_BUTTON)
      .first()
      .click({ force: true });

    cy.contains(SELECT_BUNS_TEXT).should('exist');
    cy.contains(SELECT_FILLING_TEXT).should('exist');
  });
});
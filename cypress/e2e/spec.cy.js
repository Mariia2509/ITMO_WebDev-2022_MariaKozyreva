import DOM from '../../src/constants/dom.js';

const createTodo = (text) => {
  cy.get(`#${DOM.INPUT_CREATE_TITLE}`).type(text);
  cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
};

describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:8089');
  });

  it('enter todo text as number and check disabled button', () => {
    cy.get(`#${DOM.INPUT_CREATE_TITLE}`).type(123);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).should('be.disabled');
    cy.get('#inpTodoTitle').clear();
  });

  it('enter todo text and press create', () => {
    const TEST_TODO_TEXT = 'New Todo';

    cy.checkInputExistAndEmpty();

    createTodo(TEST_TODO_TEXT);

    cy.checkInputExistAndEmpty();

    const todoListChildren = cy.get('#listOfTodos').children();

    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);

    checkChildrenExist();
    cy.reload(true);
    checkChildrenExist();
  });

  it('create todo and validate selection rules', () => {
    ['Todo 1', 'Todo 2'].forEach(createTodo);

    const totalListChildren = cy.get(`#listOfTodos`).children();
    const firstChild = totalListChildren.eq(0).then(($child) => {
      cy.wrap($child).click();

      const todoText = $child.text().trim();
      cy.get(`#${DOM.LIST_OF_TODOS}`);
      // .should('have.text', $child.text);
    });
  });
});

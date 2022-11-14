import DOM from '../../src/constants/dom.js';
import cypress from 'cypress';

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

    cy.get(`#${DOM.INPUT_CREATE_TITLE}`).clear();

    const clickOnListItemAndCheckInputValueFromFunctionCall = (
      listItemIndex,
      getCompareValue
    ) =>
      cy
        .get(`#${DOM.LIST_OF_TODOS}`)
        .children()
        .eq(listItemIndex)
        .click()
        .then(($child) => {
          cy.get(`#${DOM.INPUT_CREATE_TITLE}`).should(
            'have.value',
            getCompareValue($child)
          );
        });

    const getTextFromTodoItemDomElement = ($child) => $child.text().trim();

    clickOnListItemAndCheckInputValueFromFunctionCall(
      0,
      getTextFromTodoItemDomElement
    )
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(0, () => '');
      })
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(
          1,
          getTextFromTodoItemDomElement
        );
      });
  });
});

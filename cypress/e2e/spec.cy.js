describe('spec.cy.js', () => {
  it('should have a form', () => {
    cy.visit('http://localhost:8089/');
    cy.com1();
    cy.get('button').should('text', 'Create');
  });

  it('should add a task', () => {
    const TYPE_1 = 'пойти в кино';
    cy.get('input').type(TYPE_1).should('have.value', TYPE_1);
    cy.contains('Create').click();
    cy.get('#listOfTodos')
      .children()
      .should('have.length', 1)
      .should('contain.text', TYPE_1);
    cy.com1();

    const n1 = cy.get('#listOfTodos').children();

    n1.should('exist').should('have.length', 1);
    n1.first().should('contain.text', TYPE_1);
    cy.get('#listOfTodos > li > input[type="checkbox"]')
      .should('exist')
      .should('have.length', 1);

    it('blockButton', () => {
      cy.get('input').type(123).should('have.value', 'be.disabled');
      cy.contains('Create').should('have.value', 'be.disabled');
    });
  });
});

describe('spec.cy.js', () => {
  it('should have a form', () => {
    cy.visit('http://localhost:8089/');
    cy.get('input').should('have.value', '');
    cy.get('button').should('text', 'Create');
  });

  it('should add a task', () => {
    cy.get('input').type('пойти в кино').should('have.value', 'пойти в кино');
    cy.contains('Create').click();
    cy.get('indexInt').should('have.value', 'пойти в кино');
    cy.get('input').should('have.value', '');
  });
});

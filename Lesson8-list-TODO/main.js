const domInputTodoTitle = document.getElementById('inputTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

class TodoVO {
  constructor(id, title, date = new Date()) {
    this.id = id;
    this.title = title;
    this.data = date;
    this.completed = false;
  }
}

const localListOfTodo = localStorage.getItem(LOCAL_LIST_OF_TODOS);
const isLocalDataNull = localListOfTodo == null;

const listOfTodos = JSON.parse(localStorage.getItem(LOCAL_LIST_OF_TODOS));
console.log('> Intial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);

function onBtnCreateTodoClick(event) {
  // console.log('> domBtnCreateTodo -> handle(click)', event);
  const todotitleValueFromDomInput = domInputTodoTitle.value;
  // console.log('>domBtnCreateTodo -> todoInputTodoTitleValue:', todotitleValueFromDomInput);
  if (validateTodoInputTitleValue(todotitleValueFromDomInput)) {
    console.log(typeof listOfTodos);
    listOfTodos.push(createTodoVO(todotitleValueFromDomInput));
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
  }

  function validateTodoInputTitleValue(value) {
    const isInputValueString = typeof todotitleValueFromDomInput === 'string';
    const isInputValueNotNumber = isNaN(parseInt(value));

    const result = isInputValueString && isInputValueNotNumber && value.length > 0;

    console.log(`validateTodoInputTitleValue -> result`, {
      result,
      isInputValueString,
      isInputValueNotNumber,
    });
    return result;
  }

  function createTodoVO(title) {
    const todoId = Date.now().toString();
    return new TodoVO(todoId, title);
  }

  function renderTodoListInContainer(list, container) {
    let output = '';
    for (let index in listOfTodos) {
      output += `<li>${listOfTodos[index].title}</li>`;
    }
    container.innerHTML = output;
  }
}

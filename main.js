import TodoVO from './src/model/vos/TodoVO.js';
import { disableButtonWhenTextInvalid } from './src/model/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from './src/model/utils/StringUtils.js';
import {
  localStorageListOf,
  localSorageSaveListofWithKey,
} from './src/model/utils/databaseUtils.js';
import TodoView from './src/model/utils/view/TodoView.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);
domListOfTodos.addEventListener('click', onTodoListClicked);

let selectedTodoVO = null;
domListOfTodos.addEventListener('click', (event) => {
  console.log('>domListOfTodos.click -> event:', event.target);
  if (selectedTodoVO == null) {
    const todoID = event.target.id;
    const todoVO = listOfTodos.find((item) => item.id === todoID);
    console.log('>domListOfTodos.click -> todoVO:', todoVO);
    domInpTodoTitle.value = todoVO.title;
    domBtnCreateTodo.innerText = 'Update';
    selectedTodoVO = todoVO;
    event.target.style.backgroundColor = 'lightgray';
  } else {
    resetSelectedTodo();
    selectedTodoVO = null;
    domBtnCreateTodo.innerText = 'Create';
    domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
    event.target.style.bordbackgroundColorer = '';
  }
});

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
renderTodoListInContainer(listOfTodos, domListOfTodos);
disableOrEnableCreateTodoButtonOnTodoInputTitle();

function onTodoListChange(event) {
  if (event.target.dataset['type'] !== TodoView.TODO_VIEW_ITEM) return;

  const SELECTED_BACKGROUND = 'lightgray';
  const isSelected = 'target.style.backgroundColor = SELECTED_BACKGROUND';

  if (isSelected) {
    target.style.backgroundColor = '';
  } else {
    target.style.backgroundColor = 'SELECTED_BACKGROUND';
  }
}

function onTodoListClicked(event) {
  if (event.target) console.log('onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[index];
    console.log('>onTodoListChange -> todoVO', typeof indexInt, todoVO);
    todoVO.isComplited = !!target.checked;
    saveListOfTodo();
  }
}

function onBtnCreateTodoClick() {
  // console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);

  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    if (selectedTodoVO) {
      selectedTodoVO.title = todoTitleValueFromDomInput;
      resetSelectedTodo();
    } else {
      createTodoFromTextAndAddToList(todoTitleValueFromDomInput, listOfTodos);
    }
    saveListOfTodo();
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    clearInputTextAndLocalStorage();
    disableOrEnableCreateTodoButtonOnTodoInputTitle();
  }
}

function onInpTodoTitleKeyup(event) {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = domInpTodoTitle.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  disableOrEnableCreateTodoButtonOnTodoInputTitle();
  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
}

function renderTodoListInContainer(list, container) {
  let output = '';
  let todoVO;
  for (let index in list) {
    todoVO = list[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function resetSelectedTodo(target) {
  selectedTodoVO = null;
  domBtnCreateTodo.innerText = 'Create';
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
  target.style.backgroundColor = '';
}

function createTodoFromTextAndAddToList(input) {
  listOfTodos.push(TodoVO.createFromTitle(input));
}

function clearInputTextAndLocalStorage() {
  domInpTodoTitle.value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnableCreateTodoButtonOnTodoInputTitle() {
  disableButtonWhenTextInvalid(
    domBtnCreateTodo,
    domInpTodoTitle.value,
    isStringNotNumberAndNotEmpty
  );
}

function saveListOfTodo() {
  localSorageSaveListofWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);

  // class HaveColor {
  //   constructor(color) {
  //     this.color = color;
  //   }
}
//
// let car = {
//   color: 'blue',
// };
// let bycicle = {
//   color: 'green',
// };
// function changeColor(car, newColor) {
//   if (car.color) {
//     car.color = newColor;
//   }
// }
// console.log('car after:', car.color);
// console.log('bicicle after: ', bycicle.color);

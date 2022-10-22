import TodoVO from './src/model/vos/TodoVO.js';
import { disableButtonWhenTextInvalid } from '@/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from '@/utils/stringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from '@/utils/databaseUtils.js';
import TodoView from '@/view/TodoView.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

let selectedTodoVO = null;
let selectedTodoViewItem = null;

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);
domListOfTodos.addEventListener('click', (event) => {
  console.log('> domListOfTodos click -> event:', event.target);
  console.log('> domListOfTodos click -> :', event.target.dataset);
  if (event.target.dataset['type'] !== TodoView.TODO_VIEW_ITEM) return;

  if (selectedTodoVO != null) resetSelectedTodo();
  selectedTodoViewItem = event.target;

  if (selectedTodoVO == null) {
    const todoID = event.target.id;
    const todoVO = listOfTodos.find((item) => item.id === todoID);
    console.log('> domListOfTodos click -> todoVO:', todoVO);
    domInpTodoTitle.value = todoVO.title;
    domBtnCreateTodo.innerText = 'Update';
    selectedTodoVO = todoVO;
    selectedTodoViewItem.style.border = '1px solid red';
  } else {
    console.log('> resetSelectedTodo -> :', event.target.dataset);
    resetSelectedTodo();
  }
});

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
render_TodoListInContainer(listOfTodos, domListOfTodos);
disableOrEnable_CreateTodoButtonOnTodoInputTitle();

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[indexInt];
    console.log('> onTodoListChange -> todoVO:', indexInt, todoVO);
    todoVO.isCompleted = !!target.checked;
    save_ListOfTodo();
  }
}

function onBtnCreateTodoClick() {
  // console.log('> domBtnCreateTodo -> handle(click)', this.attributes);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    if (selectedTodoVO) {
      selectedTodoVO.title = todoTitleValueFromDomInput;
      resetSelectedTodo();
    } else {
      create_TodoFromTextAndAddToList(todoTitleValueFromDomInput, listOfTodos);
    }
    save_ListOfTodo();
    clear_InputTextAndLocalStorage();
    render_TodoListInContainer(listOfTodos, domListOfTodos);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  }
}

function onInpTodoTitleKeyup(event) {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = domInpTodoTitle.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function render_TodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function resetSelectedTodo() {
  selectedTodoVO = null;
  domBtnCreateTodo.innerText = 'Create';
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoViewItem) {
    selectedTodoViewItem.style.border = '';
  }
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  listOfTodos.push(TodoVO.createFromTitle(input));
}

function clear_InputTextAndLocalStorage() {
  domInpTodoTitle.value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle() {
  console.log('> disableOrEnableCreateTodoButtonOnTodoInputTitle -> domInpTodoTitle.value =', domInpTodoTitle.value);
  const textToValidate = domInpTodoTitle.value;
  disableButtonWhenTextInvalid(domBtnCreateTodo, textToValidate, isStringNotNumberAndNotEmpty);
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}

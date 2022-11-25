import TodoVO from './src/model/vos/TodoVO.js';
import TodoView from './src/view/TodoView.js';
import { isStringNotNumberAndNotEmpty } from '@/utils/StringUtils.js';
import { disableButtonWhenTextInvalid } from '@/utils/domUtils.js';
import { localStorageSaveListOfWithKey } from '@/utils/databaseUtils.js';
import { wrapDebugConsole, $ } from '@/utils/generalUtils.js';
import ServerService from './src/services/TodoServerService.js';
import {
  LOCAL_INPUT_TEXT,
  LOCAL_LIST_OF_TODOS,
} from '@/constants/localConsts.js';
import DOM from './src/constants/dom.js';

let listOfTodos = [];
let selectedTodoVO = null;
let selectedTodoViewItem = null;
const hasSelectedTodo = () => !!selectedTodoVO;
const findTodoById = (id) => listOfTodos.find((vo) => vo.id === id);
const isTitleUnique = 'title';

const serverService = new ServerService(
  import.meta.env.VITE_DATA_SERVER_ADDRESS
);

wrapDebugConsole();

serverService
  .requestTodos()
  .then((todoList) => {
    listOfTodos = todoList;
    $(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
    render_TodoListInContainer(listOfTodos, $(DOM.LIST_OF_TODOS));
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();

    $(DOM.APP).style.visibility = 'visible';
  })
  .catch((error) => {
    $(
      DOM.APP
    ).innerHTML = `<h1 style="color: maroon">Problem with server:<h1><p style="color: red"> ${error.toString()}<p>`;
  })
  .finally(() => ($(DOM.APP).style.visibility = 'visible'));

$(DOM.BTN_CREATE_TODO).addEventListener('click', onBtnCreateTodoClick);
$(DOM.INP_TODO_TITLE).onkeyup = onInpTodoTitleKeyup;
$(DOM.LIST_OF_TODOS).addEventListener('change', onTodoListChange);
$(DOM.LIST_OF_TODOS).addEventListener('click', onTodoDomItemClicked);

async function onTodoDomItemClicked(event) {
  const domElement = event.target;
  console.log('> onTodoDomItemClicked', domElement);

  if (!TodoView.isDomElementMatch(domElement)) {
    const isDeleteButton = TodoView.isDomElementDeleteButton(domElement);
    console.log('> \t isDeleteButton:', isDeleteButton);
    if (isDeleteButton) {
      const todoId = TodoView.getTodoIdFromDeleteButton(domElement);
      console.log('> \t todoId:', todoId);
      const todoVO = findTodoById(todoId);
      if (todoVO && confirm(`Delete: ${todoVO.title}?`)) {
        console.log('> \t Delete confirmed:', todoVO);
        domElement.disabled = true;
        serverService
          .deleteTodo(todoId)
          .then(() => {
            listOfTodos.splice(listOfTodos.indexOf(todoVO), 1);
            render_TodoListInContainer(listOfTodos, $(DOM.LIST_OF_TODOS));
          })
          .catch(() => {});
      }
    }
    return;
  }
  const currentTodoVO = findTodoById(domElement.id);
  const isItemSelected = selectedTodoVO === currentTodoVO;

  if (hasSelectedTodo) resetSelectedTodo();
  console.log('> onTodoDomItemClicked -> isItemSelected:', isItemSelected);

  if (!isItemSelected) {
    selectedTodoVO = currentTodoVO;
    selectedTodoViewItem = domElement;

    $(DOM.BTN_CREATE_TODO).innerText = 'Update';
    $(DOM.INP_TODO_TITLE).value = currentTodoVO.title;
    selectedTodoViewItem.style.backgroundColor = 'lightgray';
    await onInpTodoTitleKeyup();
  }
}

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

async function onBtnCreateTodoClick(event) {
  // console.log('> $(DOM.BTN_CREATE_TODO) -> handle(click)', this.attributes);
  await createTodoWhenPossible(event);
}

async function onInpTodoTitleKeyup(event) {
  console.log('> onInpTodoTitleKeyup:', event instanceof KeyboardEvent);
  if (!event && !(event instanceof KeyboardEvent)) return;

  const isKeyEnter = event.code === 'Enter';
  console.log('>\t:', { isKeyEnter });
  if (isKeyEnter) {
    await createTodoWhenPossible().catch(
      ({ isStringInvalid, isTitleNotUnique }) => {
        if (isStringInvalid) alert('String invalid');
        if (isTitleNotUnique) alert('Title already exists');
      }
    );
    return;
  }

  const inputValue = $(DOM.INP_TODO_TITLE).value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  if (hasSelectedTodo()) {
    disableOrEnable_CreateTodoButtonOnTodoInputTitle(() => {
      return (
        isStringNotNumberAndNotEmpty(inputValue) &&
        selectedTodoVO.title !== inputValue
      );
    });
  } else {
    localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  }
}

async function createTodoWhenPossible() {
  // console.log('> $(DOM.BTN_CREATE_TODO) -> handle(click)', this.attributes);
  const todoTitle_Value_FromDomInput = $(DOM.INP_TODO_TITLE).value;

  const isStringValid = isStringNotNumberAndNotEmpty(
    todoTitle_Value_FromDomInput
  );
  const isTitleUnique =
    isStringValid &&
    !listOfTodos.some(
      (todoVO) => todoVO.title === todoTitle_Value_FromDomInput
    );

  if (isStringValid && isTitleUnique) {
    const todoVO = create_TodoFromTextAndAddToList(
      todoTitle_Value_FromDomInput,
      listOfTodos
    );
    $(DOM.INP_TODO_TITLE).disabled = true;
    $(DOM.BTN_CREATE_TODO).disabled = true;
    await serverService
      .saveTodo(todoVO)
      .then((data) => {
        console.log('>domBtnCreateTodo -> onBtnCreateClick: saved = ', data);
        clear_InputTextAndLocalStorage();

        render_TodoListInContainer(listOfTodos, $(DOM.LIST_OF_TODOS));
        disableOrEnable_CreateTodoButtonOnTodoInputTitle();
      })
      .catch(alert)
      .finally(() => {
        $(DOM.INP_TODO_TITLE).disabled = true;
        $(DOM.BTN_CREATE_TODO).disabled = true;
      });
  } else {
    const isStringInvalid = !isStringValid;
    const isTitleNotUnique = !isTitleUnique;
    return Promise.reject({ isStringInvalid, isTitleNotUnique });
  }
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
  console.log('> resetSelectedTodo -> selectedTodoVO:', selectedTodoVO);
  $(DOM.BTN_CREATE_TODO).innerText = 'Create';
  $(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoViewItem) selectedTodoViewItem.style.backgroundColor = '';
  selectedTodoVO = null;
  selectedTodoViewItem = null;
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  const newTodoVo = TodoVO.createFromTitle(input);
  listOfTodos.push(newTodoVo);
  return newTodoVo;
}

function clear_InputTextAndLocalStorage() {
  $(DOM.INP_TODO_TITLE).value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle(
  validateInputMethod = isStringNotNumberAndNotEmpty
) {
  console.log(
    '> disableOrEnableCreateTodoButtonOnTodoInputTitle -> $(DOM.INP_TODO_TITLE).value =',
    $(DOM.INP_TODO_TITLE).value
  );
  const textToValidate = $(DOM.INP_TODO_TITLE).value;
  disableButtonWhenTextInvalid(
    $(DOM.BTN_CREATE_TODO),
    textToValidate,
    validateInputMethod
  );
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}

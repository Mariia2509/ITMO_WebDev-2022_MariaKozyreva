import TodoVO from "./src/model/vos/TodoVO.js";

const domInputTodoTitle = document.getElementById("inputTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);
domInputTodoTitle.addEventListener("keyup", onInputTodoTitleKeyUp);

const LOCAL_LIST_OF_TODOS = "listOfTodos";

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid(domBtnCreateTodo, domInputTodoTitle.value);

function onBtnCreateTodoClick(event) {
  console.log("> domBtnCreateTodo -> handle(click)", event);
  const todotitleValueFromDomInput = domInputTodoTitle.value;
  console.log(
    ">domBtnCreateTodo -> todoInputTodoTitleValue:",
    todotitleValueFromDomInput
  );

  const canCreateTodo = isStringNotNumberAndNotEmpty(
    todotitleValueFromDomInput
  );
  if (canCreateTodo) {
    const todoVO = TodoVO.createTodoVO(todotitleValueFromDomInput);

    listOfTodos.push(todoVO);

    domListOfTodos.innerHTML = listOfTodos
      .map((TodoVO) => {
        return `<li>${TodoVO.title}</li>`;
      })
      .join("");
  }
}

console.log(
  " > dominputTodoTitle",
  domInputTodoTitle,
  domBtnCreateTodo,
  domListOfTodos
);

function isStringNotNumberAndNotEmpty(value) {
  const isInputValueString = typeof value === "string";
  const isInputValueNotNumber = isNaN(parseInt(value));

  const result =
    isInputValueString && isInputValueNotNumber && value.length > 0;

  console.log(`validateTodoInputTitleValue -> result`, {
    result,
    isInputValueString,
    isInputValueNotNumber,
  });
  return result;
}

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log(">localStorageListOf: value =", value);
  if (value == null) return [];

  const parsedValue = JSON.parse(value);
  const isParsedValueArray = Array.isArray(parsedValue);

  return isParsedValueArray ? parsedValue : [];
}

function renderTodoListInContainer(list, container) {
  domListOfTodos.innerHTML = listOfTodos
    .map((TodoVO) => {
      return `<li>${TodoVO.title}</li>`;
    })
    .join("");
}

function onInputTodoTitleKeyUp(event) {
  console.log("> onInpTodoTitleKeyUp:", event);
  const inputValue = event.currentTarget.value;
  console.log("> onInpTodoTitleKeyUp:", inputValue);
  disableButtonWhenTextInvalid(domBtnCreateTodo, inputValue);
}

function disableButtonWhenTextInvalid(
  button,
  text,
  validateTextFunction,
  { textWhenDisable, textWhenEnable }
) {
  if (!validateTextFunction) throw new Error("Validate method must be difined");
  if (validateTextFunction(text)) {
    button.disabled = false;
    button.textContent = "Create";
  } else {
    button.disabled = true;
    button.textContent = "Enter text";
  }
}

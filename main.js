const domInputTodoTitle = document.getElementById("inputTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick)

class TodoVO {
    constructor(id, title, date = new Date())
    {
        this.id = id;
        this.title = title;
        this.data = date;
        this.completed = false;
    }
}
const listOfTodos = [];


domInputTodoTitle.value = "Todo text";


function onBtnCreateTodoClick (event) {

    console.log("> domBtnCreateTodo -> handle(click)", event);
    const todotitleValueFromDomInput = domInputTodoTitle.value;
    console.log(
        ">domBtnCreateTodo -> todoInputTodoTitleValue:",
        todotitleValueFromDomInput
    );

    const canCreateTodo = validateTodoInputTitleValue(todotitleValueFromDomInput);
        if (canCreateTodo) {
            const todoVO = createTodoVO(todotitleValueFromDomInput);

    listOfTodos.push(todoVO);

    domListOfTodos.innerHTML = listOfTodos.map((TodoVO) => {
        return `<li>${TodoVO.title}</li>`;
    }).join("");
}

console.log(
    " > dominputTodoTitle",
    domInputTodoTitle,
    domBtnCreateTodo,
    domListOfTodos
);
        function validateTodoInputTitleValue  (value){
            const isInputValueString = typeof todotitleValueFromDomInput ==='string';
            const isInputValueNotNumber = isNaN(parseInt(value))

            const result =
                   isInputValueString
                && isInputValueNotNumber
                && value.length > 0;

            console.log(`validateTodoInputTitleValue -> result`, {
                result,
                isInputValueString,
                isInputValueNotNumber
            });
            return result
        }

function createTodoVO(title) {
    const todoId = Date.now().toString();
    const todoVO = new TodoVO(todoId, title);
    return todoVO;
}}
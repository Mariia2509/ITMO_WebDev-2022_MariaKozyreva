class TodoView {
  static TODO_VIEW_ITEM = 'todoitem';

  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isCompleted ? 'checked' : '';
    return `
      <li data-type="${TodoView.TODO_VIEW_ITEM}" id="${vo.id}">
        <input
          type="checkbox" 
          id="${index}" 
          ${checked}
        >${vo.title}
      </li>
    `;
  }
}

export default TodoView;

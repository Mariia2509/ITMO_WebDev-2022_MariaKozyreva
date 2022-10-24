class TodoView {
  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isComplited ? 'checked' : '';
    return `<li id="${vo.id}">
        <input type="checkbox" id="${index}"${checked}>${vo.title}
    </li>`;
  }
}

export default TodoView;

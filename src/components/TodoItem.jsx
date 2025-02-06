import PropTypes from "prop-types";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleCompleteCheckboxChange(props.id);
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>⭐️</p>}
    </div>
  );
};

TodoItem.prototype = {
  name: PropTypes.string,
  id: PropTypes.string,
  isCompleted: PropTypes.bool,
  isImportant: PropTypes.bool,
  handleTodoItemClick: PropTypes.func,
  handleCompleteCheckboxChange: PropTypes.func,
};

export default TodoItem;

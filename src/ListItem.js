import React from 'react'

const ListItem = (props) => {
    {
        return (
            <li className="list-group-item">

                {props.item.name}
                <button onClick={props.deleteTodo} className="btn-sm btn-danger ml-4">
                    X
                </button>
                <button onClick={props.editTodo} className="btn-sm btn-info ml-4">U
                </button>
            </li>
        )
    }
}

export default ListItem;
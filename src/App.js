import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuid4} from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const columnsInitial = [
    {
        name: 'todo',
        color: 'secondary',
        tasks: [
            {
                id: uuid4(),
                name: 'Task #1'

            },
            {
                id: uuid4(),
                name: 'Task #2'
            },
            {
                id: uuid4(),
                name: 'Task #3'
            }
        ]
    },

    {
        name: 'progress',
        color: 'primary',
        tasks: [
            {
                id: uuid4(),
                name: 'Task #4'
            },
            {
                id: uuid4(),
                name: 'Task #5'
            },
            {
                id: uuid4(),
                name: 'Task #6'
            }
        ]
    },

    {
        name: 'review',
        color: 'warning',
        tasks: [
            {
                id: uuid4(),
                name: 'Task #7'
            },
            {
                id: uuid4(),
                name: 'Task #8'
            }
        ]
    },
    {
        name: 'done',
        color: 'success',
        tasks: [
            {
                id: uuid4(),
                name: 'Task #9'
            },
            {
                id: uuid4(),
                name: 'Task #10'
            },
            {
                id: uuid4(),
                name: 'Task #11'
            }
        ]
    }

]

function App() {

    const [columns, setColumns] = useState(columnsInitial)

    const moveToDown = (col,id) => {
        if (id === col[col.length-1].id) return col;
        let colCopy = [...col];
        for (let i = 0; i < col.length-1; i++) {
            if (col[i].id === id) {
                colCopy[i + 1] = col[i];
                colCopy[i] = col[i + 1];
            }
        }
        return colCopy;
    }

    const moveToUp = (col, id) => {
        let colCopy = [...col];
        if (id === col[0].id) return col;
        for (let i = 0; i < col.length; i++) {
            if (col[i].id === id) {
                colCopy[i - 1] = col[i];
                colCopy[i] = col[i - 1];
            }
        }
        return colCopy;
    }


    const moveHorizontal = (arg) => {
        const colIndex = columns.findIndex(col => col.name === arg.columnName);
        if (arg.direction === 'left' && colIndex <=0) return;
        if ((arg.direction === 'right' && colIndex === columns.length-1) || colIndex === -1) return;

        const reranged = [...columns];
        const taskIndex = columns[colIndex].tasks.findIndex(task => task.id === arg.taskId);
        const task = reranged[colIndex].tasks[taskIndex];
        reranged[colIndex].tasks = reranged[colIndex].tasks.filter( el => el.id != arg.taskId)
        if (arg.direction==='left')
            reranged[colIndex-1].tasks.push(task);
        else
            reranged[colIndex+1].tasks.push(task);

        setColumns(reranged);
    }


    const moveVert = (arg) => {
        console.log(arg);
        const reranged = columns.map(col => {
            if (col.name === arg.columnName) {
                let tasks;
                if (arg.direction === 'up')
                    tasks = moveToUp(col.tasks, arg.taskId);
                else
                    tasks = moveToDown(col.tasks, arg.taskId);
                return {...col, tasks};
            } else return col;
        })
        setColumns(reranged);
    }

    return (
        <div className="container">
            <h1 className='mb-4 mt-4'>Kanban Board</h1>


            <div className="row">
                {
                    columns.map(col => (
                        <div className="col-sm d-flex">
                            <div className={`border-top border-${col.color} border-width-4 w-100`}>
                                <h3>{col.name}</h3>
                                {
                                    col.tasks.map(task => (
                                        <div className="card text-center mb-2">
                                            <div className="card-header">

                                            </div>

                                            <div className="card-body">
                                                <div className="row">

                                                    <div className="col-3">
                                                        <button onClick={() => moveVert({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: "up"

                                                        })}>&#11014;</button>
                                                        <button onClick={() => moveVert({
                                                            columnName: col.name,
                                                            taskId: task.id,
                                                            direction: "down"

                                                        })}>&#11015;</button>
                                                    </div>

                                                    <div className="col-9">
                                                        <h5 className="card-title">{task.name}</h5>

                                                        <p className="card-text"></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-muted">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <button onClick={() => moveHorizontal( {
                                                                    columnName: col.name,
                                                                    taskId: task.id,
                                                                    direction: "left"
                                                                    }
                                                                )
                                                            }>&#11013;</button>
                                                        </div>
                                                        <div className="col-4">
                                                        </div>
                                                        <div className="col-4">
                                                            <button onClick={ () => moveHorizontal({
                                                                columnName: col.name,
                                                                taskId: task.id,
                                                                direction: "right"
                                                                }

                                                            )}>&#10145;</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>


                                    ))
                                }
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    );
}

export default App;

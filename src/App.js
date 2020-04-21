import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const columnsInitial = [
    {
        name: 'todo' ,
        color: 'secondary',
        tasks: [
            {
                id: 1,
                name: 'todo 11'

            },
            {
                id: 2,
                name: 'todo 2'
            },
            {
                id: 3,
                name: 'todo 3'
            }
        ]
    },

    {
        name: 'progress',
        color: 'primary',
        tasks: [
            {
                id: 4,
                name: 'todo 4'
            },
            {
                id:5,
                name: 'todo 5'
            },
            {
                id: 6,
                name: 'todo 6'
            }
        ]
    },

    {
        name:'review',
        color: 'warning',
        tasks: [
            {
                id: 7,
                name: 'todo 7'
            },
            {
                id: 8,
                name: 'todo 8'
            }
        ]
    },
    {
        name: 'done',
        color: 'success',
        tasks: [
            {
                id: 9,
                name: 'todo 9'
            },
            {
                id: 10,
                name: 'todo 10'
            }
        ]
    }

]

function App() {

    const [columns, setColumns] = useState (columnsInitial)

    const up = (arg) => {
    console.log(arg);
    const reranged = columns.map(col => {
        if (col.name=== arg.columnName){
            const tasks = col.tasks;
            return {...col, tasks };
        }
        else return col;


    })
    setColumns(reranged);
    }

    const down = (arg) => {

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
                                                    <button onClick={ () => up({
                                                        columnName: col.name,
                                                        taskId: task.id

                                                    }) }>&#11014;</button>
                                                    <button onClick={ () => down({
                                                        columnName: col.name,
                                                        taskId: task.id

                                                    }) }>&#11015;</button>
                                                </div>

                                                <div className="col-9">
                                                    <h5 className="card-title">{task.name}</h5>

                                                    <p className="card-text"></p>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="card-footer text-muted">

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

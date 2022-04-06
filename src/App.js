import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState} from "react";
import AddTask from "./components/addTask";
// import Form from "./components/Form";



// Importing a component from another js file on components directory
const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Develop in REACT',
            day: 'April 4th at 4:03 pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Study Solidity',
            day: 'April 10th at 10:00 am',
            reminder: true,
        },
        {
            id: 3,
            text: 'Go to sleep',
            day: 'April 15th at 10:00 pm',
            reminder: true,
        }
    ])

    //Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter( task => task.id !== id))
        // console.log('delete', id)
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        //console.log(id);
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder:
                !task.reminder} : task
            )
        )

    }

    // Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }

    return (
        <div className='container'>
            <Header onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask} />}
            { tasks.length >0 ? <Tasks tasks={tasks} onDelete= {deleteTask} onToggle={toggleReminder}/> :
                'No tasks to show'
            }
        </div>
    );
}

//

/* To use the component as a class we need to import React and create the class in the next way
both ways works perfect but the use depends on the usage of the Component */
// class App extends React.Component{
//     render() {
//         return <h1>This is a class</h1>
//     }
// }

export default App;

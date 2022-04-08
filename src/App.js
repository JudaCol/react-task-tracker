import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/addTask";
import Footer from "./components/Footer";
import About from "./components/About";
// import Form from "./components/Form";


// Importing a component from another js file on components directory
const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        // This is a kind of Promise to load the data from json server
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetch Tasks from server
    const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()

    return data
    }

    //Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:8000/tasks/${id}`,
            {method: 'DELETE',
            })
        setTasks(tasks.filter(task => task.id !== id))
        // console.log('delete', id)
    }

    // Fetch Task from server (for DELETE)
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`)
        const data = await res.json()

        return data
    }


    // Toggle Reminder
    const toggleReminder = async (id) => {
        // Toggle Reminder with server
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method : 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()

        // Toggle Reminder without server
        /* Note tha unique change that was made was on !task.reminder to data.reminder */
        setTasks(tasks.map((task) =>
                task.id === id ? {...task, reminder:
                        data.reminder
                } : task
            )
        )

    }

    // Add Task
    const addTask = async (task) => {
        // Add method without json-server
        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])

        // Add method with json-server
        // Initiate with the response (PROMISE)
        const res = await fetch('http://localhost:8000/tasks', {
            method : 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body : JSON.stringify(task)
        })
        const data = await res.json()
        // Then add the data to the Tasks list finishing to the promise
        setTasks([...tasks, data])
    }

    return (
        <Router>
        <div className='container'>
            <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />
            <Routes>
                <Route
                    path= '/'
                    element ={
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                />
                            ) : (
                                'No tasks to show'
                            )}
                        </>
                    }
                />
                <Route path='/about' element={<About />}/>
            </Routes>
            <Footer />
        </div>
        </Router>
    )
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

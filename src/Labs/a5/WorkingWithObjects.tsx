import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    const API_BASE = process.env.REACT_APP_API_BASE;

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const [module, setModule] = useState({
        id: 1, name: " module1",
        description: "lab5 module1",
        course: "cs5610"
    });

    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    const MODULE_URL = `${API_BASE}/a5/module`

    return (
        <div>
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>

            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />

            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: Number(e.target.value)
                })}
                value={assignment.score} />


            <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                Update completed
            </a>
            <input type="checkbox" checked={assignment.completed}
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked

                })}
            />

            <h4>Retrieving Objects</h4>
            <a href={`${API_BASE}/a5/assignment`}>
                Get Assignment
            </a>

            <h4>Retrieving Properties</h4>
            <a href={`${API_BASE}/a5/assignment/title`}>
                Get Title
            </a>

            <h4>Get Module</h4>
            <a href={`${API_BASE}/a5/module`}>
                Get module
            </a>

            <h4>Get Module Name</h4>
            <a href={`${API_BASE}/a5/module/name`}>
                Get module name
            </a>


            <h4>Modifying Module </h4>
            <a href={`${MODULE_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />

            <a href={`${MODULE_URL}/description/${module.description}`}>
                Update description
            </a>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    description: e.target.value
                })}
                value={module.description} />
        </div>
    );
}
export default WorkingWithObjects;
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
} from "./questionsReducer";
import { KanbasState } from "../../../store";
import * as client from "./client";


function QuestionList() {
//   const { courseId } = useParams();

//   const handleDeleteModule = (moduleId: string) => {
//     client.deleteModule(moduleId).then((status) => {
//       dispatch(deleteModule(moduleId));
//     });
//   };

//   const handleUpdateModule = async () => {
//     const status = await client.updateModule(module);
//     dispatch(updateModule(module));
//   };

//   const handleAddModule = () => {
//     if (typeof courseId === 'string') {
//       client.createModule(courseId, module).then((module) => {
//         dispatch(addModule(module));
//       });
//     } else {
//       console.error('courseId is undefined');
//     }
//   };


//   useEffect(() => {
//     if (courseId !== undefined) {
//       client.findModulesForCourse(courseId)
//         .then((modules) => dispatch(setModules(modules)));
//     }
//   }, [courseId]);

//   const moduleList = useSelector((state: KanbasState) =>
//     state.modulesReducer.modules);
//   const module = useSelector((state: KanbasState) =>
//     state.modulesReducer.module);
  const dispatch = useDispatch();
  return (
    <>
{/* 
      <form className="border rounded p-3">
        <ul className="list-group wd-modules">

          <li className="list-group-item">
            <div className="d-flex flex-row m-3">
              <div className="d-flex flex-column">
                <input
                  className="mb-2"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, name: e.target.value }))
                  } />
                <textarea
                  value={module.description}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, description: e.target.value }))
                  } />
              </div>
              <button
                onClick={handleAddModule}

                className="btn btn-primary mt-5" >
                Add
              </button>
              <button
                onClick={handleUpdateModule}
                className="btn btn-success mt-5">
                Update
              </button>
            </div>
          </li>



          {moduleList.filter((module) => module.course === courseId).map((module, index) =>
          (
            <li key={index}
              className="list-group-item">
              <button
                onClick={() => dispatch(setModule(module))}
                className="btn btn-secondary ">
                Edit
              </button>

              <button
                onClick={() => handleDeleteModule(module._id)}
                className="btn btn-danger">
                Delete
              </button>

              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
                <p>{module.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </form> */}
    </>
  );
}
export default QuestionList;
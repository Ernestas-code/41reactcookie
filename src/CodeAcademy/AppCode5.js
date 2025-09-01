import { useState } from "react";

const App = () => {
    const [students,setStudents] = useState([
        { id: 1, name: "Alice", age: 20, grade: "A" },
        { id: 2, name: "Bob", age: 22, grade: "B" },
        { id: 3, name: "Charlie", age: 21, grade: "C" },
        { id: 4, name: "David", age: 19, grade: "A" },
        { id: 5, name: "Eve", age: 23, grade: "B" },
        { id: 6, name: "Frank", age: 20, grade: "C" },
        { id: 7, name: "Grace", age: 22, grade: "A" },
        { id: 8, name: "Hank", age: 21, grade: "B" },
        { id: 9, name: "Ivy", age: 19, grade: "C" },
        { id: 10, name: "Jack", age: 23, grade: "A" },
    ]);

    return (
        <div>
            <h2>Student List</h2>
            {students
                .sort((a,b)=>b.age - a.age)
                .slice(0,5)
                .map((student) => (
                <div className="form-row" key={student.id}>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Grade:</strong> {student.grade}</p>
                </div>
            ))}
        </div>
    );
};

export default App;
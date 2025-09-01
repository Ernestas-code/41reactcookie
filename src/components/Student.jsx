import React from 'react';
import PropTypes from 'prop-types'
function Student ({name = "Guest",age = 0,isStudent = false}) {

    return (
        <div className="student">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Student: {isStudent ? "yes" : "no" }</p>
        </div>
    );
}

Student.propTypes = {
 name : PropTypes.string,
    age : PropTypes.number,
    isStudent : PropTypes.bool
}
export default Student;
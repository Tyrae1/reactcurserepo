import {useNavigate, useParams} from 'react-router-dom';
import {courses} from "../data/courses.js";

export default function CourseDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const course = courses.find(c => c.id === Number(id));

    if (!course) {
        return <p>Course not found</p>
    }
    return (
        <div>
            <h2>{course.title}</h2>
            <p>Level: {course.level}</p>
            <p>Category: {course.category}</p>
            <button onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}
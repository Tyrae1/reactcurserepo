import {courses} from "../data/courses.js";
import {Link, useSearchParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Col, Form, ListGroup, Row} from "react-bootstrap";

export default function Courses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const level = searchParams.get("level") || "all";
    console.log("search =", search, "level =", level);
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesLevel = level === "all" ? true : course.level === level;
        return matchesSearch && matchesLevel;
    });
    return (
        <div>
            <h2>Courses</h2>
            <Form className="mb-3">
                <Row className="g-2">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search...."
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchParams(params => {
                                    if (value) params.set("search", value);
                                    else params.delete("search");
                                    params.set("level", level);
                                    return params;
                                });
                            }}
                            />
                    </Col>
                    <Col md={6}>
                        <Form.Select
                            value={level}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchParams(params => {
                                    params.set("level", value);
                                    if (search) params.set("search", search);
                                    return params;
                                });
                            }}
                            >
                            <option value="all">All levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="advanced">Advanced</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <ListGroup>
                {filteredCourses.map(course => (
                    <ListGroup.Item
                        key={course.id}
                    action
                    as={Link}
                    to={`/courses/${course.id}`}
                    >
                        <strong>{course.title}</strong> — {course.level} ({course.category})
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
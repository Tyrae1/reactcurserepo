import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function Profile() {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Profile page</h2>
            <p>Some user info....</p>
            <Button onClick={() => navigate("/courses")}>
                To courses
            </Button>
        </div>
    );
}
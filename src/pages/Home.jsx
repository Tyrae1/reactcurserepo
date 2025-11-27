import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h2>Home Page</h2>
            <p className="mb-3">Welcome! Took your page:</p>
            <Card className="p-3">
                <div className="d-flex gap-2">
                    <Button as={Link} to="/courses" variant="primary">
                        Course list
                    </Button>
                    <Button as={Link} to="/profile" variant="primary">
                        User Profile
                    </Button>
                </div>
            </Card>
        </div>
    );
}
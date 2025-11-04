import Progress from './components/Progress';
import BtnGroup from './components/BtnGroup';
import ListGroup from './components/ListGroup';
import Alert from './components/Alert';

function App() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <header className="bg-dark text-white py-3">
                <div className="container">
                    <h1 className="h4 mb-0">
                        Homework 8
                    </h1>
                </div>
            </header>
            <main className="flex-grow-1">
                <div className="container py-4">
                  <div className="row justify-content-center mb-3">
                      <div className="col-12 col-md-8 col-lg-6">
                          <div className="card shadow-sm">
                              <div className="card-body">
                                  <h2 className="h6 text-muted mb-3 ">
                                      Progress
                                  </h2>
                                  <Progress percentage={40}/>
                              </div>
                          </div>
                      </div>
                  </div>
                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h2 className="h6 text-muted mb-3 ">
                                        Alert
                                    </h2>
                                    <Alert type="warning" text="what is love?" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h2 className="h6 text-muted mb-3 ">
                                        ListGroup
                                    </h2>
                                    <ListGroup>
                                        <li className="list-group-item">one</li>
                                        <li className="list-group-item">two</li>
                                        <li className="list-group-item">three</li>
                                        <li className="list-group-item">four</li>
                                        <li className="list-group-item">five</li>
                                        </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h2 className="h6 text-muted mb-3 ">
                                        BtnGroup
                                    </h2>
                                    <BtnGroup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-light border-top py-3">
                <div className="container text-center text-muted small">
                    © {new Date().getFullYear()} HW8
                </div>
            </footer>
        </div>
    );
}
export default App

import React from 'react';
import TodoBox from './TodoBox';

function App() {

  return (
      <div className="min-vh-100 d-flex flex-column">
          <header className="bg-dark text-white py-3">
              <div className="container">
                  <h1 className="h4 mb-0">
                      Homework 9
                  </h1>
              </div>
          </header>
          <main className="flex-grow-1">
              <div className="container py-4">
                <TodoBox />
              </div>
          </main>
          <footer className="bg-light border-top py-3">
              <div className="container text-center text-muted small">
                  © {new Date().getFullYear()} Kostiantyn Gordiienko
              </div>
          </footer>
      </div>
  );
}

export default App

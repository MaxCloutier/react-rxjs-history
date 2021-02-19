import { BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from "../history";

import { Home } from "../home";

function App() {
  const { history, currentSnapshotIndex, undo, redo } = useHistory();

  return (
    <Router>
      <div className="jumbotron">
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              {history.map((snapshot: any, index: number) => (
                <div
                  key={index}
                  style={{
                    fontWeight: currentSnapshotIndex === index ? 700 : 400,
                  }}
                >
                  {snapshot.text}
                </div>
              ))}
              <button disabled={currentSnapshotIndex <= 0} onClick={undo}>
                Undo
              </button>
              <button
                disabled={currentSnapshotIndex === history.length - 1}
                onClick={redo}
              >
                Redo
              </button>
              <Route exact path="/" component={Home} />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export { App };

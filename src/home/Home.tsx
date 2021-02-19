import React from "react";

import { historyService } from "../history";

let count = 0;

function Home() {
  function sendSnapshot() {
    // send message to subscribers via observable subject
    historyService.sendSnapshot(`Snapshot ${count}`);
    count++;
  }

  function clearHistory() {
    // clear messages
    historyService.clearHistory();
  }

  return (
    <div>
      <h2>React Hooks + RxJS Component Communication</h2>
      <button onClick={sendSnapshot} className="btn btn-primary mr-2">
        Send Snapshot
      </button>
      <button onClick={clearHistory} className="btn btn-secondary">
        Clear History
      </button>
    </div>
  );
}

export { Home };

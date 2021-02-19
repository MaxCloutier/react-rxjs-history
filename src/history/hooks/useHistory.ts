import { useState, useEffect, useRef } from "react";
import { historyService } from "../history.service";

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const currentSnapshot = useRef(-1);

  useEffect(() => {
    // subscribe to home component history
    const subscription = historyService.onSnapshot().subscribe((snapshot) => {
      if (snapshot) {
        // add snapshot to local state if not empty
        currentSnapshot.current = currentSnapshot.current + 1;
        setHistory((history: any): any => [
          ...history.slice(0, currentSnapshot.current),
          snapshot,
        ]);
      } else {
        // clear history when empty snapshot received
        currentSnapshot.current = -1;
        setHistory([]);
      }
    });

    // return unsubscribe method to execute when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [currentSnapshot]);

  const undo = () => {
    currentSnapshot.current = currentSnapshot.current - 1;
    setForceUpdate(!forceUpdate);
  };
  const redo = () => {
    currentSnapshot.current = currentSnapshot.current + 1;
    setForceUpdate(!forceUpdate);
  };

  return { history, currentSnapshotIndex: currentSnapshot.current, undo, redo };
};

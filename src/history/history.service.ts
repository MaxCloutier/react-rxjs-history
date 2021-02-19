import { Subject } from "rxjs";

const subject = new Subject();

export const historyService = {
  sendSnapshot: (snapshot: any) => subject.next({ text: snapshot }),
  clearHistory: () => subject.next(),
  onSnapshot: () => subject.asObservable(),
};

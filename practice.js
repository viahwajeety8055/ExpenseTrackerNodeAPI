import { BehaviorSubject } from "rxjs";

const behaviorSubject = new BehaviorSubject() < number > 0;

behaviorSubject.subscribe((value) => console.log(`Subscriber 1: ${value}`));

behaviorSubject.next(1);

behaviorSubject.subscribe((value) => console.log(`Subscriber 2: ${value}`));

behaviorSubject.next(2);

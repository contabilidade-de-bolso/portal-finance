import { Injectable } from "@angular/core";
import { Subscription, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventService {
  public eventList: { [key: string]: SubscriptionEvent<any> };
  public eventSnapshot: any;
  public eventUseSnapshot: any;

  constructor() {
    this.eventList = {};
    this.eventSnapshot = {};
    this.eventUseSnapshot = {};
  }

  public removeEvent(eventName: string): void {
    if (this.eventExists(eventName)) {
      delete this.eventList[eventName];
    }
  }

  public dispatch<T>(eventName: string, eventSubject?: T): void {
    this.registerEvent(eventName);
    this.eventSnapshot[eventName] = eventSubject;
    this.eventList[eventName].sourceEvent.next(eventSubject);
  }

  public subscribe<T>(
    eventName: string,
    callback: (eventSubject?: T) => void,
    snap: boolean = false
  ): Subscription {
    this.registerEvent(eventName);
    this.eventUseSnapshot[eventName] = snap;
    /**
     * Trocar esse if pelo useSnap e testar
     */
    if (this.eventSnapshot[eventName]) {
      this.eventSnapshot[eventName].snapShot = true;
      callback(this.eventSnapshot[eventName]);
    }
    return this.eventList[eventName].observable.subscribe(
      (eventSubject: T): void => callback(eventSubject)
    );
  }

  public unsubscribe(subscriptionObject: Subscription): void {
    subscriptionObject.unsubscribe();
  }

  public registerEvent<T>(eventName: string): void {
    if (!this.eventExists(eventName)) {
      this.eventList[eventName] = new SubscriptionEvent<T>(eventName);
    }
  }

  public eventExists(eventName: string): boolean {
    return this.eventList[eventName] !== undefined;
  }
}

class SubscriptionEvent<T = any> {
  public observable: Observable<T>;
  public sourceEvent: Subject<T>;

  constructor(private eventName: string) {
    this.sourceEvent = new Subject<T>();
    this.observable = this.sourceEvent.asObservable();
  }
}

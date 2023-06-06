import { action, makeObservable, observable } from "mobx";

type User = {
  userId: number;
  username: string;
  userEmail: string;
}

class AppStore {
  isLoggedIn = false;
  user: User = {
    userId: 0,
    username: "",
    userEmail: "",
  };

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      setIsLoggedIn: action,
      user: observable,
      setUser: action,
    });
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  setUser(value: User) {
    this.user = value;
  }
}

const appStore = new AppStore();

export default appStore;


// this helps when you move between pages, but not when you refresh the page, basically because that is not the purpose of state management
// in order to manage login states or any kind of information that we need to persist even after reloading, we will need to use cookies or any database call with tokens or similar

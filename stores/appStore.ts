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

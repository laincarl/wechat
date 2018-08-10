import { observable } from "../utils/mobx";
const store = observable({
  //observable
  age: 0,
  user: {
    age: 5
  },
  //computed
  get say() {
    return `i am ${store.user.age}.`;
  },
  //action
  add() {
    store.age += 1;
    store.user.age += 1;
  }
}
);
export default store;
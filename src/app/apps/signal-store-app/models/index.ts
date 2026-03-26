import { ITodo } from "@core/models";


export interface TodoState {
  todos: ITodo[];
  search: string;
  newTitle: string;
  newDescription: string;
}
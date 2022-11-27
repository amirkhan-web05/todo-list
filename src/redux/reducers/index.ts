import { cascadeComments } from './cascadeComments';
import { combineReducers } from "redux";
import { todos } from './todos';
import { subtodos } from './subtodos';
import { comments } from './comments';

export const rootReducers = combineReducers({
  todos,
  subtodos,
  comments,
  cascadeComments
})
type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
  action: ActionType;
  model: T | string;
}

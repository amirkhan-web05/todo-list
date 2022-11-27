export type TypeItems = {
  id:number
  name:string
  completed:boolean
  edit:string
  editTodo:null | number
  setEdit?:(value:string) => void
  onRemove?:(id:number) => void
  onToggle?:(id:number, completed:boolean) => void
  onEdit?:(id:number) => void
  setTodoEditing?:(id:number) => void
}

export type TypeList = {
  todos:TypeItems[]
  onRemove:(id:number) => void
  onToggle:(id:number, completed:boolean) => void
  onEdit?:(id:number) => void
  setEdit:(value:string) => void
  setTodoEditing:(id:number) => void
  editTodo:null | number
  edit:string
}

export type TypeSubTodosList = TypeItems & {
  subtodos:TypeItems[]
  onRemove:(id:number) => void
  onToggle:(id:number, completed:boolean) => void
  onEdit?:(id:number) => void
  setEdit:(value:string) => void
  setTodoEditing:(id:number) => void
  editTodo:null | number
  edit:string
}

export type TypeComment = {
  id:number
  title:string
  value:string
  setValue:(value:string) => void
}

export type TypeCommentList = {
  comments:TypeComment[]
  value:string
  setValue:(value:string) => void
}
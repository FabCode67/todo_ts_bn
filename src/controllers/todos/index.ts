import { Response, Request } from "express";
import { ITodo } from "../../types/todo";
import Todo from "../../models/todo";

const getTodos =  async (req: Request, res: Response): Promise<void> => {
    try{
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error){
        console.log(error);
        throw error
    }
}

const addTodo =  async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body as Pick<ITodo, "firstname" | "lastname" | "email" | "password" | "age" | "status" >

        const todo : ITodo = new Todo({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            age: body.age,
            status: body.status
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res.status(201)
        .json( {message: "Todo added", todo: newTodo, todos: allTodos})
    } catch (error) {
        throw error
    }
}

const updateTodo =  async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo[] | null =  await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
        } catch (error) {
            throw error
        }
}

const deleteTodo =  async (req: Request, res: Response): Promise<void> => {
    try{
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
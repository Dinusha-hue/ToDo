import { NextResponse } from 'next/server';

let todos = []; 

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req) {
  const { title } = await req.json();
  const newTodo = { _id: Date.now().toString(), title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

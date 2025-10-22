import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../Api';
import { Todo } from '../CommenType/Types';
import AuthService from '../Auth/AuthService';
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from 'react-icons/ai';

const Wishlist: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const response = await getAllTodos(50); // Load more todos
      // Filter todos for current user and only completed ones (wishlist items)
      const userTodos = response.data.todos.filter((todo: Todo) => 
        todo.userId === user.id && todo.completed
      );
      setTodos(userTodos);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
    if (!newItem.trim()) return;

    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        alert('Please log in to add items to wishlist');
        return;
      }

      const todoData = {
        todo: newItem.trim(),
        completed: true, // Wishlist items are "completed" todos
        userId: user.id
      };

      const response = await createTodo(todoData);
      setTodos([...todos, response.data]);
      setNewItem('');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeFromWishlist = async (todoId: number) => {
    try {
      await deleteTodo(todoId.toString());
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const toggleWishlistItem = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(todo.id.toString(), updatedTodo);
      
      if (!updatedTodo.completed) {
        // If unchecked, remove from wishlist
        setTodos(todos.filter(t => t.id !== todo.id));
      }
    } catch (error) {
      console.error('Failed to toggle wishlist item:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const user = AuthService.getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Wishlist</h1>
        <p className="text-gray-600">Save items you love for later</p>
      </div>

      {!user ? (
        <div className="text-center py-12">
          <AiOutlineHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Please Log In</h3>
          <p className="text-gray-500 mb-6">You need to be logged in to view your wishlist</p>
          <Link
            to="/component/validation/SignIn"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <>
          {/* Add new item */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add an item to your wishlist..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyPress={(e) => e.key === 'Enter' && addToWishlist()}
              />
              <button
                onClick={addToWishlist}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <AiFillHeart />
                Add
              </button>
            </div>
          </div>

          {/* Wishlist items */}
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <AiOutlineHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your Wishlist is Empty</h3>
              <p className="text-gray-500">Start adding items you love to your wishlist!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todos.map((todo) => (
                <div key={todo.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {todo.todo}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Added to wishlist
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleWishlistItem(todo)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        title="Remove from wishlist"
                      >
                        <AiFillHeart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(todo.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        title="Delete permanently"
                      >
                        <AiOutlineDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              {todos.length} item{todos.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;

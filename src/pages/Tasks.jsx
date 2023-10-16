import React from 'react';
import { Header, ToDoList } from '../components';

const Tasks = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Tasks" />
      <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
        <ToDoList />
    </div>
  </div>
);

export default Tasks;

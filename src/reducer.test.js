import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

describe('reducer', () => {
  describe('updateTaskTitle', () => {
    it('returns new state with new task title', () => {
      const previousState = {
        taskTitle: '',
      };
      const state = reducer(previousState, updateTaskTitle('New Title'));

      expect(state.taskTitle).toBe('New Title');
    });
  });

  describe('addTask', () => {
    function reduceAddTask(taskTitle) {
      return reducer(
        {
          newId: 100,
          taskTitle,
          tasks: [],
        },
        addTask(),
      );
    }
    context('with task title', () => {
      it('appends a new task into tasks', () => {
        const state = reduceAddTask('New Task');

        expect(state.tasks).toHaveLength(1);
        expect(state.tasks[0].id).not.toBeUndefined();
        expect(state.tasks[0].title).toBe('New Task');
      });

      it('clear task title', () => {
        const state = reduceAddTask('New Task');

        expect(state.taskTitle).toBe('');
      });
    });

    context('without task title', () => {
      it('do not work', () => {
        const state = reduceAddTask();

        expect(state.tasks).toHaveLength(0);
      });
    });
  });

  describe('deleteTask', () => {
    context('with existed task ID', () => {
      it('remove the task from tasks', () => {
        const state = reducer(
          {
            tasks: [
              { id: 1, title: 'Task' },
            ],
          },
          deleteTask(1),
        );

        expect(state.tasks).toHaveLength(0);
      });
    });

    context('without existed task ID', () => {
      it('remove the task from tasks', () => {
        const state = reducer(
          {
            tasks: [
              { id: 1, title: 'Task' },
            ],
          },
          deleteTask(100),
        );

        expect(state.tasks).toHaveLength(1);
      });
    });
  });
});

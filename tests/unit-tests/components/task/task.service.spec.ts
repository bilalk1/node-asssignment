import { StatusCodes } from 'http-status-codes';
import TaskService from '../../../../src/components/task/task.service';
import { TaskBody } from '../../../../src/components/task/task.types';
import { DELETE_TASK_SUCCESS, GET_TASK_ERROR_ID_NOT_EXISTS, UPDATE_TASK_SUCCESS } from '../../../../src/messages';
import { ITaskDocument, TaskModel } from '../../../../src/model/task.model';
import ApiError from '../../../../src/abstractions/ApiError';
import { UpdateWriteOpResult } from 'mongoose';
import { taskMockData } from '../../mock.data';

describe('TaskService', () => {
    let taskService: TaskService;
    const taskBody: TaskBody = {
        title: 'Sample Task',
        description: 'Description',
        dueDate: new Date(),
        assignedTo: "Bilal Iftikhar",
        category: "Test",
        status: "Pending",
    };

    beforeEach(() => {
        taskService = new TaskService();
    });

    it('should create a task', async () => {

        const createSpy = jest.spyOn(TaskModel, 'create');
        createSpy.mockResolvedValue(taskBody as any );

        const createdTask = await taskService.createTask(taskBody);

        expect(createSpy).toHaveBeenCalledWith(taskBody);
        expect(createdTask).toEqual(taskBody);
    });

    it('should get task by id', async () => {
        const getByIdSpy = jest.spyOn(TaskModel, 'findById');
        getByIdSpy.mockResolvedValue(taskMockData)

        const getById = await taskService.fetchTaskById(taskMockData.id);

        expect(getByIdSpy).toHaveBeenCalledWith(taskMockData.id)
        expect(getById).toEqual(taskMockData);
    })

    it('should throw api error if task does not exist', async () => {
        const getByIdSpy = jest.spyOn(TaskModel, 'findById');
        const error = new ApiError(GET_TASK_ERROR_ID_NOT_EXISTS, StatusCodes.NOT_FOUND);
        getByIdSpy.mockRejectedValue(error);
        try {
            await taskService.fetchTaskById(taskMockData.id);
            expect(getByIdSpy).toHaveBeenCalledWith(taskMockData.id)

        } catch (e) {
            expect(error).toEqual(e);
        }
    });

    it('should update task', async () => {
        const updatedResult = { modifiedCount: 1 }
        const updateSpy = jest.spyOn(TaskModel, 'updateOne');
        updateSpy.mockResolvedValue(updatedResult as UpdateWriteOpResult)

        const updateOne = await taskService.updateTask(taskMockData.id, taskBody);

        expect(updateSpy).toHaveBeenCalledWith({ _id: taskMockData.id }, taskBody)
        expect(updateOne).toEqual(UPDATE_TASK_SUCCESS);
    })

    it('should delete task', async () => {
        const deletedResult = { deletedCount: 1 }
        const deleteSpy = jest.spyOn(TaskModel, 'deleteOne');
        deleteSpy.mockResolvedValue(deletedResult as any)

        const deleteOne = await taskService.deleteTask(taskMockData.id);

        expect(deleteSpy).toHaveBeenCalledWith({ _id: taskMockData.id })
        expect(deleteOne).toEqual(DELETE_TASK_SUCCESS);
    })
});

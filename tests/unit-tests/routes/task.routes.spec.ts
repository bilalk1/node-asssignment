import request from 'supertest';
import express from 'express';
import { DELETE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from '../../../src/messages';
import App from "../../../src/App";
import IntegrationHelpers from '../helpers/Integration-helpers';
import { StatusCodes } from 'http-status-codes';
import { TaskModel } from '../../../src/model/task.model';
import { taskMockData } from '../mock.data';
import { UpdateWriteOpResult} from 'mongoose';



describe('Tasks', function () {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });
    it('should return 200 on calling health check api', async () => {
        await request(app)
            .get('/health')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(StatusCodes.OK);
    });

    it('should create a new task', async () => {
        const mockCreate = jest.spyOn(TaskModel, 'create');
        mockCreate.mockResolvedValue(taskMockData as any);

        const response = await request(app)
            .post('/api/task')
            .send(taskMockData)
            .set('Accept', 'application/json');
        expect(response.status).toBe(StatusCodes.OK);
        mockCreate.mockRestore();
    });

    it('should return a task', async () => {
        const mockCreate = jest.spyOn(TaskModel, 'findById');
        mockCreate.mockResolvedValue(taskMockData);

        const response = await request(app)
            .get('/api/task/1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(StatusCodes.OK);
        mockCreate.mockRestore();
    });

    it('should update a task', async () => {
        const updatedResult = { modifiedCount: 1 }
        const mockCreate = jest.spyOn(TaskModel, 'updateOne');
        mockCreate.mockResolvedValue(updatedResult as UpdateWriteOpResult);

        const response = await request(app)
            .put('/api/task/1')
            .send({ title: "Testing Titl" })
            .set('Accept', 'application/json');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.text).toBe(UPDATE_TASK_SUCCESS);
        mockCreate.mockRestore();
    });

    it('should delete a task', async () => {
        const deletedResult = { deletedCount: 1 }
        const mockCreate = jest.spyOn(TaskModel, 'deleteOne');
        mockCreate.mockResolvedValue(deletedResult as any);

        const response = await request(app)
            .delete('/api/task/1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.text).toBe(DELETE_TASK_SUCCESS);
        mockCreate.mockRestore();
    });


});
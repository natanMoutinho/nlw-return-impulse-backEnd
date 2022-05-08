import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './useCases/submitFeedback-useCase';
import { PrismaFeedbacksRepositories } from './repositories/prisma/prisma-feedbacks-repositories';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mailAdapter';


export const routes = express.Router();


routes.post('/feedbacks', async (req, res)=>{
    // console.log(req.body);
    const {type,comment,screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepositories();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    

    //return res.status(201).json({data: feedback});
    return res.status(201).send();
})

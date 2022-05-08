import { SubmitFeedbackUseCase } from './submitFeedback-useCase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeeback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
);

describe('Submit Feedback', ()=>{
    it('should be able to submit a feedback', async ()=>{
        await expect(submitFeeback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,novaFoto.jgp'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback without type', async ()=>{
        await expect(submitFeeback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,novaFoto.jgp'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback whthout comment', async ()=>{
        await expect(submitFeeback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,snovaFoto.jgp'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should be able to submit a feedback with an invalid screenshot', async ()=>{
        await expect(submitFeeback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'novaFoto.jgp'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

})
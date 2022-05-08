import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepositories } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor (
        private feedbackRepostiory: FeedbacksRepositories,
        private mailAdapter: MailAdapter,
    ){}
    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;
        
    if(!type){
        throw new Error('type is required');
    }
    if(!comment){
        throw new Error('comment is required');
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
        throw new Error('Invalid image');
    }

        await this.feedbackRepostiory.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body:[
                `<div sytle="front-family: sans-serif; font-size: 16px color:#111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p> `,
                screenshot ? `<img src="${screenshot}"` : null,
                `</div>`
            ].join('\n')
        })

    }
}
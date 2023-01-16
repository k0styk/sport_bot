import { PollAnswer } from "node-telegram-bot-api";

export const pollAnswer = async (answer: PollAnswer) => {
	/* 
    {
    poll_id: '5325744973000212863',
    user: {
      id: 133066125,
      is_bot: false,
      first_name: 'kostyk',
      last_name: '_',
      username: 'kostyk',
      language_code: 'ru'
    },
    option_ids: [ 1 ]
  }
    */
	console.log(answer);
};

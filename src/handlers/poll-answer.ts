import { PollAnswer } from 'node-telegram-bot-api';

import { UsersController, PollsController } from '@/controllers';

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

  {
  poll_id: '5346185478276121544',
  user: {
    id: 133066125,
    is_bot: false,
    first_name: 'kostyk',
    last_name: '_',
    username: 'kostyk',
    language_code: 'ru'
  },
  option_ids: [ 0 ]
}
    */
	// console.log(answer);
	try {
		const { poll_id, user, option_ids } = answer;
		await UsersController.firstOrCreate(answer.user);
		await PollsController.update(poll_id, user.id, option_ids);
	} catch (error) {
		console.error(error);
	}
};

import { Poll } from 'node-telegram-bot-api';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPollsModel extends Poll, Omit<Document, 'id'> {
	endDateUnix: number;
	endDate: string;
	chatId: number;
	messageId: number;
	correctOptionId: number;
	answers: [
		{
			userId: number;
			optionIds: number[];
		}
	];
}

const PollOptionsSchema = new Schema<{
	text: String;
	voter_count: Number;
}>(
	{
		text: String,
		voter_count: Number,
	},
	{ _id: false }
);

const PollAnswersSchema = new Schema<{
	userId: Number;
	optionIds: Number[];
}>(
	{
		userId: Number,
		optionIds: [Number],
	},
	{ _id: false }
);

export const PollsSchema = new Schema<IPollsModel>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		chatId: {
			type: Number,
			required: true,
		},
		messageId: {
			type: Number,
			required: true,
		},
		question: String,
		options: [PollOptionsSchema],
		correctOptionId: Number,
		is_closed: Boolean,
		total_voter_count: Number,
		endDateUnix: Number,
		endDate: String,
		answers: [PollAnswersSchema],
	},
	{
		timestamps: true,
		versionKey: false,
		capped: { size: 2048, max: 20, autoIndexId: true },
	}
);

const PollsModel = mongoose.model<IPollsModel>('Polls', PollsSchema);
export default PollsModel;

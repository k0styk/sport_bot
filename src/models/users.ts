import { User } from 'node-telegram-bot-api';
import { Schema, Document, Model, model, Types } from 'mongoose';

interface IUsers extends User, Omit<Document, 'id'> {
	isSuperAdmin: boolean;
	nicknames?: string[];
	power?: number;
}

interface IUsersModel extends Model<IUsers> {
	firstOrCreate(tgUser: User): Promise<IUsers>;
}

const schema = new Schema<IUsers, IUsersModel>(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		first_name: {
			type: String,
			required: true,
		},
		username: String,
		language_code: String,
		nicknames: [String],
		power: Number,
		isSuperAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true, versionKey: false }
);

schema.static('firstOrCreate', async function (tgUser: User) {
	let user = await this.findOne({ id: tgUser.id });
	if (!user && !tgUser.is_bot) {
		user = new this({
			_id: new Types.ObjectId().toHexString(),
			id: tgUser.id,
			last_name: tgUser.last_name,
			is_bot: tgUser.is_bot,
			first_name: tgUser.first_name,
			username: tgUser.username,
			language_code: tgUser.language_code,
		});
		await user.save();
	}

	return user;
});

const UsersModel = model<IUsers, IUsersModel>('User', schema);
export default UsersModel;

// export interface IUsersModel extends User, Document {
// 	nicknames?: string[];
// 	power?: number;
// }

// export const UserSchema = new Schema<IUsersModel>(
// 	{
// 		id: {
// 			type: Number,
// 			required: true,
// 		},
// 		first_name: {
// 			type: String,
// 			required: true,
// 		},
// 		username: String,
// 		language_code: String,
// 		nicknames: [String],
// 		// status: {
// 		//   type: String,
// 		//   enum: ['active', 'blocked'],
// 		//   default: 'active',
// 		// },
// 	},
// 	{ timestamps: true, _id: false }
// );

// // Return the user if exists else create a new user
// UserSchema.statics.firstOrCreate = async function (tgUser: User) {
// 	let user = await this.findById(tgUser.id);
// 	if (!user && !tgUser.is_bot) {
// 		user = await new this({
// 			_id: tgUser.id,
// 			first_name: tgUser.first_name,
// 			username: tgUser.username,
// 			language_code: tgUser.language_code,
// 		}).save();
// 	}

// 	return user;
// };

// const PollsModel = mongoose.model<IUsersModel>('User', UserSchema);

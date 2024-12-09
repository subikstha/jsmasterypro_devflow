import { model, models, Schema } from 'mongoose';

export interface ITag {
    name: string;
    question: number;
}

const TagSchema = new Schema<ITag>({
    name: {type: String, required: true, unique: true},
    question:  {type: Number, default: 0},

}, { timestamps: true });

const Tag = models?.Tag || model<ITag>('Tag', TagSchema);

export default Tag;

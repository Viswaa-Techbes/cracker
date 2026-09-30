import { Schema, model, Document } from 'mongoose';

export interface ICounter extends Document {
  sequenceName: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  sequenceName: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

export const Counter = model<ICounter>('Counter', CounterSchema);

export async function getNextSequenceValue(sequenceName: string): Promise<number> {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.seq;
}

export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const seq = await getNextSequenceValue(`orderNumber_${year}`);
  const padded = String(seq).padStart(6, '0');
  return `ORD-${year}-${padded}`;
}

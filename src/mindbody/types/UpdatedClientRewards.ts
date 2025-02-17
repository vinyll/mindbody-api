import type { Nullable } from './types';

export type UpdatedClientRewards = {
  Transaction: {
    Action: string;
    Points: number;
    Source: string;
    SourceID: Nullable<number>;
    ActionDateTime: string;
    ExpirationDateTime: string;
  };
  Balance: number;
};

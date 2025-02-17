// types/budget.ts
export type TBudget = {
    id: string;
    amount: number; // Use `number` for Decimal in TypeScript
    lastAlert?: Date | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type TBudgetCreate = Omit<TBudget, 'id' | 'createdAt' | 'updatedAt'>;
  export type TBudgetUpdate = Partial<TBudgetCreate>;
export interface IUser {
   /*  [Symbol.iterator]():Iterator, */
    [index:number]:number
    indexOf?(arg0: any): number;
    push?(arg0: any): IUser;
    filter?(arg0: (item: any) => boolean): {
        length: number;
        id: string;
        username: string;
        age: number;
        hobbies: string[];};
    length: number;
    id: string;
    username: string;
    age: number;
    hobbies: string[];
  }



// Node.js with TypeScript
// More info @ https://nodejs.dev/learn/nodejs-with-typescript

// run next command to get the js file
//     npx tsc example.ts

type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 23,
};

const isJustineAnAdult: boolean = isAdult(justine);



export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedHello(name: string, delay: number = Delays.Medium) {
  await wait(delay);
  return `Hello, ${name}`;
}

export async function greeter(name: string) {
  const output = await delayedHello(name, Delays.Short);
  return output;
}

greeter('hi');

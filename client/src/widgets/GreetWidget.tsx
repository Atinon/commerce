type Prop = {
  value: string;
};

export function GreetWidget({ value }: Prop) {
  return <p>Greetings from React, value is: {value}</p>;
}

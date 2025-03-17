import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Обмен валют в Maxy Bank' },
    { name: 'description', content: 'Обмен валют в Maxy Bank' },
  ];
}

export default function CurrencyExchange() {
  return (
    <>
      <h2>Обмен валют</h2>
      <br />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nostrum culpa
          assumenda suscipit velit deleniti aliquam veniam cupiditate ratione ex.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque vero corporis
          laborum repellat, quaerat odit quis doloribus tenetur magni reiciendis sequi molestiae
          delectus aut? Consectetur architecto mollitia nihil minus.
        </p>
      </div>
    </>
  );
}

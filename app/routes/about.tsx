import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Инфо о Maxy Bank' },
    { name: 'description', content: 'Какая-то информация в Maxy Bank' },
  ];
}

export default function About() {
  return (
    <>
      <h2>О нас</h2>
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

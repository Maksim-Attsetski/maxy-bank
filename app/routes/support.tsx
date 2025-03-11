import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Поддержка Maxy Bank' },
    { name: 'description', content: 'Страница с вопросами о Maxy Bank' },
  ];
}

export default function Support() {
  return (
    <>
      <h2>Поддержка сайта Maxy Bank</h2>
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

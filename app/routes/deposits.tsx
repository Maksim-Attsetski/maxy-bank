import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Вклады в Maxy Bank' }, { name: 'description', content: 'Вклады в Maxy Bank' }];
}

export default function Deposits() {
  return (
    <>
      <h2>Вклады</h2>
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

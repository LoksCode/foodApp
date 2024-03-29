export default function Meals() {
  fetch('http://localhost:3000/meals', { method: 'GET' }).then((response) => {
    console.log(response);

    const meals = response.json();
    console.log(meals);
  });

  return (
    <ul id='meals'>
      <li>Product 1</li>
    </ul>
  );
}

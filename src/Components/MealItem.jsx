export default function MealItem({ meal }) {
  return (
    <li className='meal-item'>
      <article>
        <img src={meal.img} alt={meal.name} />
        <div>
          <h3>Name</h3>
          <p className='meal-item-price'> price </p>
          <p className='meal-item-description'> description </p>
        </div>
        <p className='meal-item-actions'>
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}

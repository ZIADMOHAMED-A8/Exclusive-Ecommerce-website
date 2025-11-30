export default function SearchResults({ results, onItemClick, emptyMessage = "No products found" }) {
  if (results.length === 0) {
    return <li className="no-results">{emptyMessage}</li>;
  }

  return (
    <>
      {results.map((item, index) => (
        <li
          key={item.id || index}
          className='results'
          onClick={() => onItemClick(item.id)}
        >
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
        </li>
      ))}
    </>
  );
}

import './NotFound.css';

function NotFound() {
  const p404text = '404, page not found!';

  return (
    <div className="not-found-container">
      <p>{p404text}</p>
    </div>
  );
}

export default NotFound;

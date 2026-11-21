import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page">
      <div className="container">
        <div className="order-success">
          <h1 className="page-title">صفحه پیدا نشد</h1>
          <Link to="/" className="btn btn-primary">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  );
}

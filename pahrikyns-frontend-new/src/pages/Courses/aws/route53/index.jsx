import { Link } from 'react-router-dom';
export default function _Home() {
  const lessons = Array.from({length:20}, (_,i) => ({ id: i+1, title: Lesson  }));
  return (
    <div style={{ padding: 24, color: 'white' }}>
      <h1 style={{ color: '#00eaff' }}>{''}</h1>
      {lessons.map(l => (
        <Link key={l.id} to={/courses/aws/route53/lesson} style={{ display: 'block', padding: 12, marginTop: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8, textDecoration: 'none', color: 'white' }}>
          {l.id}. {l.title}
        </Link>
      ))}
    </div>
  );
}

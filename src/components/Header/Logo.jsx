import { useNavigate } from 'react-router-dom';

export default function Logo({ hidden = false }) {
  const navigate = useNavigate();

  if (hidden) return null;

  return (
    <p
      style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 'bold' }}
      className='Header-text'
      onClick={() => navigate('')}
    >
      Exclusive
    </p>
  );
}

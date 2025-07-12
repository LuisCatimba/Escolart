import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: 'auto',
        height: 'auto',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ color: '#06bbcc' }}>404</h1>
      <p> Página não encontrada</p>
      <button
        style={{
          backgroundColor: '#06bbcc',
          color: 'white',
          outline: 'none',
          border: 'none',
          padding: '8px 10px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/');
        }}
      >
        Voltar a Home
      </button>
    </div>
  );
};

export default Page404;

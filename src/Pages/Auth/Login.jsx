//Vite

const emailAdm = import.meta.env.VITE_ADM;

//css

import './AuthStyles.css';

//Hook
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../Hooks/useLoginUser';
import { useGetDoc } from '../../Hooks/useGetDoc';
import { useAuth } from '../../Hooks/useAuth';

//Components

import Message from '../../Componentes/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { error, loading, user, login } = useLoginUser();
  const { setUser, setAdmin } = useAuth();
  const { getDocument, loading: loadingGetDoc } = useGetDoc();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    const config = {
      rota: email === emailAdm ? '/admin/' : '/',
      category: email === emailAdm ? 'admin' : 'aluno',
      setTypeUser: email === emailAdm ? setAdmin : setUser,
    };

    if (user) {
      const fetchDoc = async () => {
        const doc = await getDocument(config.category, user.uid);

        if (doc) {
          config.setTypeUser({ ...user, ...doc });

          navigate(config.rota);
        }
      };
      fetchDoc();
    }
  }, [user]);

  return (
    <div className="login">
      <h3>Bem vindo de volta</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email</span>
          <input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>senha</span>
          <input
            type="password"
            placeholder="senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && !loadingGetDoc && <button>Entrar</button>}
        {(loading || loadingGetDoc) && <button disabled>Aguarde...</button>}
        <p>
          Não tem uma conta ? <Link to="/cadastrar">Cadastre-se</Link>
        </p>
        {error && <Message message={error} type="error" />}
      </form>
    </div>
  );
};

export default Login;

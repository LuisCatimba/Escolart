import './AuthStyles.css';

//Hooks
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUser } from '../../Hooks/useRegisterUser';
import { useAuth } from '../../Hooks/useAuth';

//Componentes

import Message from '../../Componentes/Message';

const regexs = [
  /^.{3,}$/,
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  /^(?=.*[!@#$%^&*()_+{}\]:;<>,.?~/-]).{6,}$/,
  /^(?=.*[!@#$%^&*()_+{}\]:;<>,.?~/-]).{6,}$/,
];

const validarBordaInput = () => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input, pos) => {
    input.addEventListener('keyup', (e) => {
      if (regexs[pos].test(e.target.value)) {
        input.style.border = '1px solid #06bbcc';
      } else {
        input.style.border = '1px solid red';
      }
    });
  });
};

const Cadastro = () => {
  const { setUser } = useAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const { loading, user, error, dispatch, register } = useRegisterUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch({ type: 'ERROR', payload: 'As senhas precissam ser iguais' });
      return;
    }

    if (!regexs[0].test(name)) {
      dispatch({ type: 'ERROR', payload: 'Nome muito curto.' });
      return;
    }

    if (!regexs[1].test(email)) {
      dispatch({ type: 'ERROR', payload: 'Email inválido.' });
      return;
    }

    if (!regexs[2].test(password)) {
      dispatch({
        type: 'ERROR',
        payload:
          'Senha muito fraca. A senha precisa ter 6 caracteres inclusive um caracter especial.',
      });

      return;
    }
    const aluno = {
      name,
      email,
      password,
      category: 'aluno',
    };
    await register(aluno);
  };

  useEffect(() => {
    if (error) {
      dispatch(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      setUser(user);
      navigate('/');
    }
  }, [user]);

  return (
    <div className="cadastro">
      <h3>Cadastre-se e agenda suas aulas</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onInput={validarBordaInput}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onInput={validarBordaInput}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            onInput={validarBordaInput}
          />
        </label>
        <label>
          <span>Confirme sua senha</span>
          <input
            type="password"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onInput={validarBordaInput}
          />
        </label>
        {loading && <button disabled>Aguarde...</button>}
        {!loading && <button>Cadastrar</button>}
        <p>
          Já tem uma conta ? <Link to="/entrar">Entrar</Link>
        </p>
        {error && <Message message={error} type="error" />}
      </form>
    </div>
  );
};

export default Cadastro;

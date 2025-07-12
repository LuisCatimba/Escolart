//Css

import '../Auth/AuthStyles.css';

//Hook
import { useEffect, useState } from 'react';
import { useHooks } from '../../Hooks/useHooks';
import { useEditPassword } from '../../Hooks/useEditPassword';

//Components

import Message from '../../Componentes/Message';

const EditPasssword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const regexs = useHooks();

  const { error, loading, success, editPassword, dispatch } = useEditPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      dispatch({ type: 'ERROR', payload: 'As senhas precisam ser iguais' });
      return;
    }

    if (!regexs[2].test(newPassword)) {
      dispatch({
        type: 'ERROR',
        payload:
          'A nova senha é muito fraca. Senha precisa ter no mínimo 6 carátecteres, incluindo um carácter especial!',
      });
      return;
    }

    await editPassword(oldPassword, newPassword);
  };

  const inputsSenha = document.querySelectorAll('.senha');

  const pintarBordas = () => {
    inputsSenha.forEach((inputSenha) => {
      inputSenha.addEventListener('keyup', (e) => {
        if (regexs[2].test(e.target.value)) {
          inputSenha.style.border = '1px solid #06bbcc';
        } else {
          inputSenha.style.border = '1px solid red';
        }
      });
    });
  };

  //Resetando success

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch({ type: 'RESET' }), 3000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="EditPassword">
      <h2>Alterar senha</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Senha antiga</span>
          <input
            type="password"
            placeholder="Insere a senha antiga"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Nova senha</span>
          <input
            type="text"
            placeholder="Insere a nova senha"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="senha"
            onInput={pintarBordas}
          />
        </label>
        <label>
          <span>Comfirme a nova senha</span>
          <input
            type="text"
            placeholder="Comfirme a nova senha"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="senha"
            onInput={pintarBordas}
          />
        </label>
        <button disabled={loading}>
          {!loading ? 'Alterar' : 'Aguarde...'}
        </button>
        {error && <Message message={error} type="error" />}
        {success && <Message message="Senha alterada" type="success" />}
      </form>
    </div>
  );
};

export default EditPasssword;

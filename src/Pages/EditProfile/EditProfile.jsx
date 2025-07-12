import "../Auth/AuthStyles.css";

//Hooks

import { useAuth } from "../../Hooks/useAuth";
import { useEditProfileUser } from "../../Hooks/useEditProfileUser";
import { useEffect, useState } from "react";

//Componentes

import Message from "../../Componentes/Message";

const regexName = /^.{3,}$/;

const validarBordaInput = () => {
  const input = document.querySelector("[data-validacao='true']");

  input.addEventListener("keyup", (e) => {
    if (regexName.test(e.target.value)) {
      input.style.border = "1px solid #06bbcc";
    } else {
      input.style.border = "1px solid red";
    }
  });
};

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [bio, setBio] = useState(user.bio);
  const [userUpdated, setUserUpdated] = useState(null);

  const { error, loading, editProfileUser } = useEditProfileUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDataUser = { displayName, email, edited: true };

    if (bio) {
      newDataUser.bio = bio;
    }

    if (photoURL) {
      newDataUser.photoURL = photoURL;
    }

    const usuarioActualizado = await editProfileUser("aluno", {
      ...user,
      ...newDataUser,
    });

    setUserUpdated({ ...usuarioActualizado, ...newDataUser });
  };

  useEffect(() => {
    if (userUpdated) {
      setUser(userUpdated);
    }
  }, [userUpdated]);

  return (
    <div className="editProfile">
      {photoURL && /^https:\/\/.*$/.test(photoURL) && (
        <img src={photoURL} alt="Preview da imagem" />
      )}
      <h3>Edite seus dados</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onInput={validarBordaInput}
            data-validacao="true"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            disabled
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Bio</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biografia..."
          ></textarea>
        </label>
        <label>
          <span>Url da Imagem</span>
          <input
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            pattern="https://.*"
          />
        </label>
        <button disabled={loading}>{!loading ? "Editar" : "Aguarde..."}</button>
        {error && <Message message={error} type="error" />}
      </form>
    </div>
  );
};

export default EditProfile;

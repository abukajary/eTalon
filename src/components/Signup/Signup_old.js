import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Заполните все поля!");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
		<div className={styles.container}>
			<div className={styles.innerBox}>
				<h1 className={styles.heading}>Создать аккаунт</h1>

				<InputControl
					label='Name'
					placeholder='Впишите настоящее имя'
					onChange={event =>
						setValues(prev => ({ ...prev, name: event.target.value }))
					}
				/>
				<InputControl
					label='Email'
					placeholder='Можно вписать не настоящий'
					onChange={event =>
						setValues(prev => ({ ...prev, email: event.target.value }))
					}
				/>
				<InputControl
					label='Password'
					placeholder='Ваш пароль'
					onChange={event =>
						setValues(prev => ({ ...prev, pass: event.target.value }))
					}
				/>

				<div className={styles.footer}>
					<b className={styles.error}>{errorMsg}</b>
					<button onClick={handleSubmission} disabled={submitButtonDisabled}>
						Создать аккаунт
					</button>
					<p>
						Есть аккаунт?{' '}
						<span>
							<Link to='/login'>Войти</Link>
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Signup;

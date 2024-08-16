'use client';

import styles from './loginpage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>
        이메일과 비밀번호를 <br />
        입력해주세요
      </div>
      <div className={styles.contentsWrap}>
        <div className={styles.inputTitle}>이메일주소</div>
        <div className={styles.inputWrap}>
          <input className={styles.input} placeholder="test@gmail.com" />
        </div>
        <div className={styles.errorMessageWrap}>올바른 이메일 주소를 입력해주세요</div>

        <div style={{ marginTop: '26px' }} className={styles.inputTitle}>
          비밀번호
        </div>
        <div className={styles.inputWrap}>
          <input className={styles.input} placeholder="영문, 숫자, 특수문자 포함 8자리를 입력해주세요" />
        </div>
        <div className={styles.errorMessageWrap}> 영문, 숫자, 특수문자 포함 8자리를 입력해주세요</div>
      </div>
      <div>
        <button disabled={true} className={styles.button}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

export const templates = {

    confirmation: (emailConfirmationCode: string): string => {
        return `
  <h1>Thank you for your registration</h1>
  <p>To finish registration, please follow the link below:
    <a href='http://localhost:5050/auth/registration-confirmation/${emailConfirmationCode}'>complete registration</a>
  </p>
`;
    },

    recovery: (recoveryCode: string): string => {

        return `
    <h1>Password recovery</h1>
    <p>To finish password recovery please follow the link below:
      <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
    </p>

        `;

    }

};


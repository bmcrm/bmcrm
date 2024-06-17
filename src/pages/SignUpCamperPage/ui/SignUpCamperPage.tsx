import { memo } from 'react';
import AuthPageTemplate from 'features/AuthPageTemplate';
import AuthFormTemplate from 'features/AuthFormTemplate';

const SignUpCamperPage = memo(() => {
  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create camper account'}>
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpCamperPage;

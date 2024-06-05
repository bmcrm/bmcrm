import { memo } from 'react';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

const SignUpCamperPage = memo(() => {
  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create camper account'}>
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpCamperPage;

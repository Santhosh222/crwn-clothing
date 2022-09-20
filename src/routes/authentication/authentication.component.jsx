import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { AuthenticationComponent } from './authentication.styles';

const Authentication = () => {

  return (
    <AuthenticationComponent>
      <SignInForm/>
      <SignUpForm />
    </AuthenticationComponent>
  )
}

export default Authentication;
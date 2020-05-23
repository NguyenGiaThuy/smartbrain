import React, { Component } from 'react';
import { render } from 'react-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChanged = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChanged = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmittedSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        });
        this.props.onRouteChanged('home');
        console.log(this.state);
    }

    render() {
        const { onRouteChanged } = this.props;

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email-address" id="email-address"
                                    onChange={ this.onEmailChanged } />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" name="password" id="password"
                                    onChange={ this.onPasswordChanged } />
                            </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={ this.onSubmittedSignIn } />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                                className="f6 link dim black db pointer"
                                onClick={ () => onRouteChanged('sign-up') }>
                                    Sign up
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
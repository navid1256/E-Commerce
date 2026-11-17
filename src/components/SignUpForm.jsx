import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  function onSubmit() {
    setStatus('Your details are valid. Account creation is not connected yet.');
  }

  return (
    <main className="signup-page">
      <div className="signup-layout">
        <section className="signup-intro" aria-labelledby="signup-intro-title">
          <a className="signup-brand" href="/" aria-label="Home">
            nook<span>.</span>
          </a>
          <div>
            <p className="signup-kicker">A little more you</p>
            <h1 id="signup-intro-title">Find your next favorite.</h1>
            <p className="signup-intro-copy">
              Create an account to keep your picks, details, and orders together.
            </p>
          </div>
          <p className="signup-note">Good things are just around the corner.</p>
        </section>

        <section className="signup-panel" aria-labelledby="signup-title">
          <header className="signup-header">
            <p className="signup-eyebrow">GET STARTED</p>
            <h2 id="signup-title">Create your account</h2>
            <p>It only takes a moment.</p>
          </header>

          <form
            className="signup-form"
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => setStatus('')}
            noValidate
          >
            <div className="form-field">
              <label htmlFor="full-name">Full name</label>
              <input
                id="full-name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Alex Morgan"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                {...register('fullName', {
                  required: 'Enter your name.',
                  validate: (value) => value.trim().length > 0 || 'Enter your name.',
                })}
              />
              {errors.fullName && (
                <p className="field-error" id="full-name-error" role="alert">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email', {
                  required: 'Enter your email address.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address.',
                  },
                })}
              />
              {errors.email && (
                <p className="field-error" id="email-error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={`password-hint${errors.password ? ' password-error' : ''}`}
                {...register('password', {
                  required: 'Create a password.',
                  minLength: {
                    value: 8,
                    message: 'Use at least 8 characters.',
                  },
                  deps: 'confirmPassword',
                })}
              />
              <p className="field-hint" id="password-hint">
                Use at least 8 characters.
              </p>
              {errors.password && (
                <p className="field-error" id="password-error" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password again"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                {...register('confirmPassword', {
                  required: 'Confirm your password.',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match.',
                })}
              />
              {errors.confirmPassword && (
                <p className="field-error" id="confirm-password-error" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="signup-submit" type="submit" disabled={isSubmitting}>
              Create account
            </button>
            {status && (
              <p className="signup-status" role="status">
                {status}
              </p>
            )}
          </form>

        </section>
      </div>
    </main>
  );
}

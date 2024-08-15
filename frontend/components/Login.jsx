const handleSubmit = async (event) => {
  event.preventDefault();

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Please enter a valid email address.');
    return;
  }

  if (!password) {
    setError('Please enter your password.');
    return;
  }

  setError('');
  try {
    // Replace this with your actual login API endpoint
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    dispatch({ type: 'set_token', payload: data.token }); // Adjust based on actual API response
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};


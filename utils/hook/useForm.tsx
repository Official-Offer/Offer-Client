import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object fror our inputs
  const [input, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      ...input,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, null])
    );
    setInputs(blankState);
  }
  return {
    input,
    handleChange,
    resetForm,
    clearForm,
  };
}
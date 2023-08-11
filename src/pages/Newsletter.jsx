import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async (obj) => {
  // console.log(obj);
  const { request } = obj;
  // console.log(request);
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    const response = await axios.post(newsletterUrl, data);
    // console.log(response);
    toast.success(response.data.msg);
    // redirect is only to be used in actions and loaders and not everywhere else
    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form className='form' method='POST'>
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Our Newsletter
      </h4>
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-input'
          name='name'
          id='name'
          required
          defaultValue=''
        />
      </div>
      <div className='form-row'>
        <label htmlFor='lastName' className='form-label'>
          Last Name
        </label>
        <input
          type='text'
          className='form-input'
          name='lastName'
          id='lastName'
          required
          defaultValue=''
        />
      </div>
      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          type='text'
          className='form-input'
          name='email'
          id='email'
          required
          defaultValue='test@test.com'
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        style={{ marginTop: '0.5rem' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting' : 'Submit'}
      </button>
    </Form>
  );
};
export default Newsletter;

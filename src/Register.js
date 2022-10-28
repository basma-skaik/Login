import {Formik} from 'formik';
import InputField from './InputField';
import Button from './Button';
import * as yup from 'yup';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import axios from 'axios';

const loginValidationSchema = yup.object().shape({
  name: yup.string().required('name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  // .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  password: yup.string().required('Password is required'),
  // .matches(
  //   /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   'Password must have at least 8 character, one number and one special character',
  // ),
  phone: yup.string().required('phone is Required'),
});

function Register() {
  const onSubmitForm = (values, {...rest}) => {
    //another way to sending data in api calls using something called formdata
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('phone', values.phone);
    axios({
      url: 'https://student.valuxapps.com/api/register',
      data: formData,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        Alert.alert({error});
        console.log({error});
      });
    rest.resetForm({name: '', email: '', password: '', phone: ''});
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.loginContainer}>
        <Text>Register Screen</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            name: 'Abdullah',
            email: 'abullah@gmail.com',
            password: '123456',
            phone: '789456123',
          }}
          onSubmit={onSubmitForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <InputField
                name="name"
                placeholder="Enter your name"
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="textInput"
              />
              <InputField
                name="email"
                placeholder="Email Address"
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <InputField
                name="password"
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <InputField
                name="phone"
                placeholder="Enter your phone"
                style={styles.textInput}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <Button
                onPress={handleSubmit}
                title="Register"
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Register;

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

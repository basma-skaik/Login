import {Formik} from 'formik';
import InputField from './InputField';
import Button from './Button';
import * as yup from 'yup';
import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

const loginValidationSchema = yup.object().shape({
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
});

function LoginSection() {
  const onSubmitForm = (values, {...rest}) => {
    axios
      .post('https://student.valuxapps.com/api/login', {
        email: values.email,
        password: values.password,
      })
      .then(response => {
        console.log(response.data);
        // setAccessToken(response.data?.data?.token);
        // AsyncStorage.setItem("accessToken", response.data?.data?.token);
        // setTimeout(() => {
        //   rest.setSubmitting(false);
        // }, 3000);
      })
      .catch(error => {
        console.log({error});
      });
    rest.resetForm({email: '', password: ''});
    // another way to sending data in api calls using something called formdata
    // const formData = new FormData();
    // formData.append("name", values.name);
    // formData.append("email", values.email);
    // formData.append("password", values.password);
    // formData.append("phone", values.phone);
    // axios({
    //   url: "https://student.valuxapps.com/api/register",
    //   data: formData,
    // }).then(response=>{
    //   console.log({response});
    // }).catch(error=>{
    //   console.log({error});
    // });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.loginContainer}>
        <Text>Login Screen</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: 'algazzar.abdelrahman@gmail.com',
            password: '123456',
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
              <Button
                onPress={handleSubmit}
                title="LOGIN"
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginSection;

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

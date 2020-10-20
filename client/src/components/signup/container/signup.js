import React, { Component } from 'react';
import { Container, Button, InputAdornment, IconButton, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,
    showConfirmPassword: false,
    open: false,
    message: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { email, password, confirm_password } = this.state;
    axios.post(`http://localhost:3001/users/signup`, { email, password, confirm_password })
    .then(res => {
      const { data = {} } = res;
      if (data && data.status) {
        this.setState({
          open: true,
          message: data && data.message,
          email: '',
          password: '',
          confirm_password: ''
        })
      } else {
        this.setState({
          open: true,
          message: data && data.message
        })
      }
    })
  }

  handleClickShowPassword = (e) => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword
    })
  }

  handleConfirmPassword = (e) => {
    const { showConfirmPassword } = this.state;
    this.setState({
      showConfirmPassword: !showConfirmPassword
    })
  }

  handleClose = (e) => {
    this.setState({
      open: false
    })
  }

  render() {
    const { email, password, confirm_password, showPassword = false, showConfirmPassword = false, open = false, message } = this.state;
    return (
      <div>
        <Container maxWidth="sm">
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <div style={{ marginTop: '10px' }}>
                <h4>Signup Form</h4>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={open}
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                  message={message}
                  action={
                    <>
                      <IconButton size="small" aria-label="close" color="inherit" onClose={this.handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  }
                />
                <ValidatorForm
                  // ref="form"
                  onSubmit={payload => console.log(payload)}
                  onError={errors => console.log(errors)}
                >
                  <TextValidator
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    onChange={this.handleChange}
                    variant="outlined"
                    size="small"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                  />
                  
                  <TextValidator
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    margin="normal"
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                    variant="outlined"
                    size="small"
                    value={password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextValidator
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    margin="normal"
                    label="Confirm Password"
                    name="confirm_password"
                    onChange={this.handleChange}
                    variant="outlined"
                    size="small"
                    value={confirm_password}
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['this field is required', 'password mismatch']}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleConfirmPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button type="submit" onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

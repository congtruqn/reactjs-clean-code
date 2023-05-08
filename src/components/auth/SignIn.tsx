import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import logo from '../../assets/images/logo_has_slogan.png';
import AuthService from "../../services/auth/auth.service";
import { setToken} from "../../store/authReducer";
import { Formik, Field, Form, ErrorMessage } from "formik";
type Props = {}
const SignIn: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;
        let Itoken = await AuthService.login('6c56f5e4-2dac-479d-96fb-8101261c8e7b',username, password);
        let token  =Itoken.access
        dispatch(setToken(token))
        navigate("/choisefarm");
    };
    const initialValues = {
        username: "admin.qlns@greenfeed.com.vn",
        password: "123456",
    };
    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon" />
                        </div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="auth__center__form">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleLogin}
                            >
                                <Form>
                                <h3 className="mb-4">Đăng nhập</h3>
                                <h3 className="mb-4"> GREENFEED QUẢN LÝ NĂNG SUẤT</h3>
                                <div className="input-group mb-3">
                                    <p className="auth__label">Tên đăng nhập</p>
                                    <input type="username" className="form-control" placeholder="Email"
                                       
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <p className="auth__label">Mật khẩu</p>
                                    <input type="password" className="form-control" placeholder="password"

                                
                                    />
                                    <p className="mb-2 text-muted"> <NavLink to="/auth/reset-password-1">Quên mật khẩu?</NavLink></p>
                                </div>

                                <button className="btn btn-primary shadow-2">Đăng nhập</button>

                                <p className="mb-0 text-muted">Chưa có tài khoản? <NavLink to="/auth/signup">Đăng ký</NavLink></p>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default SignIn;
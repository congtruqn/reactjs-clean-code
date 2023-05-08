import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import FarmService from "../../services/farms/farm.service";
import { RootState } from "../../store";
import { chooseFarm ,fletchFarm} from "../../store/farmReducer";
import { useSelector, useDispatch } from "react-redux";
import { message, Upload, Row, Col, Form, Input, Modal, DatePicker } from 'antd';
import { ContainerOutlined,AimOutlined,BarChartOutlined,PartitionOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import FarmInfo from "./farmInfo"
type Props = {}
const FarmProfile: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [farms, setFarms] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLoading(true);
        async function fetchMyAPI() {
            let response = await FarmService.listFarms();
            setFarms(response.results)
            dispatch(fletchFarm(response.results));
            setLoading(false);
            
        }
        fetchMyAPI()
    }, [])
    
    function handleChange(incrementAmountValue: any) {
        dispatch(chooseFarm(incrementAmountValue));
        navigate('/')
    }
    return (
        <div className="farm__profile">
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="farm__profile">
                        <div className='farm__profile_header'>
                            <div className='farm__profile_header__top'>
                            <Row>
                                <Col lg={24} xs={24}>
                                    <Row>
                                        <Col lg={16} xs={14}>
                                            <Row>
                                                <Col lg={3} xs={12}>
                                                    <img src='http://139.59.245.254:8081/files/farms/pexels-photo-235725.jpeg'></img>
                                                </Col>
                                                <Col lg={6} xs={12}>
                                                    <h4>Trang trại Cư Jut</h4>
                                                    <p>#ID022211100020222</p>
                                                </Col>
                                                <Col lg={6} xs={12}>
                                                    <h4>Mô hình: Kín</h4>
                                                    <p>Ngày bắt đầu: 24/12/2021</p>
                                                </Col>
                                                <Col lg={8} xs={12}>
                                                    <p>Khu vực: Thôn KronPak, Cư Jut, Đắk Nông</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={8}>
                                            <p>• Đang hoạt động</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </div>
                            <div className='farm__profile_header__nav'>
                                <Row>
                                    <Col xs={18}>
                                        <div>
                                            <ul>
                                                <li>
                                                    <NavLink  className="farm-menu-link" to="#" style={({ isActive }) => ({})}>
                                                        <ContainerOutlined /><span> Tổng quan</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink  className="farm-menu-link" to="#" style={({ isActive }) => ({})}>
                                                        <AimOutlined /><span> Mục tiêu</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink  className="farm-menu-link" to="#" style={({ isActive }) => ({})}>
                                                    <BarChartOutlined /><span> Thống kê</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink  className="farm-menu-link" to="#" style={({ isActive }) => ({})}>
                                                        <PartitionOutlined /><span> Phân tích</span>
                                                    </NavLink>
                                                </li>                                                                                                
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div> 
                            
                        </div>
                        <div className='farm__profile__content'>
                                <div className='farm__profile__left'>
                                <ul>
                                                <li>
                                                    <NavLink  className="child_menu_link" to="/farmprofille/farmpro" style={({ isActive }) => ({})}>
                                                        <span> Hồ sơ</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink  className="child_menu_link" to="#" style={({ isActive }) => ({})}>
                                                        <span>Tham số trại</span>
                                                    </NavLink>
                                                </li>
                                                                                                                                     
                                            </ul>
                                </div>
                                <div className='farm__profile__center'>
                                    <Routes>
                                        <Route path={`/farmpro`} element={<FarmInfo />}></Route>
                                    </Routes>
                                </div>
                        </div>
                    </div>
                </>

            )}
        </div>
    );

}
export default FarmProfile;
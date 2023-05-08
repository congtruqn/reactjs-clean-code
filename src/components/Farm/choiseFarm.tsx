import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import FarmService from "../../services/farms/farm.service";
import { RootState } from "../../store";
import { chooseFarm ,fletchFarm} from "../../store/farmReducer";
import { useSelector, useDispatch } from "react-redux";
import type { RcFile } from 'antd/es/upload/interface';
import CreateFarm from "../../components/Farm/createFarm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}
const ChoiseFarm: React.FC<Props> = () => {
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
    const onCreate = async (values: any) => {
        const formData = new FormData();
        formData.append('file', values.file as RcFile);
        setOpen(false);
        let response = await FarmService.createFarms(JSON.stringify({
            name:values.name,
            farm_code: values.farm_code,
            start_date: values.start_date.toISOString(),
            region: values.region,
            address:values.address,
            acreage: 0,
            farm_type: 0,
            farm_size: parseInt(values.farm_size),
            contact_person: values.contact_person,
            contact_phone: values.contact_phone,
            image: values.image,
            longitude: 0,
            latitude: 0,
            image_data: values.file,
            tenant_id: "6af69148-6a3b-40a4-87a5-6fea3e82b14f",
        }));
        setFarms([response.data,...farms])
        let farm = [response.data,...farms]
        dispatch(fletchFarm(farm));
        
      };
    return (
        <div className="choose-wrapper">
            <ToastContainer />
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <><div className="choose-content">
                    <div className="card-body text-center">
                        <div className='choose__logo'>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <div className='choose__center'>
                            <h3 className='choose__title'>GREENFEED QUẢN LÝ NĂNG SUẤT</h3>
                            <p>Vui lòng chọn 1 trang trại để bắt đầu... Bạn có thể thay đổi trang trại sau ở mục thông tin tài khoản</p>
                        </div>
                        <div className='table-responsive'>
                            <table className='table table-hover'>
                                <tbody>
                                { farms.map(item => (
                                   <tr className='unread' key={item.id} onClick={() => handleChange(item)}>
                                    <td className='td'>
                                        <h6 className='"mb-1'>{item.name}</h6>
                                    </td>
                                    <td className='td'>
                                        Kín
                                    </td>
                                    <td className='td'>
                                        <i className="fas fa-map-marker-alt"></i>{item.address}
                                    </td>
                                    <td className='td'>
                                        SL Vật nuôi : {item.farm_size}
                                    </td>
                                    </tr>
                                ))} 
                                </tbody>
                            </table>
                            <div>
                                <div className='add__farm'>
                                    <Link to={'#'} onClick={() => setOpen(true)}>+Thêm trại chăn nuôi</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <div>
                            <p>Điều khoản sử dụng và bảo mật</p>
                            <p>Phiên bản 12.0.1 - Bản quyên thuộc về <strong>GREENFEED VIETNAM</strong></p>
                        </div>
                    </div>
                </div>


            <CreateFarm 
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                setOpen(false);
                }}></CreateFarm>
            </>

            )}
        </div>
    );

}
export default ChoiseFarm;
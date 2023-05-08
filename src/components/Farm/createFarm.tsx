import React, { useState, useEffect } from 'react';
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { message, Upload, Row, Col, Form, Input, Modal, DatePicker } from 'antd';
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons';

import type { UploadProps } from 'antd/es/upload/interface';
type Props = {}
interface Values {
    title: string;
    description: string;
    modifier: string;
    file: any
}
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
}
const CreateFarm: React.FC<CollectionCreateFormProps> = ({ open,
    onCreate,
    onCancel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileList, setFileList] = useState(null);
    const [imageName, setimageName] = useState(null);
    const [form] = Form.useForm();
    useEffect(() => {
        //setLoading(true);
    }, [])
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <FileImageOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const props: UploadProps = {
        beforeUpload: file => {
            console.log(file)
            setimageName(file.name)
            let reader = new FileReader();
            reader.onload = r => {
                setImageUrl(r.target.result.toString())
                setFileList(r.target.result.toString())
            };
            reader.readAsDataURL(file);
            
            return false;
        },
    };
    return (

        <Modal
            title="Tạo Trang Trại"
            centered
            width={'100vh'}
            open={open}
            onOk={
                () => {
                    form
                        .validateFields()
                        .then(values => {
                            values.file = fileList
                            values.image = imageName
                            onCreate(values);
                            form.resetFields();
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }
            }
            onCancel={onCancel}
            cancelText="Hủy"
            okText="Thêm"
            wrapClassName="add__farm__modal"
        >
            <div className="create_form">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}

                    autoComplete="off"
                >
                    <div className="ant-col-12 create_farm_center">
                        <Row>
                            <Col span={24}>
                                <Upload
                                    {...props}
                                    action=""
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Col>
                            <Col span={24}>
                                <Col span={22}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <h4 className="ant-form-text">Thông tin chung</h4>
                                    </Form.Item>

                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Tên trang trại</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="name"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập tên trang trại!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Mã trang trại</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="farm_code"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập mã trang trại!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Ngày bắt đầu</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="start_date"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}
                                    >
                                        <DatePicker style={{ width: '100%' }}/>
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Mô hình</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="farm_type"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập mô hình!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={22}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Khu vực</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="region"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập khu vực!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={22}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <h4 className="ant-form-text">Chi tiết</h4>
                                    </Form.Item>

                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Địa chỉ</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="address"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Quy mô trại</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="farm_size"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập quy mô trại!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Người liên hệ</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="contact_person"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập người liên hệ!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Số điện thoại</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="contact_phone"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người liên hệ!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>Email</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập email!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <Col span={20}>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                    >
                                        <strong className="ant-form-text" style={{ color: 'gray', fontWeight: 500 }}>BU</strong>
                                    </Form.Item>
                                    <Form.Item
                                        name="business_unit"
                                        style={{ marginBottom: '15px' }}
                                        rules={[{ required: true, message: 'Vui lòng nhập đơn vị kinh doanh!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Row>

                    </div>
                </Form>

            </div>
        </Modal>

    );

}
export default CreateFarm;
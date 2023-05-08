import React from "react";
import classNames from "classnames";
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined,LogoutOutlined,SettingOutlined,BellOutlined } from '@ant-design/icons';
import { MenuProps,Select  } from 'antd';
import { Dropdown, Space } from 'antd';
import AuthService from "../../services/auth/auth.service";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header = ({ fixed, theme, className = null, setVisibility, ...props }) => {
  const navigate = useNavigate();
  var option = []
  const listFarms = useSelector((state: RootState) => state.farm.listFarms);
  if(listFarms){
    option = listFarms.map(function(element:any){
      return {
        value:element.id,
        label:<><Avatar
        className="mr-2"
        name={element.name}
        size="36"
        round={true}
      /> {element.name}</>
      };
    });   
  }
  else{
    navigate("/choisefarm");
  }

  type Farm = {
    id:string,
    name:string
  }
  const defaultFarms:Farm = useSelector((state: RootState) => state.farm.selectFarm);
  const defaultFarm = {
    value:defaultFarms.id,
    label:<><Avatar
    className="mr-2"
    name={defaultFarms.name}
    size="36"
    round={true}
  /> {defaultFarms.name}</>
}
  const handleLogout =async () => {
    await AuthService.logout()
    navigate("/signin");
  };
  const items: MenuProps['items'] = [
    {
      label: <a href="#"><SettingOutlined /> Thông tin tài khoản</a>,
      key: '0',
    },
    {
      label: <a onClick={() => handleLogout()}><LogoutOutlined /> Đăng xuất</a>,
      key: '1',
    }
  ];

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
   
          </div>
          <div className="nk-header-brand d-xl-none">
           
          </div>
          <div className="nk-header-news d-none d-xl-block">
            
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="select_farm">
                <Select
                  labelInValue
                  defaultValue={defaultFarm }
                  style={{ width: 300 }}
                  options={option}
                  popupClassName="test"
                />
              </li>              
              <li className="notification-dropdown mr-n1"  onClick={() => setVisibility(false)}>
                <BellOutlined />
              </li>
              <li className="user-dropdown"  onClick={() => setVisibility(false)}>
                <Dropdown menu={{ items }} trigger={['click']} overlayClassName={'user_info_dropdow'}>
                    <a onClick={e => e.preventDefault()}>
                    <Space>
                        <div className="user-avatar sm"><UserOutlined /></div>
                        
                    </Space>
                    </a>
                </Dropdown>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
